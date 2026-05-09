const BACKEND = 'http://localhost:4000';
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

function setBadge(tabId, state) {
  const [color, text] = BADGE[state] || BADGE.error;
  chrome.action.setBadgeText({ tabId, text });
  chrome.action.setBadgeBackgroundColor({ tabId, color });
}

async function scan(payload, tabId) {
  const key = payload.domain;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    setBadge(tabId, cached.severity);
    return;
  }

  setBadge(tabId, 'scanning');

  try {
    const res = await fetch(`${BACKEND}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Backend error');
    const { scanId } = await res.json();

    // Poll for result (max 30s)
    let attempts = 0;
    const poll = setInterval(async () => {
      attempts++;
      if (attempts > 30) { clearInterval(poll); setBadge(tabId, 'error'); return; }
      try {
        const r = await fetch(`${BACKEND}/api/scans`);
        const data = await r.json();
        const scan = (data.scans || []).find(s => s.scanId === scanId);
        if (scan?.report) {
          clearInterval(poll);
          cache.set(key, { severity: scan.severity, ts: Date.now() });
          setBadge(tabId, scan.severity);

          const stored = (await chrome.storage.local.get('scans')).scans || [];
          stored.unshift(scan);
          chrome.storage.local.set({ scans: stored.slice(0, 100) });

          if (['high','critical'].includes(scan.severity)) {
            chrome.notifications.create({
              type: 'basic', iconUrl: 'icon48.png',
              title: '⚠ CyberMind Threat Detected',
              message: `${scan.domain}: ${scan.summary?.slice(0, 100)}`
            });
          }
        }
      } catch {}
    }, 1000);

  } catch (e) {
    console.error('[CyberMind]', e.message);
    setBadge(tabId, 'error');
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'PAGE_DATA' && sender.tab?.id) {
    scan(msg.payload, sender.tab.id);
  }
  if (msg.type === 'OPEN_DASHBOARD') {
    chrome.tabs.create({ url: `${BACKEND.replace('4000', '4000')}` });
  }
});
