import { ReviewStatistic, WanikaniAPI } from '@chooban/wkjs'
import { ReviewStatisticWithScores } from '../types/'

const meaningScore = (l: ReviewStatistic) => +(l.meaning_incorrect / l.meaning_current_streak ** 1.5).toFixed(2)

const readingScore = (l: ReviewStatistic) => +(l.reading_incorrect / l.reading_current_streak ** 1.5).toFixed(2)

// eslint-disable-next-line @typescript-eslint/camelcase
const scores = (l: ReviewStatistic) => ({ reading_score: readingScore(l), meaning_score: meaningScore(l) })

const leeches = async (wkApi: WanikaniAPI, leechScore = 1.0): Promise<ReviewStatisticWithScores[]> => {
  try {
    return (await wkApi.reviewStatistics(['kanji', 'vocabulary']))
      .filter((a) => a.subject_type !== 'radical')
      .filter((a) => a.meaning_correct >= 4 && a.reading_correct >= 4)
      .map((l) => ({ ...l, ...scores(l) }))
      .filter((l) => l.reading_score > leechScore || l.meaning_score > leechScore)
  } catch (e) {
    console.error(e)
    throw 'Could not retrieve leeches'
  }
}

export { leeches }
