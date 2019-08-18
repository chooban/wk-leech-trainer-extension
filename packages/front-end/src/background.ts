chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action === 'retrievingLeeches') {
    console.log('Retrieving leeches')
  } else if (request.action === 'displayPageIcon') {
    if (sender) {
      chrome.pageAction.show(sender.tab.id)
    }
  }
})
