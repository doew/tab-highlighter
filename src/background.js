chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ hosts: {} });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    chrome.storage.sync.get('hosts', (data) => {
      const hostSettings = data.hosts[url.hostname] || {};
      const pathSettings = data.hosts[url.hostname + url.pathname] || {};
      const combinedSettings = { ...hostSettings, ...pathSettings };
      chrome.tabs.sendMessage(tabId, { hostSettings: combinedSettings });
    });
  }
});
