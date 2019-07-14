import axios from 'axios'

const subject = async(apiKey: string, id: number) => {
  const headers = {
    'Authorization': `Bearer ${apiKey}`
  }

  const s = await axios.get(`https://api.wanikani.com/v2/subjects/${id}`, { headers })

  return s.data
}
export { subject }
