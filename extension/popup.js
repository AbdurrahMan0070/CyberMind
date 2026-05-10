// Popup script for CyberMind extension - Standalone mode
document.addEventListener('DOMContentLoaded', function() {
  // Load translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = chrome.i18n.getMessage(key) || el.textContent;
  });

  // Dashboard button handler
  document.getElementById('dashboardBtn').addEventListener('click', function() {
    chrome.tabs.create({ url: 'http://localhost:4000' });
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
});
