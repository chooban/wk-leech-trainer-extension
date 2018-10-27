import leeches from './leeches'
import progress from './progress'

const factory = (apiKey) => ({
  leeches: leeches.bind(this, apiKey),
  progress: progress.bind(this, apiKey),
})

export default factory
