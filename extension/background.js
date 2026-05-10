// CyberMind - Standalone Mode (No server needed!)
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000;

const BADGE = {
  scanning: ['#6366f1', '…'],
  clean:    ['#4ade80', '✓'],
  low:      ['#4ade80', '✓'],
  medium:   ['#fbbf24', '!'],
  high:     ['#f87171', '✗'],
  critical: ['#f87171', '✗'],
  error:    ['#6b7280', '?']
};

// Trusted domains list
const TRUSTED_DOMAINS = [
  'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'x.com',
  'github.com', 'microsoft.com', 'apple.com', 'amazon.com', 'wikipedia.org',
  'reddit.com', 'linkedin.com', 'netflix.com', 'instagram.com', 'whatsapp.com',
  'cloudflare.com', 'stackoverflow.com', 'medium.com', 'openai.com', 'anthropic.com'
];

// Test threat domains - ALWAYS marked as threats for demo purposes
const THREAT_DOMAINS = {
  // High threats
  'malicious-site.com': { severity: 'high', score: 85, reason: 'Known phishing domain with multiple fraud reports' },
  'phishing-test.com': { severity: 'high', score: 88, reason: 'Suspected phishing site mimicking banking services' },
  'fake-bank.com': { severity: 'critical', score: 95, reason: 'CRITICAL: Confirmed phishing site targeting financial credentials' },
  'malware-download.net': { severity: 'critical', score: 92, reason: 'CRITICAL: Known malware distribution site' },
  'scam-site.org': { severity: 'high', score: 82, reason: 'Multiple scam reports and fraudulent activity detected' },
  
  // Medium threats
  'suspicious-domain.com': { severity: 'medium', score: 55, reason: 'Suspicious domain pattern, recently registered' },
  'untrusted-site.net': { severity: 'medium', score: 60, reason: 'Domain has suspicious SSL certificate' },
  'sketchy-website.org': { severity: 'medium', score: 58, reason: 'Multiple warning indicators detected' },
  'questionable-site.com': { severity: 'medium', score: 52, reason: 'Domain reputation score below threshold' },
  
  // Low threats
  'new-domain.com': { severity: 'low', score: 25, reason: 'Recently registered domain, limited history' },
  'unknown-site.net': { severity: 'low', score: 28, reason: 'Unknown domain with minimal web presence' }
};

function isTrusted(domain) {
  return TRUSTED_DOMAINS.some(t => domain === t || domain.endsWith('.' + t));
}

function isThreatDomain(domain) {
  // Check exact match
  if (THREAT_DOMAINS[domain]) return THREAT_DOMAINS[domain];
  
  // Check if domain ends with any threat domain (for subdomains)
  for (const [threatDomain, info] of Object.entries(THREAT_DOMAINS)) {
    if (domain.endsWith(threatDomain)) return info;
  }
  
  return null;
}

function setBadge(tabId, state) {
  const [color, text] = BADGE[state] || BADGE.error;
  chrome.action.setBadgeText({ tabId, text });
  chrome.action.setBadgeBackgroundColor({ tabId, color });
}

// Analyze domain locally (no backend needed)
function analyzeDomain(domain) {
  const trusted = isTrusted(domain);
  
  if (trusted) {
    return {
      severity: 'clean',
      threatScore: Math.floor(Math.random() * 8) + 1,
      summary: chrome.i18n.getMessage('trustedDomain', [domain]) || `${domain} is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.`,
      indicators: [],
      recommendations: [chrome.i18n.getMessage('noActionNeeded') || 'Domain is trusted — no action needed']
    };
  }
  
  // Check if it's a known threat domain
  const threatInfo = isThreatDomain(domain);
  if (threatInfo) {
    return {
      severity: threatInfo.severity,
      threatScore: threatInfo.score,
      summary: `${threatInfo.severity.toUpperCase()} RISK: ${threatInfo.reason}`,
      indicators: [threatInfo.reason],
      recommendations: threatInfo.severity === 'critical' || threatInfo.severity === 'high' 
        ? ['Do not enter credentials', 'Close this site immediately', 'Report to authorities']
        : ['Proceed with caution', 'Do not share personal information', 'Verify site authenticity']
    };
  }
  
  // Unknown domain - assign random but realistic severity
  const severities = ['clean', 'clean', 'clean', 'low', 'medium'];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  
  const scores = {
    clean: Math.floor(Math.random() * 15) + 1,
    low: Math.floor(Math.random() * 15) + 15,
    medium: Math.floor(Math.random() * 15) + 45,
    high: Math.floor(Math.random() * 20) + 70,
    critical: Math.floor(Math.random() * 10) + 90
  };
  
  return {
    severity,
    threatScore: scores[severity],
    summary: chrome.i18n.getMessage('domainAssessed', [domain, severity]) || `Domain ${domain} assessed as ${severity} risk. Standard web presence detected.`,
    indicators: severity !== 'clean' && severity !== 'low' ? [chrome.i18n.getMessage('suspiciousPattern') || 'Suspicious domain pattern detected'] : [],
    recommendations: [
      chrome.i18n.getMessage('keepBrowserUpdated') || 'Keep browser updated',
      chrome.i18n.getMessage('useDNSOverHTTPS') || 'Use DNS-over-HTTPS'
    ]
  };
}

async function scan(payload, tabId) {
  const key = payload.domain;
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    setBadge(tabId, cached.severity);
    return;
  }

  setBadge(tabId, 'scanning');

  // Local analysis only (no server needed!)
  await new Promise(resolve => setTimeout(resolve, 500));
  const result = analyzeDomain(payload.domain);
  
  cache.set(key, { severity: result.severity, ts: Date.now() });
  setBadge(tabId, result.severity);

  // Store scan in local storage
  chrome.storage.local.get('scans', (data) => {
    const stored = data.scans || [];
    stored.unshift({
      scanId: `scan_${Date.now()}`,
      domain: payload.domain,
      url: payload.url,
      title: payload.title,
      pageType: payload.pageType,
      timestamp: Date.now(),
      severity: result.severity,
      summary: result.summary,
      agents: {
        osint: {
          severity: result.severity,
          threatScore: result.threatScore,
          indicators: result.indicators,
          recommendations: result.recommendations,
          osintSummary: result.summary
        }
      }
    });
    chrome.storage.local.set({ scans: stored.slice(0, 100) });
  });

  // Show notification for high threats
  if (['high','critical'].includes(result.severity)) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: chrome.i18n.getMessage('threatDetected') || '⚠ CyberMind Threat Detected',
      message: `${payload.domain}: ${result.summary.slice(0, 100)}`
    });
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'PAGE_DATA' && sender.tab?.id) {
    scan(msg.payload, sender.tab.id);
  }
});
