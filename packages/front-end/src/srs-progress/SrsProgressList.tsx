import { API as WkAPI } from '@chooban/leeches'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

interface ISrsProgressProps {
  api: WkAPI
  levels: number[]
}

const SrsProgressList = ({ api, levels }: ISrsProgressProps) => {
  const [levelCounts, setLevelCounts] = useState<number[]>([])
  useEffect(() => {
    api.progress(levels).then((counts) => {
      setLevelCounts(levels.map((l) => counts.get(l.toString())))
    })
  }, [])

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
    <div data-wk-ext style={styles.outer}>
      {levelCounts.length > 0 ? levelCounts.join(' / ') : '--'}
    </div>
  )
}

export { SrsProgressList }
