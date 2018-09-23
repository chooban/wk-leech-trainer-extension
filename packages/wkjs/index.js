import progress from './src/progress'


const factory = (apiKey) => {
  const p = progress.bind(this, apiKey)

  return {
    progress: p
  }
}

export default factory
