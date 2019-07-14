import { getReviewStatistics, subject } from './api/'
import { WanikaniAPI } from './types';

const wkjs = (apiKey: string): WanikaniAPI => {
  return {
    getReviewStatistics() {
      return getReviewStatistics(apiKey)
    },
    subject(id: number) {
      return subject(apiKey, id)
    }
  }
}

export * from './types'
export { wkjs as Wanikani }
