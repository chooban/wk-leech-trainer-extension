import { h, render } from 'preact'

import LeechBadge from './components/leech-count'
import createTargetNode from './create-node'
import * as leechStore from './leech-store'

export default function leechCount(settings: { [key: string]: any }) {
  const existingBadge: HTMLElement = document.querySelector('ul.nav > li.leeches')

  if (!settings.showLeechCount) {
    if (existingBadge) {
      existingBadge.remove()
    }
    return
  }

  const count = leechStore.leechCount()
  const navBar = document.querySelector('ul.navigation-shortcuts')
  const badgeContainer = navBar.querySelector('[data-wk-ext=true]') === null
    ? navBar.appendChild(createTargetNode())
    : navBar.querySelector('[data-wk-ext=true]')

  render(
    <LeechBadge count={count} />,
    existingBadge,
    badgeContainer,
  )
}
