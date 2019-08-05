import { WanikaniAPI } from '@chooban/wkjs'
import groupBy from 'lodash.groupby'

const defaultStages = [1, 2, 3, 4, 5, 6]

async function progress(wkApi: WanikaniAPI, srsStages = defaultStages) {
  const assignments = await wkApi.assignments(srsStages)
  const groupedLeeches = groupBy(assignments, (a) => a.srs_stage)

  return srsStages.reduce((acc, cur) => {
    if (groupedLeeches[cur]) {
      acc[cur] = groupedLeeches[cur].length
    } else {
      acc[cur] = 0
    }
    return acc
  }, {} as { [key: string]: number })
}

export { progress }
