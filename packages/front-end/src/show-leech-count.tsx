import { h, render } from 'preact'

import LeechBadge from './components/leech-count'
import createTargetNode from './create-node'
import * as leechStore from './leech-store'

export default function leechCount(show: boolean) {
  const existingBadge = document.querySelector('ul.nav > li.leeches') as HTMLElement

  if (!show) {
    if (existingBadge) {
      existingBadge.remove()
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
    existingBadge,
    badgeContainer,
  )
}
