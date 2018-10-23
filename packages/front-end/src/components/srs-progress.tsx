import { Component, h } from 'preact'

export interface ISrsProgressProps {
  api: any
  levels: number[]
}

export default class SrsProgress extends Component<ISrsProgressProps, any> {
  constructor() {
    super()
    this.state = {
      levelCounts: [],
    }
  }

  public async componentWillMount() {
    const { api, levels } = this.props
    const counts = await api.progress(levels)

    this.setState({
      levelCounts: levels.map((l) => counts[`${l}`]),
    })
  }

  public render(props, state) {
    const { levelCounts } = state
    const styles = {
      outer: {
        color: 'white',
        display: 'block',
        fontSize: '15px',
        fontWeight: 'initial',
        marginBottom: '4px',
        textShadow: 'initial',
      },
    }

    return (
      <div
        data-wk-ext
        style={styles.outer}
      >
        {levelCounts.length > 0 ? levelCounts.join(' / ') : '--'}
      </div>
    )
  }
}
