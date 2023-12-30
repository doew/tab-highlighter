function saveSettings() {
  const host = document.getElementById('hostName').textContent;
  const message = document.getElementById('message').value;
  const color = document.getElementById('color').value;

  chrome.storage.sync.get('hosts', (data) => {
    const updatedHosts = { ...data.hosts, [host]: { message, color } };
    chrome.storage.sync.set({ hosts: updatedHosts }, () => {
      console.log('Settings saved for', host);
    });
  });
}

document.getElementById('saveButton').addEventListener('click', saveSettings);

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0].url) {
    const url = new URL(tabs[0].url);
    document.getElementById('hostName').textContent = url.hostname;
    chrome.storage.sync.get('hosts', (data) => {
      if (data.hosts[url.hostname]) {
        document.getElementById('message').value = data.hosts[url.hostname].message;
        document.getElementById('color').value = data.hosts[url.hostname].color;
      }
    });
  }
});
