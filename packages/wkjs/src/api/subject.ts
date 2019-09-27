import axios from 'axios'

import { WKSubject, WanikaniResourceResponse } from '../types'
import { Subject } from '../types/external'

const subject = async (apiKey: string, id: number): Promise<Subject> => {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  }

  const s = await axios.get(`https://api.wanikani.com/v2/subjects/${id}`, { headers })

  const response = s.data as WanikaniResourceResponse<WKSubject>

  const res: Subject = {
    id,
    ...response.data,
  }
  return res
}
export { subject }
