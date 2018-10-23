import wkjs from '@chooban/wkjs'
import * as wk from './wk-account'

async function main() {
  chrome.runtime.sendMessage('retrievingLeeches')

  const key = await wk.getApiKey()
  const api = wkjs(key)

  try {
    const leeches = await api.leeches()
    console.log('Retrieved', leeches.length, 'leeches')
  } catch (e) {
    console.error(e)
  }
}

main()
