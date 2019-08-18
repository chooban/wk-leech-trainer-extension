import axios from 'axios'

import { ReviewStatistic } from '../types/external'

import { WKReviewStatisticSubject, WanikaniCollectionResponse } from '../types'

const REVIEW_STATS_URL = 'https://api.wanikani.com/v2/review_statistics?subject_types=kanji,vocabulary&hidden=false'

async function getReviewStatisticsRecursively(url: string, apiKey: string): Promise<WKReviewStatisticSubject[]> {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  }
  const page = (await axios
    .get(url, { headers })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Could not fetch data')
      }
      return response
    })
    .then((r) => r.data)) as WanikaniCollectionResponse<WKReviewStatisticSubject>

  const leeches = [...page.data]
  if (page.pages.next_url) {
    return leeches.concat(...(await getReviewStatisticsRecursively(page.pages.next_url, apiKey)))
  }
  return leeches
}

const getReviewStatistics = async (apiKey: string): Promise<ReviewStatistic[]> =>
  getReviewStatisticsRecursively(REVIEW_STATS_URL, apiKey).then((rs) => rs.map((r) => ({ id: r.id, ...r.data })))

export { getReviewStatistics }
