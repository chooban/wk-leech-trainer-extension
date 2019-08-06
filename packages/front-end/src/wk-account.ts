const accountUrl = 'https://www.wanikani.com/settings/personal_access_tokens'

async function getApiKey() {
  const storedKey = sessionStorage.getItem('apiKey_v2')
  if (typeof storedKey === 'string' && storedKey.length === 36) {
    return storedKey
  }
  const response = await fetch(accountUrl, {
    credentials: 'same-origin',
  })
  const parsedPage = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(parsedPage, 'text/html')
  const apiKey: HTMLElement = doc.querySelector('table#personal-access-tokens-list tbody tr:last-of-type code')

  const key = apiKey.innerText || ''
  if (key.length !== 36) {
    throw new Error('generate_apikey')
  }

  sessionStorage.setItem('apiKey_v2', key)

  return key
}

export { getApiKey }
