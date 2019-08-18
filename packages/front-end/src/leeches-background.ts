import Dexie from 'dexie'
import { LeechesAPI } from '@chooban/leeches'
import { getApiKey } from './wk-account'

const DB_VERSION = 1

async function main() {
  chrome.runtime.sendMessage('retrievingLeeches')

  const key = await getApiKey()
  const api = LeechesAPI(key)
  const leeches = await api.leeches()

  const db = new Dexie('leeches')
  db.version(DB_VERSION).stores({
    leeches: '&subject_id,reading_score,meaning_score',
    subjects: '&id',
  })

  db.table('leeches').bulkPut(leeches)
}

main()
