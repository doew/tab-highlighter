function saveSettings() {
  const host = document.getElementById('hostName').textContent;
  const path = document.getElementById('path').value;
  const message = document.getElementById('message').value;
  const color = document.getElementById('color').value;

  chrome.storage.sync.get('hosts', (data) => {
    const updatedHosts = { ...data.hosts, [host + path]: { message, color } };
    chrome.storage.sync.set({ hosts: updatedHosts }, () => {
      console.log('Settings saved for', host + path);
    });
  });
}

document.getElementById('saveButton').addEventListener('click', saveSettings);

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0].url) {
    const url = new URL(tabs[0].url);
    document.getElementById('hostName').textContent = url.hostname;
    document.getElementById('path').value = url.pathname;
    chrome.storage.sync.get('hosts', (data) => {
      const hostPath = url.hostname + url.pathname;
      if (data.hosts[hostPath]) {
        document.getElementById('message').value = data.hosts[hostPath].message;
        document.getElementById('color').value = data.hosts[hostPath].color;
      }
    });
  }
});
