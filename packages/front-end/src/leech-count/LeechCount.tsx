import { h, render } from 'preact'

import * as leechStore from './leech-store'
import { OptionTypes } from '../options'

const createContainer = () => {
  const targetNode = document.createElement('li')
  targetNode.setAttribute('class', 'navigation-shortcut navigation-shortcut--leeches')
  return targetNode
}

const LeechBadge = ({ count }: { count: number }) => (
  // eslint-disable-next-line
  <a href="#">
    <span className="available_leeches">{count}</span>
    Leeches
  </a>
)

const LeechCount = async () => {
  const settings = await browser.storage.sync.get(OptionTypes.SHOW_LEECH_COUNT)
  const existingBadge: HTMLElement = document.querySelector('ul.navigation-shortcuts > li.navigation-shortcut--leeches')

  if (!settings[OptionTypes.SHOW_LEECH_COUNT]) {
    if (existingBadge) {
      existingBadge.remove()
    }
    return
  }

  const badgeContainer =
    existingBadge === null
      ? document.querySelector('ul.navigation-shortcuts').appendChild(createContainer())
      : existingBadge

  render(<LeechBadge count={leechStore.leechCount()} />, badgeContainer)
}

export { LeechCount }
