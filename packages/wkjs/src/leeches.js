const leeches = async (apiKey) => {
  const url = 'https://api.wanikani.com/v2/review_statistics?subject_types=kanji,vocabulary'
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiKey}`)

  const options = { headers }
  const items = []
  let page
  let request
  do {
    request = !page
      ? new Request(url, options)
      : new Request(page.pages.next_url, options)

    // eslint-disable-next-line no-await-in-loop
    page = await fetch(request).then((r) => r.json())

    if (page.code >= 400) {
      throw new Error('Could not fetch data')
    }
    items.push(...page.data)
  }
  while (page.pages && page.pages.next_url != null)

  const leechItems = items
    .filter((a) => a.data.meaning_correct >= 4)
    .filter((a) => a.data.meaning_incorrect + a.data.meaning_correct !== 0)

  return leechItems
}

export default leeches
