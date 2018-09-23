chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action === 'displayPageIcon') {
    if (sender) {
      chrome.pageAction.show(sender.tab.id)
    }
  }
})
