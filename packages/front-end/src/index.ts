import leechCount from './show-leech-count'
import srsProgress from './show-srs-levels'
import skipSummary from './skip-reviews-summary'

function main() {
  chrome.storage.sync.get((settings) => {
    leechCount(settings.showLeechCount)
    srsProgress(settings.showSrsStats)
    skipSummary(settings.skipReviewsSummary)
  })
  chrome.runtime.sendMessage('displayIcon')
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'settingsUpdated') {
    main()
  }
})

main()
