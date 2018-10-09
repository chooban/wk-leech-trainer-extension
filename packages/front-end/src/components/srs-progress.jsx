import { h, Component } from 'preact'

class SrsProgress extends Component {
  constructor() {
    super()
    this.state.levelCounts = []
  }

  async componentWillMount() {
    const { api, levels } = this.props
    const counts = await api.progress(levels)

    this.setState({
      levelCounts: levels.map((l) => counts[`${l}`])
    })
  }

  render(props, state) {
    const { levelCounts } = state
    const styles = {
      display: 'relative',
      fontSize: '15px',
      fontWeight: 'initial',
      textShadow: 'initial',
      marginBottom: '4px'
    }

    return (
      <span
        data-wk-ext
        style={styles}
      >
        {levelCounts.join('/')}
      </span>
    )
  }
}

export default SrsProgress
