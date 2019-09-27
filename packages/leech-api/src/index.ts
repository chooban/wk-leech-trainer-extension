import { Wanikani, WanikaniAPI } from '@chooban/wkjs'
import { leeches as leechesAPI, progress } from './api'
import { ReviewStatisticWithScores } from './types'

export interface API extends WanikaniAPI {
  leeches: () => Promise<ReviewStatisticWithScores[]>
  progress: (stages?: number[]) => Promise<Map<string, number>>
}

const LeechesAPI = (apiKey: string): API => {
  const wkjs = Wanikani(apiKey)

  const api = {
    assignments: () => wkjs.assignments(),
    leeches: (leechScore?: number) => leechesAPI(wkjs, leechScore),
    progress: (stages?: number[]) => progress(wkjs, stages),
    reviewStatistics: (types: string[]) => wkjs.reviewStatistics(types),
    subject: (id: number) => wkjs.subject(id),
  }

  return api
}

export { LeechesAPI }
