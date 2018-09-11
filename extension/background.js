chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'displayPageIcon') {
    if (sender) {
      chrome.pageAction.show(sender.tab.id);
    }
  }
});

console.log('Background');
