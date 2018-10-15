import groupBy from 'lodash.groupby'

const defaultStages = [1, 2, 3, 4, 5, 6]

const progress = async (apiKey, srsStages = defaultStages) => {
  const url = `https://api.wanikani.com/v2/assignments?srs_stages=${srsStages.join(',')}`

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

  const groups = groupBy(items, (item) => item.data.srs_stage)

  // This ensures we have an entry for each grouping.
  const baseGroups = srsStages.reduce((acc, cur) => {
    const result = { ...acc }
    result[cur] = 0
    return result
  }, {})

  return {
    ...baseGroups,
    ...Object.keys(groups).reduce((acc, cur) => {
      const result = { ...acc }
      result[cur] = groups[cur].length
      return result
    }, {})
  }
}

export default progress
