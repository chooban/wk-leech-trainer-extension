import { Wanikani } from '@chooban/wkjs'
import { leeches as leechesAPI, progress } from './api'

const LeechesAPI = (apiKey: string) => {
  const wkjs = Wanikani(apiKey)

  const api = {
    assignments: () => wkjs.assignments(),
    leeches: () => leechesAPI(wkjs),
    progress: (stages?: number[]) => progress(wkjs, stages),
    subject: (id: number) => wkjs.subject(id),
  }

  return api
}

export { LeechesAPI }
