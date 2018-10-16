const meaningScore = (l) => l.meaning_incorrect / (l.meaning_current_streak ** 1.5)
const readingScore = (l) => l.reading_incorrect / (l.reading_current_streak ** 1.5)

const leeches = async (apiKey) => {
  const url = 'https://api.wanikani.com/v2/review_statistics?subject_types=kanji,vocabulary'
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiKey}`)

  const options = { headers }
  const items = []
  let page
  let request
  let count = 0
  do {
    count += 1
    request = !page
      ? new Request(url, options)
      : new Request(page.pages.next_url, options)

    // eslint-disable-next-line no-await-in-loop
    page = await fetch(request).then((r) => r.json())

    if (page.code >= 400) {
      throw new Error('Could not fetch data')
    }
    const pagesLeeches = page.data
      .filter((a) => a.data.meaning_correct >= 4)
      .filter((a) => a.data.meaning_incorrect + a.data.meaning_correct !== 0)
      .map((l) => ({
        ...l.data,
        meaning_score: meaningScore(l.data),
        reading_score: readingScore(l.data)
      }))
      .filter((l) => !(l.meaning_score < 1 && l.reading_score < 1))

    items.push(...pagesLeeches)
  }
  while (page.pages && page.pages.next_url != null)

  const leechItems = items

  console.log(count, 'requests')
  return leechItems
}

export default leeches
