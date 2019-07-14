import axios from 'axios'
import { ReviewStatistics, WanikaniResponse } from '../types/'

const url = 'https://api.wanikani.com/v2/review_statistics?subject_types=kanji,vocabulary'

const getReviewStatistics = async function(apiKey: string): Promise<ReviewStatistics[]> {
  return getReviewStatisticsRecursively(url, apiKey)
}

async function getReviewStatisticsRecursively(url: string, apiKey: string): Promise<ReviewStatistics[]> {
  const headers = {
    'Authorization': `Bearer ${apiKey}`
  }
  const page = await axios.get(url, { headers })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Could not fetch data')
      }
      return response
    })
    .then((r) => r.data) as WanikaniResponse

  const leeches = [...page.data]
  if (page.pages.next_url) {
    return leeches.concat(...await getReviewStatisticsRecursively(page.pages.next_url, apiKey))
  }
  return leeches
}

export {
  getReviewStatistics
}
