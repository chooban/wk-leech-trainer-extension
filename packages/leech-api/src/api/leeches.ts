
import { ReviewStatistic, WanikaniAPI } from '@chooban/wkjs'
import {ReviewStatisticWithScores} from '../types'

const meaningScore = (l: ReviewStatistic) => l.meaning_incorrect / (l.meaning_current_streak ** 1.5)

const readingScore = (l: ReviewStatistic) => l.reading_incorrect / (l.reading_current_streak ** 1.5)

const extractLeechesFromStats = (data: ReviewStatistic[]): ReviewStatisticWithScores[] => (
  data
    .filter((a) => (a.meaning_correct >= 4) && (a.meaning_incorrect + a.meaning_correct !== 0))
    .map((l) => ({...l, reading_score: readingScore(l), meaning_score: meaningScore(l)}))
    .filter((l) => l.reading_score > 1.0 || l.meaning_score > 1.0)
)

const leeches = async (wkApi: WanikaniAPI) => {
  const stats = await wkApi.reviewStatistics()
  console.log(stats[0])
  const leeches = extractLeechesFromStats(stats)
  console.log(`Extracted ${leeches.length} leeches from ${stats.length} reviews`)
  return leeches
}

export { leeches }
