import { WanikaniAPI } from '@chooban/wkjs'

const defaultStages = [1, 2, 3, 4, 5, 6]

async function progress(wkApi: WanikaniAPI, srsStages = defaultStages) {
  const assignments = await wkApi.assignments(srsStages)

  return assignments.reduce(
    (acc, cur) => acc.set(`${cur.srs_stage}`, acc.get(`${cur.srs_stage}`) || 0 + 1) && acc,
    new Map(srsStages.map((stg) => [`${stg}`, 0])),
  )
}

export { progress }
