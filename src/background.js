chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ hosts: {} });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    chrome.storage.sync.get('hosts', (data) => {
      const hostSettings = data.hosts[url.hostname] || {};
      chrome.tabs.sendMessage(tabId, { hostSettings });
    });
  }
});
