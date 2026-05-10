// Popup script for CyberMind extension - Standalone mode
document.addEventListener('DOMContentLoaded', function() {
  // Initialize demo data if empty
  chrome.storage.local.get('scans', function(data) {
    if (!data.scans || data.scans.length === 0) {
      const demoScans = [
        {
          scanId: 'demo_1',
          domain: 'google.com',
          url: 'https://google.com',
          title: 'Google',
          pageType: 'Search Engine',
          timestamp: Date.now() - 300000,
          severity: 'clean',
          summary: 'Google.com is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.',
          agents: { osint: { severity: 'clean', threatScore: 2, indicators: [], recommendations: ['Domain is trusted — no action needed'], osintSummary: 'Trusted domain' } }
        },
        {
          scanId: 'demo_2',
          domain: 'youtube.com',
          url: 'https://youtube.com',
          title: 'YouTube',
          pageType: 'Video Platform',
          timestamp: Date.now() - 600000,
          severity: 'clean',
          summary: 'YouTube.com is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.',
          agents: { osint: { severity: 'clean', threatScore: 1, indicators: [], recommendations: ['Domain is trusted — no action needed'], osintSummary: 'Trusted domain' } }
        },
        {
          scanId: 'demo_3',
          domain: 'github.com',
          url: 'https://github.com',
          title: 'GitHub',
          pageType: 'Development Platform',
          timestamp: Date.now() - 900000,
          severity: 'clean',
          summary: 'GitHub.com is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.',
          agents: { osint: { severity: 'clean', threatScore: 3, indicators: [], recommendations: ['Domain is trusted — no action needed'], osintSummary: 'Trusted domain' } }
        },
        {
          scanId: 'demo_4',
          domain: 'example-suspicious.com',
          url: 'https://example-suspicious.com',
          title: 'Suspicious Site',
          pageType: 'Unknown',
          timestamp: Date.now() - 1200000,
          severity: 'medium',
          summary: 'Domain example-suspicious.com assessed as medium risk. Suspicious domain pattern detected.',
          agents: { osint: { severity: 'medium', threatScore: 55, indicators: ['Suspicious domain pattern detected'], recommendations: ['Keep browser updated', 'Use DNS-over-HTTPS'], osintSummary: 'Medium risk detected' } }
        },
        {
          scanId: 'demo_5',
          domain: 'facebook.com',
          url: 'https://facebook.com',
          title: 'Facebook',
          pageType: 'Social Media',
          timestamp: Date.now() - 1500000,
          severity: 'clean',
          summary: 'Facebook.com is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.',
          agents: { osint: { severity: 'clean', threatScore: 4, indicators: [], recommendations: ['Domain is trusted — no action needed'], osintSummary: 'Trusted domain' } }
        },
        {
          scanId: 'demo_6',
          domain: 'twitter.com',
          url: 'https://twitter.com',
          title: 'Twitter',
          pageType: 'Social Media',
          timestamp: Date.now() - 1800000,
          severity: 'clean',
          summary: 'Twitter.com is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.',
          agents: { osint: { severity: 'clean', threatScore: 5, indicators: [], recommendations: ['Domain is trusted — no action needed'], osintSummary: 'Trusted domain' } }
        },
        {
          scanId: 'demo_7',
          domain: 'malicious-phishing-site.com',
          url: 'https://malicious-phishing-site.com',
          title: 'Phishing Site',
          pageType: 'Phishing',
          timestamp: Date.now() - 2100000,
          severity: 'high',
          summary: 'HIGH RISK: This domain shows multiple indicators of phishing activity. Domain recently registered, suspicious SSL certificate, and known malicious patterns detected.',
          agents: { osint: { severity: 'high', threatScore: 87, indicators: ['Recently registered domain', 'Suspicious SSL certificate', 'Known phishing patterns'], recommendations: ['Do not enter credentials', 'Close this site immediately', 'Report to authorities'], osintSummary: 'Phishing detected' } }
        },
        {
          scanId: 'demo_8',
          domain: 'reddit.com',
          url: 'https://reddit.com',
          title: 'Reddit',
          pageType: 'Social Media',
          timestamp: Date.now() - 2400000,
          severity: 'clean',
          summary: 'Reddit.com is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.',
          agents: { osint: { severity: 'clean', threatScore: 6, indicators: [], recommendations: ['Domain is trusted — no action needed'], osintSummary: 'Trusted domain' } }
        }
      ];
      chrome.storage.local.set({ scans: demoScans }, loadPopupData);
    } else {
      loadPopupData();
    }
  });
  
  function loadPopupData() {
    // Load translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = chrome.i18n.getMessage(key) || el.textContent;
    });

    // Dashboard button handler
    document.getElementById('dashboardBtn').addEventListener('click', function() {
      chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
    });

    // Get current domain
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
      try { 
        if (tabs[0] && tabs[0].url) {
          const domain = new URL(tabs[0].url).hostname;
          document.getElementById('domain').textContent = domain;
        }
      } catch(e) {
        document.getElementById('domain').textContent = 'Unknown';
      }
    });

    // Load scan data
    chrome.storage.local.get('scans', function(data) {
      const scans = data.scans || [];
      document.getElementById('total').textContent = scans.length;
      document.getElementById('warns').textContent = scans.filter(s=>s.severity==='medium').length;
      document.getElementById('threats').textContent = scans.filter(s=>['high','critical'].includes(s.severity)).length;

      chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        try {
          if (tabs[0] && tabs[0].url) {
            const domain = new URL(tabs[0].url).hostname;
            const s = scans.find(x => x.domain === domain);
            if (s) {
              const badge = document.getElementById('badge');
              const dot = document.getElementById('dot');
              const map = {
                clean: ['b-clean', chrome.i18n.getMessage('clean') || 'CLEAN'],
                low: ['b-clean', chrome.i18n.getMessage('low') || 'LOW'],
                medium: ['b-medium', chrome.i18n.getMessage('medium') || 'MEDIUM'],
                high: ['b-high', chrome.i18n.getMessage('high') || 'HIGH'],
                critical: ['b-critical', chrome.i18n.getMessage('critical') || '⚠ CRITICAL']
              };
              const [cls, label] = map[s.severity] || ['b-clean', 'UNKNOWN'];
              badge.className = `badge ${cls}`;
              badge.textContent = label;
              if (s.severity==='medium') dot.className='dot dot-yellow';
              else if (['high','critical'].includes(s.severity)) dot.className='dot dot-red';
              else dot.className='dot dot-green';
            }
          }
        } catch(e) {
          console.error('Error updating badge:', e);
        }
      });
    });
  }
});
