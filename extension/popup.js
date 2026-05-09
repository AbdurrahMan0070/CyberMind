// Popup script for CyberMind extension - Standalone mode
document.addEventListener('DOMContentLoaded', function() {
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
              clean:'b-clean CLEAN',
              low:'b-clean LOW',
              medium:'b-medium MEDIUM',
              high:'b-high HIGH',
              critical:'b-critical ⚠ CRITICAL'
            };
            const [cls, label] = (map[s.severity]||'b-clean UNKNOWN').split(' ');
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
