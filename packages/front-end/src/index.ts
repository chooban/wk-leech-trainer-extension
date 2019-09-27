import { LeechCount } from './leech-count/LeechCount'
import srsProgress from './srs-progress/SrsProgress'
// import skipSummary from './skip-reviews-summary'

function main() {
  LeechCount()
  srsProgress()
  // skipSummary(settings.skipReviewsSummary)
  browser.runtime.sendMessage('displayIcon')
}

browser.runtime.onMessage.addListener((request) => {
  if (request.action === 'settingsUpdated') {
    main()
  }
})

main()
