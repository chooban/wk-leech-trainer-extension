import { h, render } from 'preact'
import wkjs from '@chooban/wkjs'
import leechBadgeDom from './html/leech-badge.html'
import elem from './element'
import * as wk from './wk-account'
import * as leechStore from './leech-store'
import leechCountObserver from './leech-count-observer'
import Popup from './show-leeches-popup'
import SrsProgress from './srs-progress'

function readAndRun() {
  chrome.storage.sync.get({
    showLeechCount: false,
    showSrsStats: false
  }, (settings) => {
    main(settings)
  })
}

function leechCount(show) {
  if (!show) {
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

function srsProgress(show) {
  if (!show) {
    const progressNodes = document.querySelectorAll('.srs-progress [data-wk-ext=true]')
    if (progressNodes) {
      progressNodes.forEach((node) => node.remove())
    }
    return
  }

  wk.getApiKey()
    .then((key) => {
      const api = wkjs(key)
      const apprenticeProgress = document.querySelector('.srs-progress > ul > li#apprentice > span')
      const apprenticeRoot = apprenticeProgress.appendChild(document.createElement('span'))
      apprenticeRoot.setAttribute('data-wk-ext', true)

      const guruProgress = document.querySelector('.srs-progress > ul > li#guru > span')
      const guruRoot = guruProgress.appendChild(document.createElement('span'))
      guruRoot.setAttribute('data-wk-ext', true)

      render(<SrsProgress api={api} levels={[1, 2, 3, 4]} />, apprenticeRoot)
      render(<SrsProgress api={api} levels={[5, 6]} />, guruRoot)
    })
}

export default function main(settings) {
  leechCount(settings.showLeechCount)
  srsProgress(settings.showSrsStats)
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'settingsUpdated') {
    readAndRun()
  }
})

readAndRun()
