import { h } from 'preact'

export default ({ count }) => (
  <li className='navigation-shortcut navigation-shortcut--leeches' data-count={count}>
    <a>
      <span className='available_leeches'>{count}</span>
      Leeches
    </a>
  </li>
)
