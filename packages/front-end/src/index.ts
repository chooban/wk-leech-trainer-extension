import skipSummary from './skip-reviews-summary'
import srsProgress from './show-srs-levels'
import leechCount from './show-leech-count'

function main() {
  chrome.storage.sync.get((settings) => {
    leechCount(settings.showLeechCount)
    srsProgress(settings.showSrsStats)
    skipSummary(settings.skipReviewsSummary)
  })
  chrome.extension.sendMessage('displayIcon')
}


chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'settingsUpdated') {
    main()
  }
})

main()
