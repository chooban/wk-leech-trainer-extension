import axios from 'axios'

import { AssignmentResponse, WanikaniCollectionResponse } from '../types'
import { Assignment as ExtAssignment } from '../types/external'

const defaultStages = [1, 2, 3, 4, 5, 6]

async function getAssignments(url: string, apiKey: string): Promise<AssignmentResponse[]> {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  }
  const page = await axios.get(url, { headers })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Could not fetch data')
      }
      return response
    })
    .then((r) => r.data) as WanikaniCollectionResponse<AssignmentResponse>

  const rawAssignments = [...page.data]
  if (page.pages.next_url) {
    return rawAssignments.concat(...await getAssignments(page.pages.next_url, apiKey))
  }
  return rawAssignments
}

const assignments = async (apiKey: string, srsStages = defaultStages): Promise<ExtAssignment[]> => {
  const url = `https://api.wanikani.com/v2/assignments?srs_stages=${srsStages.join(',')}`
  return getAssignments(url, apiKey)
    .then((as) => as.map((a) => ({ id: a.id, ...a.data })))
}

export { assignments }
