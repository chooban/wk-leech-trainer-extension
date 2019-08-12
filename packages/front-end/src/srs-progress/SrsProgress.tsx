import { LeechesAPI } from '@chooban/leeches'
import { h, render } from 'preact'

import { getApiKey } from '../wk-account'
import createTargetNode from './create-node'
import { SrsProgressList } from './SrsProgressList'

export default async function srsProgress(settings: { [key: string]: any }) {
  if (!settings.showSrsStats) {
    const progressNodes = document.querySelectorAll('.srs-progress [data-wk-ext=true]')
    if (progressNodes) {
      progressNodes.forEach((node) => node.remove())
    }
    return
  }

  const key = await getApiKey()
  const api = LeechesAPI(key)

  const observer = new MutationObserver(() => {
    // Trying to set the heigh of an ul can be fun! In this instance we want child elements
    // to expand to the height of the parent, and the parent to be the height of the largest child
    // element. We know that by adding elements to the first one we'll increase the size of the
    // child so then we have to set that height on the parent so that other children can inherit it.
    const node: HTMLElement = document.querySelector('.srs-progress')
    const progressionList = node.querySelector('ul')
    const { height } = node.getBoundingClientRect()

    node.style.height = `${height}px`
    progressionList.style.height = '100%'

    const categories = progressionList.querySelectorAll('li')
    /* eslint-disable no-param-reassign */
    categories.forEach((category) => {
      category.style.height = '100%'
      category.style['vertical-align'] = 'top'
    })
    /* eslint-enable no-param-reassign */
  })

  observer.observe(document.querySelector('.srs-progress'), {
    childList: true,
    subtree: true,
  })

  const apprenticeProgress = document.querySelector('.srs-progress > ul > li#apprentice')
  const apprContainer =
    apprenticeProgress.querySelector('[data-wk-ext=true]') === null
      ? apprenticeProgress.insertBefore(createTargetNode(), apprenticeProgress.lastChild)
      : apprenticeProgress.querySelector('[data-wk-ext=true]')

  const guruProgress = document.querySelector('.srs-progress > ul > li#guru')
  const guruContainer =
    guruProgress.querySelector('[data-wk-ext=true]') === null
      ? guruProgress.insertBefore(createTargetNode(), guruProgress.lastChild)
      : guruProgress.querySelector('[data-wk-ext=true]')

  render(<SrsProgressList api={api} levels={[1, 2, 3, 4]} />, apprContainer)
  render(<SrsProgressList api={api} levels={[5, 6]} />, guruContainer)
}
