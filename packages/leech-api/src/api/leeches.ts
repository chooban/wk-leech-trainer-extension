import { ReviewSubject, ReviewScores, ReviewStatistics, WanikaniAPI } from '@chooban/wkjs'

const meaningScore = (l: ReviewSubject) => l.meaning_incorrect / (l.meaning_current_streak ** 1.5)

const readingScore = (l: ReviewSubject) => l.reading_incorrect / (l.reading_current_streak ** 1.5)

const extractLeechesFromStats = (data: ReviewStatistics[]): ReviewScores[] => (
  data
    .map(l => l.data)
    .filter(a => a.meaning_correct >= 4)
    .filter(a => a.meaning_incorrect + a.meaning_correct !== 0)
    .map(l => ({...l, reading_score: readingScore(l) }))
    .map(l => ({...l, meaning_score: meaningScore(l) }))
    .filter(l => l.reading_score > 1.0 || l.meaning_score > 1.0)
)

const leeches = async (wkApi: WanikaniAPI) => {
  const stats = await wkApi.getReviewStatistics()
  const leeches = extractLeechesFromStats(stats)
  console.log(`Extract ${leeches.length} leeches`)
  return leeches
}

export { leeches }
