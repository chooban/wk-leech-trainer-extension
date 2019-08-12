import { assignments, reviewStatistics, subject } from './api'
import { WanikaniAPI } from './types/external'

const wkjs = (apiKey: string): WanikaniAPI => ({
  assignments: (stages: number[]) => assignments(apiKey, stages),
  reviewStatistics: () => reviewStatistics(apiKey),
  subject: (id: number) => subject(apiKey, id),
})

export * from './types/external'
export { wkjs as Wanikani }
