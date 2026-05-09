(function () {
  const domain = window.location.hostname;
  const url = window.location.href;
  const title = document.title || '';
  const pageText = document.body?.innerText?.slice(0, 2000) || '';

  let pageType = 'website';
  if (document.querySelector('input[type="password"]') ||
      ['login','signin','auth'].some(k => url.toLowerCase().includes(k))) {
    pageType = 'login';
  } else if (document.querySelector('article') ||
      ['article','news','blog','post'].some(k => url.toLowerCase().includes(k))) {
    pageType = 'article';
  }

  chrome.runtime.sendMessage({
    type: 'PAGE_DATA',
    payload: { domain, url, title, pageType, pageText, timestamp: Date.now() }
  });
})();
