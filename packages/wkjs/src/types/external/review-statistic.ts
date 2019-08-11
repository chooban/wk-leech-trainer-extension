import { ReviewStatistic as InternalReviewStatistic } from '../reviewstatistics'

export interface ReviewStatistic extends InternalReviewStatistic {
  readonly id: number;
}
