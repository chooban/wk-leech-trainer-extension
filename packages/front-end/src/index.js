import leechBadgeDom from './html/leech-badge.html'
import elem from './element'
import * as wk from './wk-account'
import * as leechStore from './leech-store'
import leechCountObserver from './leech-count-observer'
import Popup from './show-leeches-popup'

function readAndRun() {
  chrome.storage.sync.get({
    showLeechCount: false
  }, main)
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'settingsUpdated') {
    readAndRun()
  }
})

function displayIcon() {
  chrome.runtime.sendMessage({ action: 'displayPageIcon' })
  setTimeout(displayIcon, 1000)
}

export default function main(settings) {
  if (!settings.showLeechCount) {
    const leechBadge = document.querySelector('ul.nav > li.leeches')
    if (leechBadge) {
      leechBadge.remove()
    }

    return
  }

  const reviewsBadge = document.querySelector('ul.nav > li.reviews')
  const leechBadgeNode = reviewsBadge.parentElement.appendChild(elem(leechBadgeDom))
  const availableLeeches = leechBadgeNode.querySelector('.available_leeches')
  const updateLeeches = () => wk.getApiKey()
    .then(leechStore.refresh)
    .then(() => {
      availableLeeches.textContent = leechStore.count()
    })

  const popup = new Popup()
  popup.onHide(updateLeeches)

  const observer = new MutationObserver(leechCountObserver(
    leechBadgeNode,
    () => popup.show(leechStore.lessonItems())
  ))

  observer.observe(availableLeeches, {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false
  })

  updateLeeches()
}

readAndRun()
displayIcon()
