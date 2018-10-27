interface ReviewSubject {
  created_at: Date,
  subject_id: number,
  subject_type: string,
  meaning_correct: number,
  meaning_incorrect: number,
  meaning_max_streak: number,
  meaning_current_streak: number,
  reading_correct: number,
  reading_incorrect: number,
  reading_max_streak: number,
  reading_current_streak: number,
  percentage_correct: number,
  hidden: boolean
}

interface ReviewStatistics {
  id: number,
  'object': string,
  url: string,
  data_updated_at: Date,
  data: ReviewSubject
}

interface WanikaniResponse {
  'object': string;
  url: string;
  pages: {
    per_page: number;
    next_url?: string;
    previous_url?: string;
  };
  total_count: number;
  data_updated_at: Date;
  data: Array<ReviewStatistics>;
}

const meaningScore = (l: ReviewSubject) => l.meaning_incorrect / (l.meaning_current_streak ** 1.5)
const readingScore = (l: ReviewSubject) => l.reading_incorrect / (l.reading_current_streak ** 1.5)

const url = 'https://api.wanikani.com/v2/review_statistics?subject_types=kanji,vocabulary'

const leeches = async (apiKey: string) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiKey}`)

  const options = { headers }

  const urls = [url]
  const items = await urls.reduce(async (previousValue, curr, idx, urls) => {
    const acc = await previousValue
    const request = new Request(curr, options)
    const page = await fetch(request)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Could not fetch data')
        }
        return response
      })
      .then((r) => r.json()) as WanikaniResponse

    const leeches = page.data
      .filter((a) => a.data.meaning_correct >= 4)
      .filter((a) => a.data.meaning_incorrect + a.data.meaning_correct !== 0)
      .map((l) => ({
        ...l.data,
        meaning_score: meaningScore(l.data),
        reading_score: readingScore(l.data),
      }))
      .filter((l) => !(l.meaning_score < 1 && l.reading_score < 1)) as any[]

    if (page.pages.next_url) {
      urls.push(page.pages.next_url)
    }

    return [acc, ...leeches]
  }, Promise.resolve(<any[]> []))

  return items
}

export default leeches
