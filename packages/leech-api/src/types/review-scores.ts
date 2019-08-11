import { ReviewStatistic } from '@chooban/wkjs'

export interface ReviewStatisticWithScores extends ReviewStatistic {
  reading_score: number;
  meaning_score: number;
}
