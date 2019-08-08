import { LeechCount } from './leech-count/LeechCount'
import srsProgress from './srs-progress/SrsProgress'
// import skipSummary from './skip-reviews-summary'

function main() {
  chrome.storage.sync.get((settings) => {
    LeechCount(settings)
    srsProgress(settings)
    // skipSummary(settings.skipReviewsSummary)
  })
  chrome.runtime.sendMessage('displayIcon')
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'settingsUpdated') {
    main()
  }
})

main()
