function saveLeechCount() {
  const showLeeches = document.getElementById('show_leech_count').checked

  chrome.storage.sync.set({
    showLeechCount: showLeeches
  }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'settingsUpdated' })
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    showLeechCount: false
  }, (settings) => {
    document.getElementById('show_leech_count').checked = settings.showLeechCount
  })
})

document.getElementById('show_leech_count').addEventListener('click', saveLeechCount)
