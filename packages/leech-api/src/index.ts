import { Wanikani } from '@chooban/wkjs'
import { leeches as leechesAPI } from './api'

const LeechesAPI = (apiKey: string) => {
  const wkjs = Wanikani(apiKey)

  return {
    leeches() {
      return leechesAPI(wkjs)
    },
    subject(id: number) {
      return wkjs.subject(id)
    },
    // progress: () => progress(WaniKaniAPI),
  }
}

export { LeechesAPI }
