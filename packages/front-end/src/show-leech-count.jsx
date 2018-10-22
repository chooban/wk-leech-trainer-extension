import { h, render } from 'preact'

import * as leechStore from './leech-store'
import createTargetNode from './create-node'
import LeechBadge from './components/leech-count'

export default function leechCount(show) {
  if (!show) {
    const leechBadge = document.querySelector('ul.nav > li.leeches')
    if (leechBadge) {
      leechBadge.remove()
    }
    return
  }

  const count = leechStore.leechCount()
  const leechBadge = document.querySelector('ul.nav > li.leeches')
  const navBar = document.querySelector('ul.nav')
  const badgeContainer = navBar.querySelector('[data-wk-ext=true]') === null
    ? navBar.appendChild(createTargetNode())
    : navBar.querySelector('[data-wk-ext=true]')

  render(
    <LeechBadge count={count} />,
    leechBadge,
    badgeContainer
  )
}
