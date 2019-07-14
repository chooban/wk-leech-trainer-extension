import groupBy from 'lodash.groupby'

interface Assignment {
  id: number,
  'object': string,
  url: string,
  data_updated_at: Date,
  data: {
    created_at: Date,
    subject_id: number,
    subject_type: string,
    level: number,
    srs_stage: number,
    srs_stage_name: string,
    unlocked_at?: Date,
    started_at?: Date,
    passed_at?: Date,
    burned_at?: Date,
    available_at?: Date,
    resurrected_at?: Date,
    passed: boolean,
    resurrected: boolean,
    hidden: boolean
  }
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
  data: Array<Assignment>;
}

const defaultStages = [1, 2, 3, 4, 5, 6]

const getProgress = async function(url: RequestInfo, headers: Headers): Promise<Assignment[]> {
  const request = new Request(url, { headers })
  const page = await fetch(request)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Could not fetch data')
      }
      return response
    })
    .then((r) => r.json()) as WanikaniResponse

  if (page.pages.next_url) {
    return page.data.concat(await getProgress(page.pages.next_url, headers))
  }
  return page.data
}

async function progress(apiKey: string, srsStages = defaultStages) {
  const url = `https://api.wanikani.com/v2/assignments?srs_stages=${srsStages.join(',')}`

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiKey}`)

  const items = await getProgress(url, headers)
  const groupedLeeches = groupBy(items, (item) => item.data.srs_stage)

  return srsStages.reduce((acc, cur) => {
    if (groupedLeeches[cur]) {
      acc[cur] = groupedLeeches[cur].length
    } else {
      acc[cur] = 0
    }
    return acc
  }, {} as {[key: string]: number})
}

export { progress }
