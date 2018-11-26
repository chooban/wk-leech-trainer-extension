import wkjs from '@chooban/wkjs'
import * as wk from './wk-account'

async function main() {
  chrome.runtime.sendMessage('retrievingLeeches')

  const key = await wk.getApiKey()
  const api = wkjs(key)

  try {
    const leeches = await api.leeches()
    console.log('Retrieved', leeches.length, 'leeches')

    const dbRequest = indexedDB.open('wkleeches', 3)

    dbRequest.onerror = (e) => {
      throw e
    }

    dbRequest.onupgradeneeded = (e) => {
      console.log('Upgrade needed')
    }

    dbRequest.onsuccess = (e) => {
      console.log('Got db connection')
      const db = (<any> e.target).result as IDBDatabase
      const leechStore = db.createObjectStore('leeches', {
        keyPath: 'subject_id'
      })
    }
  } catch (e) {
    console.error(e)
  }
}

main()
