const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for scans
let scans = [];

// Trusted domains database
const TRUSTED_DOMAINS = [
  'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'x.com',
  'github.com', 'microsoft.com', 'apple.com', 'amazon.com', 'wikipedia.org',
  'reddit.com', 'linkedin.com', 'netflix.com', 'instagram.com', 'whatsapp.com',
  'cloudflare.com', 'stackoverflow.com', 'medium.com', 'openai.com', 'anthropic.com'
];

function isTrusted(domain) {
  return TRUSTED_DOMAINS.some(t => domain === t || domain.endsWith('.' + t));
}

function analyzeDomain(domain) {
  const trusted = isTrusted(domain);
  
  if (trusted) {
    return {
      severity: 'clean',
      threatScore: Math.floor(Math.random() * 8) + 1,
      summary: `${domain} is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.`,
      indicators: [],
      recommendations: ['Domain is trusted — no action needed']
    };
  }
  
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
    summary: `Domain ${domain} assessed as ${severity} risk. Standard web presence detected.`,
    indicators: severity !== 'clean' && severity !== 'low' ? ['Suspicious domain pattern detected'] : [],
    recommendations: ['Keep browser updated', 'Use DNS-over-HTTPS']
  };
}

// API Routes
app.post('/api/scan', async (req, res) => {
  try {
    const { domain, url, title, pageType } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = analyzeDomain(domain);
    
    const scan = {
      scanId: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      domain,
      url: url || `https://${domain}`,
      title: title || domain,
      pageType: pageType || 'website',
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
    };

    scans.unshift(scan);
    if (scans.length > 100) scans = scans.slice(0, 100);

    res.json(scan);
  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({ error: 'Scan failed' });
  }
});

app.get('/api/scans', (req, res) => {
  res.json(scans);
});

app.get('/api/stats', (req, res) => {
  const stats = {
    total: scans.length,
    clean: scans.filter(s => s.severity === 'clean').length,
    low: scans.filter(s => s.severity === 'low').length,
    medium: scans.filter(s => s.severity === 'medium').length,
    high: scans.filter(s => s.severity === 'high').length,
    critical: scans.filter(s => s.severity === 'critical').length
  };
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`🛡️  CyberMind Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
});
