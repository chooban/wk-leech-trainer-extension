import { h } from 'preact'

export default ({ count }) => (
  <li className="reviews leeches">
    <a>
      <span className="available_leeches">{count}</span>
      Leeches
    </a>
  </li>
)
