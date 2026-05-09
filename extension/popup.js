// Popup script for CyberMind extension
console.log('Popup script loaded');

// Dashboard button handler
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  const dashboardBtn = document.getElementById('dashboardBtn');
  console.log('Dashboard button found:', dashboardBtn);
  
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Dashboard button clicked!');
      
      chrome.tabs.create({
        url: 'http://localhost:4000'
      }, function(tab) {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
        } else {
          console.log('Tab created successfully:', tab);
        }
      });
    });
    console.log('Click listener attached');
  } else {
    console.error('Dashboard button not found!');
  }

  // Get current domain
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
    try { 
      if (tabs[0] && tabs[0].url) {
        const domain = new URL(tabs[0].url).hostname;
        document.getElementById('domain').textContent = domain;
        console.log('Current domain:', domain);
      }
    } catch(e) {
      console.error('Error getting domain:', e);
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
