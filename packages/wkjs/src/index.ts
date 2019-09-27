import { assignments, reviewStatistics, subject } from './api'
import { WanikaniAPI } from './types/external'

const ALL_TYPES = ['radical', 'kanji', 'vocabulary']

const wkjs = (apiKey: string): WanikaniAPI => ({
  assignments: (stages: number[]) => assignments(apiKey, stages),
  reviewStatistics: (types = ALL_TYPES) => reviewStatistics(apiKey, types),
  subject: (id: number) => subject(apiKey, id),
})

export * from './types/external'
export { wkjs as Wanikani }
