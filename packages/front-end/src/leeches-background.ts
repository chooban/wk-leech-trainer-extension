import { LeechesAPI } from '@chooban/leeches'
import { getApiKey } from './wk-account'

const DB_VERSION = 3

async function main() {
  chrome.runtime.sendMessage('retrievingLeeches')

  const key = await getApiKey()
  const api = LeechesAPI(key)

  try {
    const leeches = await api.leeches()
    console.log('Retrieved', leeches.length, 'leeches')

    const dbRequest = indexedDB.open('wkleeches', DB_VERSION)

    dbRequest.onerror = (e) => {
      throw e
    }

    dbRequest.onupgradeneeded = (e) => {
      console.log('Upgrade needed')
    }

    dbRequest.onsuccess = (e) => {
      console.log('Got db connection')
      const db: IDBDatabase = (e.target as any).result
      db.createObjectStore('leeches', {
        keyPath: 'subject_id',
      })
    }
  } catch (e) {
    console.error(e)
  }
}

main()
