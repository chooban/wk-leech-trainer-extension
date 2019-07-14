import { ReviewSubject } from './reviewsubject'

export interface ReviewStatistics {
  id: number,
  'object': string,
  url: string,
  data_updated_at: Date,
  data: ReviewSubject
}
