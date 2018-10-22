const accountUrl = 'https://www.wanikani.com/settings/account'

async function getApiKey() {
  const storedKey = sessionStorage.getItem('apiKey_v2')
  if (typeof storedKey === 'string' && storedKey.length === 36) {
    return storedKey
  }
  const response = await fetch(accountUrl, {
    credentials: 'same-origin'
  })
  const parsedPage = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(parsedPage, 'text/html')
  const apiKey = doc.querySelector('#user_api_key_v2')

  if (apiKey.value.length !== 36) {
    throw new Error('generate_apikey')
  }

  sessionStorage.setItem('apiKey_v2', apiKey.value)

  return apiKey.value
}

export { getApiKey }
