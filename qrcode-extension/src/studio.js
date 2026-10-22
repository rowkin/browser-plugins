/**
 * QR Studio - 专业级二维码设计工坊核心驱动引擎
 * 支持多种模板、高级渐变色、点阵样式、独立码眼、Logo嵌入、SVG/PNG导出、WebRTC相机扫码及历史管理
 */
(function () {
  // ─── 1. 国际化与语言字典 ───
  const I18N = {
    'zh': {
      app_title: 'QR Studio',
      app_subtitle: '专业二维码工坊 v1.1.1',
      nav_generator: '创意二维码生成',
      nav_camera: '相机扫码识别',
      nav_decoder: '上传图片解析',
      nav_history: '历史记录管理',
      badge_live: '实时',
      theme_light: '浅色模式',
      theme_dark: '深色模式',
      type_url: '网址链接',
      type_text: '纯文本',
      type_wifi: 'WiFi网络',
      type_vcard: '名片信息',
      type_tel: '电话短信',
      section_content: '二维码内容与数据',
      realtime_sync: '实时同步',
      label_url_input: '输入网址 (URL)',
      label_text_input: '输入文本内容',
      label_wifi_ssid: 'WiFi 名称 (SSID)',
      label_wifi_type: '加密方式',
      label_wifi_pass: 'WiFi 密码',
      label_vcard_name: '姓名',
      label_vcard_tel: '手机号',
      label_vcard_email: '电子邮箱',
      label_vcard_org: '公司/组织',
      label_phone_number: '电话号码',
      label_sms_body: '短信预设正文 (选填)',
      acc_colors: '色彩与高级渐变系统',
      label_color_mode: '色彩填充模式',
      mode_solid: '经典单色填充 (Solid)',
      mode_linear: '线性炫彩渐变 (Linear Gradient)',
      mode_radial: '径向环形渐变 (Radial Gradient)',
      color_fg_1: '主前景色 (Color 1)',
      color_fg_2: '次前景色 (Color 2)',
      color_bg: '背景底色',
      bg_transparent: '透明背景',
      preset_palettes: '精选质感主题色板',
      acc_shapes: '点阵样式与定位码眼',
      label_dot_style: '码点外观样式',
      dot_square: '经典方块',
      dot_dots: '优雅圆点',
      dot_rounded: '平滑圆角',
      dot_fluid: '液态胶囊',
      label_eye_frame: '码眼外框形状',
      label_eye_dot: '码眼内芯形状',
      shape_square: '经典方形',
      shape_rounded: '圆角矩形',
      shape_circle: '圆润环形',
      eye_custom_color: '码眼独立配色',
      acc_logo: '中心 Logo / 品牌图标嵌入',
      label_logo_source: '预设快捷图标',
      logo_none: '无 Logo',
      label_custom_logo: '或上传自定义图片 (PNG / SVG / JPG)',
      label_logo_size: 'Logo 占比大小',
      label_logo_margin: '保护留白边距',
      acc_settings: '输出清晰度与容错机制',
      label_ecc: '容错纠错级别 (ECC)',
      label_export_size: '导出图片清晰度',
      preview_tip: '✨ 移动设备相机或任意扫码 App 均可毫秒级秒开识别',
      btn_download_png: '下载高清 PNG 图片',
      btn_download_svg: '导出 SVG 矢量图',
      btn_copy_image: '复制到剪贴板',
      camera_start: '开启摄像头扫码',
      camera_stop: '停止摄像头',
      scan_result_label: '扫描识别结果：',
      btn_copy: '复制',
      drop_zone_title: '拖拽二维码图片至此处，或点击浏览上传',
      drop_zone_sub: '支持在页面任意处直接 Ctrl+V / Cmd+V 快速粘贴图片进行解码',
      decode_result_label: '解析成功提取内容：',
      btn_import_generator: '导入并重新生成',
      history_title: '二维码生成与扫描历史',
      btn_clear_history: '清空全部历史',
      copied: '已复制！',
      copy_failed: '复制失败'
    },
    'en': {
      app_title: 'QR Studio',
      app_subtitle: 'Professional QR Workshop v1.1.1',
      nav_generator: 'Create QR Code',
      nav_camera: 'Camera Scanner',
      nav_decoder: 'Image Decoder',
      nav_history: 'History Manager',
      badge_live: 'Live',
      theme_light: 'Light Mode',
      theme_dark: 'Dark Mode',
      type_url: 'Website URL',
      type_text: 'Plain Text',
      type_wifi: 'WiFi Network',
      type_vcard: 'vCard Contact',
      type_tel: 'Phone & SMS',
      section_content: 'QR Content & Payload',
      realtime_sync: 'Realtime Sync',
      label_url_input: 'Website URL',
      label_text_input: 'Text Content',
      label_wifi_ssid: 'Network Name (SSID)',
      label_wifi_type: 'Encryption',
      label_wifi_pass: 'WiFi Password',
      label_vcard_name: 'Full Name',
      label_vcard_tel: 'Phone Number',
      label_vcard_email: 'Email Address',
      label_vcard_org: 'Organization',
      label_phone_number: 'Phone Number',
      label_sms_body: 'Default SMS Text (Optional)',
      acc_colors: 'Color & Gradient System',
      label_color_mode: 'Color Fill Mode',
      mode_solid: 'Classic Solid Color',
      mode_linear: 'Linear Gradient',
      mode_radial: 'Radial Gradient',
      color_fg_1: 'Primary Color (Color 1)',
      color_fg_2: 'Secondary Color (Color 2)',
      color_bg: 'Background Color',
      bg_transparent: 'Transparent BG',
      preset_palettes: 'Curated Theme Palettes',
      acc_shapes: 'Dot Patterns & Corner Eyes',
      label_dot_style: 'Module Dot Style',
      dot_square: 'Square',
      dot_dots: 'Dots',
      dot_rounded: 'Rounded',
      dot_fluid: 'Fluid',
      label_eye_frame: 'Corner Eye Frame',
      label_eye_dot: 'Corner Eye Inner Dot',
      shape_square: 'Square',
      shape_rounded: 'Rounded Rect',
      shape_circle: 'Circle',
      eye_custom_color: 'Custom Corner Colors',
      acc_logo: 'Center Logo / Brand Embedding',
      label_logo_source: 'Preset Icons',
      logo_none: 'No Logo',
      label_custom_logo: 'Or upload custom image (PNG / SVG / JPG)',
      label_logo_size: 'Logo Size Ratio',
      label_logo_margin: 'Padding Margin',
      acc_settings: 'Resolution & Error Correction',
      label_ecc: 'Error Correction Level (ECC)',
      label_export_size: 'Export Image Clarity',
      preview_tip: '✨ Instantly scannable by any mobile camera or scanner app',
      btn_download_png: 'Download High-Res PNG',
      btn_download_svg: 'Export Vector SVG',
      btn_copy_image: 'Copy Image to Clipboard',
      camera_start: 'Start Camera Scan',
      camera_stop: 'Stop Camera',
      scan_result_label: 'Scan Result:',
      btn_copy: 'Copy',
      drop_zone_title: 'Drop QR code image here or click to browse',
      drop_zone_sub: 'Press Ctrl+V / Cmd+V anywhere on the page to paste & decode',
      decode_result_label: 'Decoded Result Content:',
      btn_import_generator: 'Load in Generator',
      history_title: 'QR Code Generation & Scan History',
      btn_clear_history: 'Clear All History',
      copied: 'Copied!',
      copy_failed: 'Copy failed'
    }
  };

  let currentLang = localStorage.getItem('qr_studio_lang') || 'zh';
  let currentTheme = localStorage.getItem('qr_studio_theme') || 'light';

  // 预设内嵌 SVG Logo 图标库（官方标准 Iconfont / Simple Icons 矢量）
  const PRESET_LOGOS = {
    wechat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#07C160" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>`,
    alipay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#1677FF" d="M19.695 15.07c3.426 1.158 4.203 1.22 4.203 1.22V3.846c0-2.124-1.705-3.845-3.81-3.845H3.914C1.808.001.102 1.722.102 3.846v16.31c0 2.123 1.706 3.845 3.813 3.845h16.173c2.105 0 3.81-1.722 3.81-3.845v-.157s-6.19-2.602-9.315-4.119c-2.096 2.602-4.8 4.181-7.607 4.181-4.75 0-6.361-4.19-4.112-6.949.49-.602 1.324-1.175 2.617-1.497 2.025-.502 5.247.313 8.266 1.317a16.796 16.796 0 0 0 1.341-3.302H5.781v-.952h4.799V6.975H4.77v-.953h5.81V3.591s0-.409.411-.409h2.347v2.84h5.744v.951h-5.744v1.704h4.69a19.453 19.453 0 0 1-1.986 5.06c1.424.52 2.702 1.011 3.654 1.333m-13.81-2.032c-.596.06-1.71.325-2.321.869-1.83 1.608-.735 4.55 2.968 4.55 2.151 0 4.301-1.388 5.99-3.61-2.403-1.182-4.438-2.028-6.637-1.809"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#181717" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    web: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#00B8B2"/><rect x="4" y="4" width="6" height="6" rx="1.2" stroke="white" stroke-width="1.6" fill="none"/><rect x="6.2" y="6.2" width="1.6" height="1.6" fill="white"/><rect x="14" y="4" width="6" height="6" rx="1.2" stroke="white" stroke-width="1.6" fill="none"/><rect x="16.2" y="6.2" width="1.6" height="1.6" fill="white"/><rect x="4" y="14" width="6" height="6" rx="1.2" stroke="white" stroke-width="1.6" fill="none"/><rect x="6.2" y="16.2" width="1.6" height="1.6" fill="white"/><rect x="14" y="14" width="2.2" height="2.2" rx="0.4" fill="white"/><rect x="17.8" y="14" width="2.2" height="2.2" rx="0.4" fill="white"/><rect x="14" y="17.8" width="2.2" height="2.2" rx="0.4" fill="white"/><rect x="17.8" y="17.8" width="2.2" height="2.2" rx="0.4" fill="white"/></svg>`
  };

  // 预加载预设 Logo 图片缓存池
  const presetLogoImages = {};
  Object.keys(PRESET_LOGOS).forEach(key => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(PRESET_LOGOS[key]);
    img.onload = () => {
      presetLogoImages[key] = img;
    };
    presetLogoImages[key] = img;
  });

  // 当前二维码生成参数状态
  const state = {
    text: 'https://qrcode.rowkin.xyz/',
    colorMode: 'linear',
    fgColor1: '#00b8b2',
    fgColor2: '#008f89',
    bgColor: '#ffffff',
    bgTransparent: false,
    dotStyle: 'square',
    eyeFrame: 'rounded',
    eyeDot: 'circle',
    eyeCustomColor: false,
    eyeColor: '#008f89',
    ecc: 'H',
    logoType: 'none',
    customLogoImg: null,
    logoSize: 22,
    logoMargin: 4,
    exportSize: 1024
  };

  // 历史记录数组
  let historyList = [];

  // DOM 元素引用
  const canvas = document.getElementById('studioQrCanvas');
  const ctx = canvas.getContext('2d');

  // ─── 2. 初始化与语言翻译 ───
  function initI18n() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    const dict = I18N[currentLang] || I18N['zh'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
      langLabel.textContent = currentLang === 'zh' ? 'English' : '简体中文';
    }

    const themeLabel = document.getElementById('themeLabel');
    const themeIcon = document.getElementById('themeIcon');
    if (themeLabel && themeIcon) {
      if (currentTheme === 'dark') {
        themeLabel.textContent = dict.theme_light;
        themeIcon.textContent = '☀️';
      } else {
        themeLabel.textContent = dict.theme_dark;
        themeIcon.textContent = '🌙';
      }
    }
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('qr_studio_theme', theme);
    initI18n();
  }

  // ─── 3. 二维码生成引擎 (Canvas 自绘高阶渲染) ───
  function renderQRCode() {
    if (!state.text || !state.text.trim()) return;

    try {
      // 1. 创建 QRCode 实例获取矩阵模型
      const tempDiv = document.createElement('div');
      const qrInstance = new QRCode(tempDiv, {
        text: state.text,
        correctLevel: QRCode.CorrectLevel[state.ecc] || QRCode.CorrectLevel.H
      });
      const qr = qrInstance._oQRCode;
      if (!qr) return;

      const count = qr.getModuleCount();
      const canvasSize = 280;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      const padding = 16;
      const cellSize = (canvasSize - padding * 2) / count;

      // 2. 绘制背景
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      if (!state.bgTransparent) {
        ctx.fillStyle = state.bgColor;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
      }

      // 3. 构建渐变色或纯色 FillStyle
      let fillStyle = state.fgColor1;
      if (state.colorMode === 'linear') {
        const grad = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
        grad.addColorStop(0, state.fgColor1);
        grad.addColorStop(1, state.fgColor2);
        fillStyle = grad;
      } else if (state.colorMode === 'radial') {
        const grad = ctx.createRadialGradient(canvasSize / 2, canvasSize / 2, 10, canvasSize / 2, canvasSize / 2, canvasSize / 1.4);
        grad.addColorStop(0, state.fgColor1);
        grad.addColorStop(1, state.fgColor2);
        fillStyle = grad;
      }

      // 4. 辅助函数：判断是否处于 3 个定位码眼内
      const isFinder = (r, c) => {
        if (r < 7 && c < 7) return true; // 左上
        if (r < 7 && c >= count - 7) return true; // 右上
        if (r >= count - 7 && c < 7) return true; // 左下
        return false;
      };

      // 5. 绘制常规点阵数据模块
      ctx.fillStyle = fillStyle;
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (isFinder(r, c)) continue; // 码眼另外绘制
          if (qr.isDark(r, c)) {
            const x = padding + c * cellSize;
            const y = padding + r * cellSize;
            drawDot(ctx, x, y, cellSize, state.dotStyle);
          }
        }
      }

      // 6. 独立精细绘制三个码眼
      const eyeFill = state.eyeCustomColor ? state.eyeColor : fillStyle;
      drawEye(ctx, padding, padding, cellSize, state.eyeFrame, state.eyeDot, eyeFill);
      drawEye(ctx, padding + (count - 7) * cellSize, padding, cellSize, state.eyeFrame, state.eyeDot, eyeFill);
      drawEye(ctx, padding, padding + (count - 7) * cellSize, cellSize, state.eyeFrame, state.eyeDot, eyeFill);

      // 7. 合成中心 Logo 图标 (若开启)
      if (state.logoType !== 'none') {
        drawCenterLogo(ctx, canvasSize, padding, count);
      }
    } catch (err) {
      console.warn('QR Code generation warning:', err.message);
    }
  }

  // 绘制单个码点
  function drawDot(ctx, x, y, size, style) {
    ctx.beginPath();
    if (style === 'dots') {
      const radius = size * 0.44;
      ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (style === 'rounded') {
      const r = size * 0.28;
      roundRect(ctx, x, y, size * 0.94, size * 0.94, r);
      ctx.fill();
    } else if (style === 'fluid') {
      const r = size * 0.48;
      roundRect(ctx, x + 1, y + 1, size - 2, size - 2, r);
      ctx.fill();
    } else {
      // 经典方形
      ctx.fillRect(x, y, size * 1.01, size * 1.01);
    }
  }

  // 绘制 7x7 定位码眼
  function drawEye(ctx, x, y, cellSize, frameStyle, dotStyle, fillStyle) {
    const eyeSize = 7 * cellSize;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = fillStyle;

    // 外框外圈 (7x7)
    if (frameStyle === 'circle') {
      ctx.lineWidth = cellSize;
      ctx.beginPath();
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, eyeSize / 2 - cellSize / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (frameStyle === 'rounded') {
      const radius = cellSize * 2;
      roundRect(ctx, x, y, eyeSize, eyeSize, radius);
      ctx.fill();
      // 掏空中空层 (5x5)
      ctx.fillStyle = state.bgTransparent ? '#ffffff' : state.bgColor;
      roundRect(ctx, x + cellSize, y + cellSize, eyeSize - 2 * cellSize, eyeSize - 2 * cellSize, radius * 0.7);
      ctx.fill();
    } else {
      // 经典方形
      ctx.fillRect(x, y, eyeSize, eyeSize);
      ctx.fillStyle = state.bgTransparent ? '#ffffff' : state.bgColor;
      ctx.fillRect(x + cellSize, y + cellSize, eyeSize - 2 * cellSize, eyeSize - 2 * cellSize);
    }

    // 中心内芯 (3x3)
    ctx.fillStyle = fillStyle;
    const centerOffset = 2 * cellSize;
    const centerSize = 3 * cellSize;
    const cx = x + centerOffset;
    const cy = y + centerOffset;

    if (dotStyle === 'circle') {
      ctx.beginPath();
      ctx.arc(cx + centerSize / 2, cy + centerSize / 2, centerSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      roundRect(ctx, cx, cy, centerSize, centerSize, cellSize * 0.5);
      ctx.fill();
    }

    ctx.restore();
  }

  // 绘制圆角矩形辅助函数
  function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // 绘制中心嵌入 Logo
  function drawCenterLogo(ctx, canvasSize, padding, count) {
    const ratio = state.logoSize / 100;
    const logoW = canvasSize * ratio;
    const logoH = logoW;
    const lx = (canvasSize - logoW) / 2;
    const ly = (canvasSize - logoH) / 2;

    const margin = state.logoMargin;
    ctx.save();

    // 绘制白色保护衬底
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
    ctx.shadowBlur = 8;
    roundRect(ctx, lx - margin, ly - margin, logoW + margin * 2, logoH + margin * 2, 6);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    if (state.logoType === 'custom' && state.customLogoImg) {
      ctx.drawImage(state.customLogoImg, lx, ly, logoW, logoH);
    } else if (PRESET_LOGOS[state.logoType]) {
      const img = presetLogoImages[state.logoType];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, lx, ly, logoW, logoH);
      } else {
        const tempImg = new Image();
        tempImg.onload = () => {
          presetLogoImages[state.logoType] = tempImg;
          renderQRCode();
        };
        tempImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(PRESET_LOGOS[state.logoType]);
      }
    }

    ctx.restore();
  }

  // ─── 4. 高分辨率导出 (PNG & SVG) ───
  function exportHighResCanvas(targetSize = 1024) {
    const offscreen = document.createElement('canvas');
    offscreen.width = targetSize;
    offscreen.height = targetSize;
    const octx = offscreen.getContext('2d');

    // 将当前设计按照 scale 等比放大重绘
    const scale = targetSize / canvas.width;
    octx.scale(scale, scale);
    octx.drawImage(canvas, 0, 0);

    return offscreen;
  }

  function downloadFile(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ─── 5. WebRTC 相机扫码模块 ───
  let mediaStream = null;
  let isScanning = false;
  let videoEl = document.getElementById('cameraVideo');

  async function startCameraScan() {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      videoEl.srcObject = mediaStream;
      isScanning = true;
      document.getElementById('btnStartCamera').innerHTML = '<span>⏹️</span><span>' + (I18N[currentLang]?.camera_stop || '停止摄像头') + '</span>';

      requestAnimationFrame(scanFrame);
    } catch (e) {
      alert('无法访问摄像头: ' + e.message + '。请检查浏览器权限。');
    }
  }

  function stopCameraScan() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    isScanning = false;
    document.getElementById('btnStartCamera').innerHTML = '<span>📹</span><span>' + (I18N[currentLang]?.camera_start || '开启摄像头扫码') + '</span>';
  }

  function scanFrame() {
    if (!isScanning) return;
    if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
      const scanCanvas = document.createElement('canvas');
      scanCanvas.width = videoEl.videoWidth;
      scanCanvas.height = videoEl.videoHeight;
      const scanCtx = scanCanvas.getContext('2d');
      scanCtx.drawImage(videoEl, 0, 0, scanCanvas.width, scanCanvas.height);
      const imgData = scanCtx.getImageData(0, 0, scanCanvas.width, scanCanvas.height);

      if (window.jsQR) {
        const code = window.jsQR(imgData.data, imgData.width, imgData.height);
        if (code && code.data) {
          handleScanSuccess(code.data);
          stopCameraScan();
          return;
        }
      }
    }
    requestAnimationFrame(scanFrame);
  }

  function handleScanSuccess(data) {
    const resultCard = document.getElementById('cameraResultCard');
    const resultText = document.getElementById('cameraResultText');
    if (resultCard && resultText) {
      resultCard.style.display = 'flex';
      resultText.textContent = data;
    }
    saveHistory(data, 'scan');
  }

  // ─── 6. 图片解码模块 ───
  function decodeImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const cx = c.getContext('2d');
        cx.drawImage(img, 0, 0);
        const imgData = cx.getImageData(0, 0, c.width, c.height);

        if (window.jsQR) {
          const code = window.jsQR(imgData.data, imgData.width, imgData.height);
          const resultCard = document.getElementById('decoderResultCard');
          const resultText = document.getElementById('decoderResultText');
          if (code && code.data) {
            resultCard.style.display = 'flex';
            resultText.textContent = code.data;
            saveHistory(code.data, 'decode');
          } else {
            alert(currentLang === 'zh' ? '未能识别出图片中的二维码，请尝试清晰裁剪后再试。' : 'No QR code found in this image.');
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ─── 7. 历史记录管理 ───
  function loadHistory() {
    try {
      const raw = localStorage.getItem('qr_studio_history');
      historyList = raw ? JSON.parse(raw) : [];
      renderHistoryList();
    } catch (e) {
      historyList = [];
    }
  }

  function saveHistory(content, type = 'create') {
    if (!content) return;
    const item = {
      id: Date.now(),
      content: content,
      type: type,
      time: new Date().toLocaleString()
    };
    historyList.unshift(item);
    if (historyList.length > 50) historyList.pop();
    localStorage.setItem('qr_studio_history', JSON.stringify(historyList));
    renderHistoryList();
  }

  function renderHistoryList() {
    const container = document.getElementById('historyListContainer');
    const badge = document.getElementById('historyBadge');
    if (!container) return;

    if (badge) {
      badge.textContent = historyList.length;
      badge.style.display = historyList.length > 0 ? 'inline-block' : 'none';
    }

    if (historyList.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 48px;">${currentLang === 'zh' ? '暂无历史记录' : 'No history yet'}</div>`;
      return;
    }

    container.innerHTML = historyList.map(item => `
      <div class="history-card" data-id="${item.id}">
        <div class="history-thumb">
          <span style="font-size: 24px;">${item.type === 'scan' ? '📷' : '🎨'}</span>
        </div>
        <div class="history-info">
          <div class="history-text" title="${escapeHtml(item.content)}">${escapeHtml(item.content)}</div>
          <div class="history-time">${item.time}</div>
        </div>
        <button class="btn-secondary-action btn-history-reuse" data-content="${encodeURIComponent(item.content)}" title="Load into Generator" style="padding: 4px 8px; font-size: 11px;">
          ${currentLang === 'zh' ? '载入' : 'Load'}
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.btn-history-reuse').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rawContent = decodeURIComponent(e.currentTarget.getAttribute('data-content'));
        state.text = rawContent;
        document.getElementById('inputUrl').value = rawContent;
        // 切换到生成面板
        document.querySelector('[data-tab="tab-generator"]').click();
        renderQRCode();
      });
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── 8. 事件监听与全流程绑定 ───
  document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化主题与语言
    applyTheme(currentTheme);
    initI18n();
    loadHistory();

    // 2. 侧边栏导航 Tab 切换
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        const targetTab = item.getAttribute('data-tab');
        const targetPane = document.getElementById(targetTab);
        if (targetPane) targetPane.classList.add('active');

        if (targetTab !== 'tab-camera' && isScanning) {
          stopCameraScan();
        }
      });
    });

    // 3. 语言切换
    const btnToggleLang = document.getElementById('btnToggleLang');
    if (btnToggleLang) {
      btnToggleLang.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('qr_studio_lang', currentLang);
        initI18n();
        renderHistoryList();
      });
    }

    // 4. 深浅模式切换
    const btnToggleTheme = document.getElementById('btnToggleTheme');
    if (btnToggleTheme) {
      btnToggleTheme.addEventListener('click', () => {
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // 5. 生成器内容模版切换
    document.querySelectorAll('.type-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.type-form-group').forEach(f => f.style.display = 'none');

        btn.classList.add('active');
        const type = btn.getAttribute('data-type');
        const targetForm = document.getElementById(`form-${type}`);
        if (targetForm) targetForm.style.display = 'block';

        updatePayloadFromForm();
      });
    });

    // 监听输入并更新
    const updatePayloadFromForm = () => {
      const activeType = document.querySelector('.type-tab-btn.active')?.getAttribute('data-type') || 'url';
      if (activeType === 'url') {
        state.text = document.getElementById('inputUrl').value.trim() || 'https://github.com';
      } else if (activeType === 'text') {
        state.text = document.getElementById('inputText').value.trim() || 'Hello QR Studio';
      } else if (activeType === 'wifi') {
        const ssid = document.getElementById('wifiSsid').value.trim();
        const type = document.getElementById('wifiType').value;
        const pass = document.getElementById('wifiPass').value.trim();
        state.text = `WIFI:S:${ssid};T:${type};P:${pass};;`;
      } else if (activeType === 'vcard') {
        const name = document.getElementById('vcardName').value.trim();
        const tel = document.getElementById('vcardTel').value.trim();
        const email = document.getElementById('vcardEmail').value.trim();
        const org = document.getElementById('vcardOrg').value.trim();
        state.text = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${tel}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;
      } else if (activeType === 'tel') {
        const tel = document.getElementById('inputTel').value.trim();
        const sms = document.getElementById('inputSms').value.trim();
        state.text = sms ? `SMSTO:${tel}:${sms}` : `tel:${tel}`;
      }
      renderQRCode();
    };

    ['inputUrl', 'inputText', 'wifiSsid', 'wifiType', 'wifiPass', 'vcardName', 'vcardTel', 'vcardEmail', 'vcardOrg', 'inputTel', 'inputSms'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updatePayloadFromForm);
      if (el) el.addEventListener('change', updatePayloadFromForm);
    });

    // 折叠展开 Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
      });
    });

    // 色彩填充模式切换
    const colorModeSelect = document.getElementById('colorModeSelect');
    if (colorModeSelect) {
      colorModeSelect.addEventListener('change', (e) => {
        state.colorMode = e.target.value;
        document.getElementById('fgColor2Row').style.display = state.colorMode === 'solid' ? 'none' : 'flex';
        renderQRCode();
      });
    }

    const fgColor1 = document.getElementById('fgColor1');
    const fgColor2 = document.getElementById('fgColor2');
    const bgColor = document.getElementById('bgColor');
    const bgTransparent = document.getElementById('bgTransparent');

    if (fgColor1) {
      fgColor1.addEventListener('input', (e) => {
        state.fgColor1 = e.target.value;
        document.getElementById('fgColor1Hex').textContent = e.target.value.toUpperCase();
        renderQRCode();
      });
    }
    if (fgColor2) {
      fgColor2.addEventListener('input', (e) => {
        state.fgColor2 = e.target.value;
        document.getElementById('fgColor2Hex').textContent = e.target.value.toUpperCase();
        renderQRCode();
      });
    }
    if (bgColor) {
      bgColor.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        renderQRCode();
      });
    }
    if (bgTransparent) {
      bgTransparent.addEventListener('change', (e) => {
        state.bgTransparent = e.target.checked;
        renderQRCode();
      });
    }

    // 预设色板点击
    document.querySelectorAll('.palette-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.palette-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const c1 = chip.getAttribute('data-c1');
        const c2 = chip.getAttribute('data-c2');
        state.fgColor1 = c1;
        state.fgColor2 = c2;
        fgColor1.value = c1;
        fgColor2.value = c2;
        document.getElementById('fgColor1Hex').textContent = c1.toUpperCase();
        document.getElementById('fgColor2Hex').textContent = c2.toUpperCase();
        renderQRCode();
      });
    });

    // 点阵样式切换
    document.querySelectorAll('.dot-option-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.dot-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.dotStyle = card.getAttribute('data-dot');
        renderQRCode();
      });
    });

    // 码眼设置
    const eyeFrameSelect = document.getElementById('eyeFrameSelect');
    const eyeDotSelect = document.getElementById('eyeDotSelect');
    const eyeCustomColor = document.getElementById('eyeCustomColor');
    const eyeColor = document.getElementById('eyeColor');

    if (eyeFrameSelect) eyeFrameSelect.addEventListener('change', (e) => { state.eyeFrame = e.target.value; renderQRCode(); });
    if (eyeDotSelect) eyeDotSelect.addEventListener('change', (e) => { state.eyeDot = e.target.value; renderQRCode(); });
    if (eyeCustomColor) {
      eyeCustomColor.addEventListener('change', (e) => {
        state.eyeCustomColor = e.target.checked;
        document.getElementById('eyeColorPickerWrapper').style.display = e.target.checked ? 'flex' : 'none';
        renderQRCode();
      });
    }
    if (eyeColor) eyeColor.addEventListener('input', (e) => { state.eyeColor = e.target.value; renderQRCode(); });

    // Logo 预设与自定义上传
    document.querySelectorAll('.logo-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.logo-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.logoType = btn.getAttribute('data-logo');
        renderQRCode();
      });
    });

    const logoFileInput = document.getElementById('logoFileInput');
    if (logoFileInput) {
      logoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const img = new Image();
            img.onload = () => {
              state.customLogoImg = img;
              state.logoType = 'custom';
              renderQRCode();
            };
            img.src = re.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const logoSizeRange = document.getElementById('logoSizeRange');
    const logoMarginRange = document.getElementById('logoMarginRange');
    if (logoSizeRange) {
      logoSizeRange.addEventListener('input', (e) => {
        state.logoSize = parseInt(e.target.value);
        document.getElementById('logoSizeVal').textContent = `${state.logoSize}%`;
        renderQRCode();
      });
    }
    if (logoMarginRange) {
      logoMarginRange.addEventListener('input', (e) => {
        state.logoMargin = parseInt(e.target.value);
        document.getElementById('logoMarginVal').textContent = `${state.logoMargin}px`;
        renderQRCode();
      });
    }

    // ECC 与导出尺寸
    const eccSelect = document.getElementById('eccSelect');
    const exportSizeSelect = document.getElementById('exportSizeSelect');
    if (eccSelect) eccSelect.addEventListener('change', (e) => { state.ecc = e.target.value; renderQRCode(); });
    if (exportSizeSelect) exportSizeSelect.addEventListener('change', (e) => { state.exportSize = parseInt(e.target.value); });

    // 导出 PNG
    const btnDownloadPng = document.getElementById('btnDownloadPng');
    if (btnDownloadPng) {
      btnDownloadPng.addEventListener('click', () => {
        const highResCanvas = exportHighResCanvas(state.exportSize);
        downloadFile(highResCanvas.toDataURL('image/png'), `qrcode-${Date.now()}.png`);
        saveHistory(state.text, 'create');
      });
    }

    // 导出 SVG 矢量图
    const btnDownloadSvg = document.getElementById('btnDownloadSvg');
    if (btnDownloadSvg) {
      btnDownloadSvg.addEventListener('click', () => {
        try {
          if (!state.text || !state.text.trim()) {
            alert(currentLang === 'zh' ? '请先输入二维码内容' : 'Please enter QR code content first');
            return;
          }

          // 正确创建 QRCode 实例获取矩阵模型，避免 a.appendChild 异常
          const tempDiv = document.createElement('div');
          const qrInstance = new QRCode(tempDiv, {
            text: state.text,
            correctLevel: QRCode.CorrectLevel[state.ecc] || QRCode.CorrectLevel.H
          });
          const qr = qrInstance._oQRCode;
          if (!qr) {
            alert(currentLang === 'zh' ? '生成二维码数据失败' : 'Failed to generate QR data');
            return;
          }

          const count = qr.getModuleCount();
          const svgSize = 1000;
          const padding = 50;
          const contentSize = svgSize - padding * 2;
          const cellSize = contentSize / count;

          // 1. 渐变与色彩定义
          let defsXml = '';
          let mainFill = state.fgColor1;

          if (state.colorMode === 'linear') {
            defsXml = `
  <defs>
    <linearGradient id="qrGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${state.fgColor1}"/>
      <stop offset="100%" stop-color="${state.fgColor2}"/>
    </linearGradient>
  </defs>`;
            mainFill = 'url(#qrGrad)';
          } else if (state.colorMode === 'radial') {
            defsXml = `
  <defs>
    <radialGradient id="qrGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${state.fgColor1}"/>
      <stop offset="100%" stop-color="${state.fgColor2}"/>
    </radialGradient>
  </defs>`;
            mainFill = 'url(#qrGrad)';
          }

          // 2. 背景
          const bgXml = !state.bgTransparent 
            ? `<rect width="100%" height="100%" fill="${state.bgColor}"/>` 
            : '';

          // 3. 辅助函数：判断是否处于 3 个定位码眼内
          const isFinder = (r, c) => {
            if (r < 7 && c < 7) return true;
            if (r < 7 && c >= count - 7) return true;
            if (r >= count - 7 && c < 7) return true;
            return false;
          };

          // 4. 常规数据模块
          let modulesXml = '';
          for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
              if (isFinder(r, c)) continue;
              if (qr.isDark(r, c)) {
                const x = padding + c * cellSize;
                const y = padding + r * cellSize;
                if (state.dotStyle === 'circle' || state.dotStyle === 'dots') {
                  const radius = cellSize * 0.44;
                  modulesXml += `<circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${radius}" fill="${mainFill}"/>\n`;
                } else if (state.dotStyle === 'rounded') {
                  const rx = cellSize * 0.35;
                  modulesXml += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${cellSize - 1}" height="${cellSize - 1}" rx="${rx}" fill="${mainFill}"/>\n`;
                } else if (state.dotStyle === 'fluid') {
                  const rx = cellSize * 0.48;
                  modulesXml += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${cellSize - 1}" height="${cellSize - 1}" rx="${rx}" fill="${mainFill}"/>\n`;
                } else {
                  // 经典方形，1.01 避免拼接微缝
                  modulesXml += `<rect x="${x}" y="${y}" width="${cellSize * 1.01}" height="${cellSize * 1.01}" fill="${mainFill}"/>\n`;
                }
              }
            }
          }

          // 5. 绘制三个定位码眼
          const eyeFill = state.eyeCustomColor ? state.eyeColor : mainFill;
          const bgFill = state.bgTransparent ? '#ffffff' : state.bgColor;
          let eyesXml = '';

          const drawEyeSvg = (ex, ey) => {
            const eyeSize = 7 * cellSize;
            const centerOffset = 2 * cellSize;
            const centerSize = 3 * cellSize;
            const cx = ex + centerOffset;
            const cy = ey + centerOffset;

            let eyeSvg = '';
            // 外框
            if (state.eyeFrame === 'circle') {
              eyeSvg += `<circle cx="${ex + eyeSize / 2}" cy="${ey + eyeSize / 2}" r="${eyeSize / 2 - cellSize / 2}" fill="none" stroke="${eyeFill}" stroke-width="${cellSize}"/>\n`;
            } else if (state.eyeFrame === 'rounded') {
              const r1 = cellSize * 2;
              const r2 = cellSize * 1.4;
              eyeSvg += `<rect x="${ex}" y="${ey}" width="${eyeSize}" height="${eyeSize}" rx="${r1}" fill="${eyeFill}"/>\n`;
              eyeSvg += `<rect x="${ex + cellSize}" y="${ey + cellSize}" width="${eyeSize - 2 * cellSize}" height="${eyeSize - 2 * cellSize}" rx="${r2}" fill="${bgFill}"/>\n`;
            } else {
              // 经典方形
              eyeSvg += `<rect x="${ex}" y="${ey}" width="${eyeSize}" height="${eyeSize}" fill="${eyeFill}"/>\n`;
              eyeSvg += `<rect x="${ex + cellSize}" y="${ey + cellSize}" width="${eyeSize - 2 * cellSize}" height="${eyeSize - 2 * cellSize}" fill="${bgFill}"/>\n`;
            }

            // 内芯
            if (state.eyeDot === 'circle') {
              eyeSvg += `<circle cx="${cx + centerSize / 2}" cy="${cy + centerSize / 2}" r="${centerSize / 2}" fill="${eyeFill}"/>\n`;
            } else {
              eyeSvg += `<rect x="${cx}" y="${cy}" width="${centerSize}" height="${centerSize}" rx="${cellSize * 0.5}" fill="${eyeFill}"/>\n`;
            }
            return eyeSvg;
          };

          eyesXml += drawEyeSvg(padding, padding);
          eyesXml += drawEyeSvg(padding + (count - 7) * cellSize, padding);
          eyesXml += drawEyeSvg(padding, padding + (count - 7) * cellSize);

          // 6. 嵌入中心 Logo (若启用)
          let logoXml = '';
          if (state.logoType !== 'none') {
            const ratio = (state.logoSize || 22) / 100;
            const logoW = contentSize * ratio;
            const logoH = logoW;
            const lx = (svgSize - logoW) / 2;
            const ly = (svgSize - logoH) / 2;
            const margin = (state.logoMargin || 4) * (contentSize / 280);

            // 白色保护衬底
            logoXml += `<rect x="${lx - margin}" y="${ly - margin}" width="${logoW + margin * 2}" height="${logoH + margin * 2}" rx="12" fill="#ffffff" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.15))"/>\n`;

            if (state.logoType === 'custom' && state.customLogoImg) {
              logoXml += `<image x="${lx}" y="${ly}" width="${logoW}" height="${logoH}" href="${state.customLogoImg.src}" preserveAspectRatio="xMidYMid meet"/>\n`;
            } else if (PRESET_LOGOS[state.logoType]) {
              const svgStr = PRESET_LOGOS[state.logoType];
              logoXml += `<svg x="${lx}" y="${ly}" width="${logoW}" height="${logoH}" viewBox="0 0 24 24">${svgStr.replace(/^<svg[^>]*>|<\/svg>$/gi, '')}</svg>\n`;
            }
          }

          // 7. 组装最终 SVG XML
          const finalSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
  ${defsXml}
  ${bgXml}
  ${modulesXml}
  ${eyesXml}
  ${logoXml}
</svg>`;

          const blob = new Blob([finalSvg], { type: 'image/svg+xml;charset=utf-8' });
          downloadFile(URL.createObjectURL(blob), `qrcode-${Date.now()}.svg`);
          saveHistory(state.text, 'create');
        } catch (err) {
          console.error('导出 SVG 矢量图失败:', err);
          alert((currentLang === 'zh' ? '导出 SVG 失败: ' : 'Failed to export SVG: ') + err.message);
        }
      });
    }

    // 复制图片到剪贴板
    const btnCopyImage = document.getElementById('btnCopyImage');
    if (btnCopyImage) {
      btnCopyImage.addEventListener('click', () => {
        canvas.toBlob((blob) => {
          if (blob && navigator.clipboard && navigator.clipboard.write) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(() => {
              const orig = btnCopyImage.innerHTML;
              btnCopyImage.innerHTML = `<span>✅</span><span>${I18N[currentLang]?.copied || '已复制！'}</span>`;
              setTimeout(() => { btnCopyImage.innerHTML = orig; }, 1500);
            });
          }
        });
      });
    }

    // 相机扫码启动/停止
    const btnStartCamera = document.getElementById('btnStartCamera');
    if (btnStartCamera) {
      btnStartCamera.addEventListener('click', () => {
        if (isScanning) {
          stopCameraScan();
        } else {
          startCameraScan();
        }
      });
    }

    // 复制相机识别结果
    const btnCopyCameraResult = document.getElementById('btnCopyCameraResult');
    if (btnCopyCameraResult) {
      btnCopyCameraResult.addEventListener('click', () => {
        const text = document.getElementById('cameraResultText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          btnCopyCameraResult.textContent = I18N[currentLang]?.copied || '已复制！';
          setTimeout(() => { btnCopyCameraResult.textContent = I18N[currentLang]?.btn_copy || '复制结果'; }, 1500);
        });
      });
    }

    // 图片拖拽与选择上传
    const dropZone = document.getElementById('dropZone');
    const decodeFileInput = document.getElementById('decodeFileInput');
    if (dropZone && decodeFileInput) {
      dropZone.addEventListener('click', () => decodeFileInput.click());
      decodeFileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) decodeImageFile(e.target.files[0]);
      });

      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files[0]) decodeImageFile(e.dataTransfer.files[0]);
      });
    }

    // 全局剪贴板粘贴识别监听 (Ctrl+V / Cmd+V)
    window.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          // 切换到识别 Tab 并解析
          document.querySelector('[data-tab="tab-decoder"]')?.click();
          decodeImageFile(file);
          break;
        }
      }
    });

    // 复制图片解析结果
    const btnCopyDecodeResult = document.getElementById('btnCopyDecodeResult');
    if (btnCopyDecodeResult) {
      btnCopyDecodeResult.addEventListener('click', () => {
        const text = document.getElementById('decoderResultText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          btnCopyDecodeResult.textContent = I18N[currentLang]?.copied || '已复制！';
          setTimeout(() => { btnCopyDecodeResult.textContent = I18N[currentLang]?.btn_copy || '复制'; }, 1500);
        });
      });
    }

    // 从解析结果重新载入生成器
    const btnOpenInGenerator = document.getElementById('btnOpenInGenerator');
    if (btnOpenInGenerator) {
      btnOpenInGenerator.addEventListener('click', () => {
        const text = document.getElementById('decoderResultText')?.textContent || '';
        state.text = text;
        document.getElementById('inputUrl').value = text;
        document.querySelector('[data-tab="tab-generator"]')?.click();
        renderQRCode();
      });
    }

    // 清空历史记录
    const btnClearHistory = document.getElementById('btnClearHistory');
    if (btnClearHistory) {
      btnClearHistory.addEventListener('click', () => {
        if (confirm(currentLang === 'zh' ? '确定要清空全部历史记录吗？' : 'Clear all history?')) {
          historyList = [];
          localStorage.removeItem('qr_studio_history');
          renderHistoryList();
        }
      });
    }

    // 点击左上角 Logo 跳转至官方宣传页 (https://qrcode.rowkin.xyz/)
    const studioBrandHeader = document.getElementById('studioBrandHeader');
    if (studioBrandHeader) {
      studioBrandHeader.addEventListener('click', () => {
        window.open('https://qrcode.rowkin.xyz/', '_blank');
      });
    }

    // 解析 URL 参数 ?url=... (若无参数则默认 fallback 至 https://qrcode.rowkin.xyz/)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramUrl = urlParams.get('url');
      if (paramUrl && paramUrl.trim()) {
        state.text = paramUrl.trim();
      } else {
        state.text = 'https://qrcode.rowkin.xyz/';
      }
      const inputUrlEl = document.getElementById('inputUrl');
      if (inputUrlEl) {
        inputUrlEl.value = state.text;
      }
    } catch (e) {
      console.warn('Failed to parse url param:', e);
    }

    // 初次绘制渲染二维码
    renderQRCode();
  });
})();
