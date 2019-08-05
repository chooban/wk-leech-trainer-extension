import { ReviewStatistic } from '../reviewstatistics'
import { Assignment, Subject } from './'

interface WanikaniAPI {
  assignments(stages?: number[]): Promise<Assignment[]>,
  reviewStatistics(): Promise<ReviewStatistic[]>
  subject(id: number): Promise<Subject>
}

export { WanikaniAPI }
