import progress from './progress'
import leeches from './leeches'

const factory = (apiKey) => ({
  progress: progress.bind(this, apiKey),
  leeches: leeches.bind(this, apiKey)
})

export default factory
