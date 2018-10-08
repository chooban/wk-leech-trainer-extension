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
    const styles = {
      fontSize: '15px',
      marginTop: '7.5px',
      marginBottom: 0
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
