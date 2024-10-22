document.getElementById('settingsForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const host = document.getElementById('host').value;
  const path = document.getElementById('path').value;
  const message = document.getElementById('message').value;
  const color = document.getElementById('color').value;

  chrome.storage.sync.get('hosts', (data) => {
    const updatedHosts = {...data.hosts, [host + path]: { message, color }};
    chrome.storage.sync.set({ hosts: updatedHosts });
  });
});
