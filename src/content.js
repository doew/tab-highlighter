chrome.runtime.onMessage.addListener(({ hostSettings }) => {
  if (!hostSettings.message) {
    return;
  }

  const existingBanner = document.getElementById('chromeExtensionBanner');
  if (existingBanner) {
    existingBanner.remove();
  }

  const banner = document.createElement('div');
  banner.id = 'chromeExtensionBanner';
  banner.textContent = hostSettings.message;
  banner.style.backgroundColor = hostSettings.color || 'blue';
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.height = '50px';
  banner.style.lineHeight = '50px';
  banner.style.textAlign = 'center';
  banner.style.color = 'white';
  banner.style.fontSize = '20px';
  banner.style.zIndex = '1000';

  document.body.style.paddingTop = '50px';
  document.body.prepend(banner);
});
