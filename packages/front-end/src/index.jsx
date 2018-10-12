import { h, render } from 'preact'
import wkjs from '@chooban/wkjs'
import leechBadgeDom from './html/leech-badge.html'
import elem from './element'
import * as wk from './wk-account'
import * as leechStore from './leech-store'
import leechCountObserver from './leech-count-observer'
import Popup from './show-leeches-popup'
import SrsProgress from './components/srs-progress'

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

function createTargetNode() {
  const targetNode = document.createElement('span')
  targetNode.setAttribute('data-wk-ext', 'true')
  return targetNode
}

async function srsProgress(show) {
  if (!show) {
    const progressNodes = document.querySelectorAll('.srs-progress [data-wk-ext=true]')
    if (progressNodes) {
      progressNodes.forEach((node) => node.remove())
    }
    return
  }

  const key = await wk.getApiKey()
  const api = wkjs(key)

  const observer = new MutationObserver(() => {
    const node = document.querySelector('.srs-progress')
    const { height } = node.getBoundingClientRect()
    node.style.height = `${height}px`
    const progressionList = node.querySelector('ul')
    progressionList.style.height = '100%'

    const categories = progressionList.querySelectorAll('li')
    for (let i = 0; i < categories.length; i += 1) {
      categories[i].style.height = '100%'
      categories[i].style['vertical-align'] = 'top'
    }
  })

  observer.observe(document.querySelector('.srs-progress'), {
    childList: true,
    subtree: true
  })

  const apprenticeProgress = document.querySelector('.srs-progress > ul > li#apprentice')
  const apprContainer = apprenticeProgress.querySelector('[data-wk-ext=true]') === null
    ? apprenticeProgress.insertBefore(createTargetNode(), apprenticeProgress.lastChild)
    : apprenticeProgress.querySelector('[data-wk-ext=true]')

  const guruProgress = document.querySelector('.srs-progress > ul > li#guru')
  const guruContainer = guruProgress.querySelector('[data-wk-ext=true]') === null
    ? guruProgress.insertBefore(createTargetNode(), guruProgress.lastChild)
    : guruProgress.querySelector('[data-wk-ext=true]')

  render(
    <SrsProgress api={api} levels={[1, 2, 3, 4]} />,
    apprenticeProgress,
    apprContainer
  )
  render(
    <SrsProgress api={api} levels={[5, 6]} />,
    guruProgress,
    guruContainer
  )
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
