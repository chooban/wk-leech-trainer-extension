import { API as WkAPI } from '@chooban/leeches'
import { Component, h } from 'preact'

export interface ISrsProgressProps {
  api: WkAPI
  levels: number[]
}

export interface ISrsProgressState {
  levelCounts: number[]
}

export class SrsProgressList extends Component<ISrsProgressProps, ISrsProgressState> {
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
      levelCounts: levels.map((l) => counts.get(l.toString())),
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
