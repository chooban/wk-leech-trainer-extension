import { reviewStatistics, subject } from './api/'
import { WanikaniAPI } from './types/external'

const wkjs = (apiKey: string): WanikaniAPI => {
  return {
    reviewStatistics() {
      return reviewStatistics(apiKey)
    },
    subject(id: number) {
      return subject(apiKey, id)
    },
  }
}

export * from './types/external'
export { wkjs as Wanikani }
