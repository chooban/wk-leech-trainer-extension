import { Assignment, Subject, ReviewStatistic } from '.'

export interface WanikaniAPI {
  assignments(stages?: number[]): Promise<Assignment[]>
  reviewStatistics(types: string[]): Promise<ReviewStatistic[]>
  subject(id: number): Promise<Subject>
}
