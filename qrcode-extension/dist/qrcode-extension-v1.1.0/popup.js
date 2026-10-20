document.addEventListener('DOMContentLoaded', function() {
  const qrContainer = document.getElementById('qrcode');
  const urlDisplay = document.getElementById('url-display');
  const restrictedNotice = document.getElementById('restricted-notice');
  const btnOpenStudio = document.getElementById('btn-open-studio');
  const btnOpenOptions = document.getElementById('btn-open-options');
  const btnCopyUrl = document.getElementById('btn-copy-url');
  const btnDownload = document.getElementById('btn-download');

  let currentUrl = '';
  let qrCodeInstance = null;

  function isRestrictedUrl(url) {
    if (!url) return true;
    return url.startsWith('chrome://') || 
           url.startsWith('chrome-extension://') || 
           url.startsWith('edge://') || 
           url.startsWith('about:') || 
           url.startsWith('devtools://') || 
           url.startsWith('https://chrome.google.com/webstore');
  }

  function openStudio(targetUrl) {
    let url = 'studio.html';
    if (targetUrl && !isRestrictedUrl(targetUrl)) {
      url += '?url=' + encodeURIComponent(targetUrl);
    }
    chrome.tabs.create({ url: chrome.runtime.getURL(url) });
    window.close();
  }

  // 渲染本地 QR 码
  function renderLocalQR(text) {
    qrContainer.innerHTML = '';
    try {
      qrCodeInstance = new QRCode(qrContainer, {
        text: text,
        width: 156,
        height: 156,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (e) {
      console.error('QR code render error:', e);
    }
  }

  // 获取当前活跃 Tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs && tabs[0];
    if (!activeTab) {
      currentUrl = 'https://github.com';
    } else {
      currentUrl = activeTab.url || '';
    }

    urlDisplay.textContent = currentUrl || '未知网址';

    if (isRestrictedUrl(currentUrl)) {
      if (restrictedNotice) restrictedNotice.style.display = 'block';
      renderLocalQR(currentUrl || 'https://github.com');
    } else {
      renderLocalQR(currentUrl);

      // 非受限页面尝试唤起原有的页面内悬浮弹窗
      chrome.runtime.sendMessage({
        action: 'showQRCode',
        tabId: activeTab.id,
        url: currentUrl
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn('In-page prompt failed:', chrome.runtime.lastError);
        }
      });
    }
  });

  // 打开 Studio 工作台
  btnOpenStudio.addEventListener('click', () => openStudio(currentUrl));
  btnOpenOptions.addEventListener('click', () => openStudio(currentUrl));

  // 复制链接
  btnCopyUrl.addEventListener('click', async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      const originalText = btnCopyUrl.textContent;
      btnCopyUrl.textContent = '✅ 已复制';
      setTimeout(() => {
        btnCopyUrl.textContent = originalText;
      }, 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  });

  // 下载二维码图片
  btnDownload.addEventListener('click', () => {
    const canvas = qrContainer.querySelector('canvas');
    const img = qrContainer.querySelector('img');
    let dataUrl = '';
    if (canvas) {
      dataUrl = canvas.toDataURL('image/png');
    } else if (img && img.src) {
      dataUrl = img.src;
    }

    if (dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `qrcode_${Date.now()}.png`;
      a.click();
    }
  });
});
