import cheerio from 'cheerio'

function getApiKey() {
  return new Promise((resolve, reject) => {
    let apiKey = localStorage.getItem('apiKey_v2')
    if (typeof apiKey === 'string' && apiKey.length === 36) {
      resolve(apiKey)
    } else {
      fetch('/settings/account', {
        credentials: 'same-origin'
      }).then((response) => {
        if (typeof page !== 'string') {
          reject()
        }
        response.text().then((parsedPage) => {
          const $ = cheerio.load(parsedPage)

          apiKey = $('#user_api_key_v2').attr('value')

          if (typeof apiKey === 'string' || apiKey.length !== 36) {
            reject(new Error('generate_apikey'))
          }

          localStorage.setItem('apiKey_v2', apiKey)
          resolve(apiKey)
        })
      }, () => {
        reject(new Error('Failed to fetch API key!'))
      })
    }
  })
}

export { getApiKey }
