import { h, Component } from 'preact'

class SrsProgress extends Component {
  constructor() {
    super()
    this.state.levelCounts = []
  }

  componentWillMount() {
    const { api, levels } = this.props
    api.progress(levels)
      .then((counts) => {
        this.setState({
          levelCounts: levels.map((l) => counts[`${l}`])
        })
      })
  }

  render(props, state) {
    const { levelCounts } = state
    return (
      <span>{levelCounts.join('/')}</span>
    )
  }
}

export default SrsProgress
