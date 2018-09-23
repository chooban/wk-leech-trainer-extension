import groupBy from 'lodash.groupby'

const defaultLevels = [1, 2, 3, 4, 5, 6]

const progress = async (apiKey, levels = defaultLevels) => {
  const url = `https://api.wanikani.com/v2/assignments?srs_stages=${levels.join(',')}`

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
    items.push(...page.data)
  }
  while (page.pages && page.pages.next_url != null)

  const groups = groupBy(items, (item) => item.data.srs_stage)
  const baseGroups = levels.reduce((acc, cur) => {
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
