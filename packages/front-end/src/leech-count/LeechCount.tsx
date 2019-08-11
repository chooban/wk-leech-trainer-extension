import { h, render } from 'preact'

import * as leechStore from './leech-store'

const createContainer = () => {
  const targetNode = document.createElement('li')
  targetNode.setAttribute('class', 'navigation-shortcut navigation-shortcut--leeches')
  return targetNode
}

const LeechBadge = ({ count }) => (
  // eslint-disable-next-line
  <a href="#">
    <span className="available_leeches">{count}</span>
    Leeches
  </a>
)

const LeechCount = (settings: { [key: string]: any }) => {
  const existingBadge: HTMLElement = document.querySelector('ul.navigation-shortcuts > li.navigation-shortcut--leeches')

  if (!settings.showLeechCount) {
    if (existingBadge) {
      existingBadge.remove()
    }
    return
  }

  const badgeContainer = existingBadge === null
    ? document.querySelector('ul.navigation-shortcuts').appendChild(createContainer())
    : existingBadge

  render(<LeechBadge count={leechStore.leechCount()} />, badgeContainer)
}

export { LeechCount }
