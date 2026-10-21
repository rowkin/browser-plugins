document.addEventListener('DOMContentLoaded', function() {
  const qrContainer = document.getElementById('qrcode');
  const urlDisplay = document.getElementById('url-display');
  const restrictedNotice = document.getElementById('restricted-notice');
  const btnOpenStudio = document.getElementById('btn-open-studio');
  const btnOpenOptions = document.getElementById('btn-open-options');
  const btnTriggerInpage = document.getElementById('btn-trigger-inpage');
  const btnCopyUrl = document.getElementById('btn-copy-url');
  const btnDownload = document.getElementById('btn-download');
  const brandLogo = document.getElementById('brand-logo');
  const paletteDots = document.querySelectorAll('.palette-dot');

  let currentUrl = '';
  let activeTabId = null;
  let currentColor = '#000000';
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

  // 点击 Logo 跳转至官网 (内嵌宣传站)
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('site/index.html') });
      window.close();
    });
  }

  // 渲染本地 QR 码 (支持快捷主题色)
  function renderLocalQR(text, color = currentColor) {
    qrContainer.innerHTML = '';
    try {
      qrCodeInstance = new QRCode(qrContainer, {
        text: text,
        width: 152,
        height: 152,
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (e) {
      console.error('QR code render error:', e);
    }
  }

  // 快捷主题调色点点击联动
  paletteDots.forEach(dot => {
    dot.addEventListener('click', () => {
      paletteDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      currentColor = dot.getAttribute('data-color') || '#000000';
      if (currentUrl) {
        renderLocalQR(currentUrl, currentColor);
      }
    });
  });

  // 获取当前活跃 Tab 并初始化
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs && tabs[0];
    if (!activeTab) {
      currentUrl = 'https://github.com';
    } else {
      currentUrl = activeTab.url || '';
      activeTabId = activeTab.id;
    }

    urlDisplay.textContent = currentUrl || '未知网址';

    if (isRestrictedUrl(currentUrl)) {
      if (restrictedNotice) restrictedNotice.style.display = 'block';
      if (btnTriggerInpage) {
        btnTriggerInpage.disabled = true;
        btnTriggerInpage.style.opacity = '0.5';
        btnTriggerInpage.style.cursor = 'not-allowed';
        btnTriggerInpage.title = '受保护页面不支持注入页面悬浮窗';
      }
      renderLocalQR(currentUrl || 'https://github.com');
    } else {
      // 默认仅在卡片内安静呈现二维码，绝不再自动向宿主页面注入居中悬浮窗
      renderLocalQR(currentUrl);
    }
  });

  // 主动触发呼出【页面内悬浮窗】
  if (btnTriggerInpage) {
    btnTriggerInpage.addEventListener('click', () => {
      if (!activeTabId || isRestrictedUrl(currentUrl)) {
        alert('当前页面受系统保护，无法注入页面内悬浮窗，请直接使用【独立配置页】。');
        return;
      }
      chrome.runtime.sendMessage({
        action: 'showQRCode',
        tabId: activeTabId,
        url: currentUrl
      }, (response) => {
        window.close();
      });
    });
  }

  // 打开 Studio 独立配置页
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
