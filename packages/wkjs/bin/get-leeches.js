require('isomorphic-fetch')
const factory = require('../dist/index').default

console.log(`Using API key of ${process.argv[2]}`)

const api = factory(process.argv[2])
api.leeches()
  .then((progress) => {
    console.log(progress[0])
    console.log(progress.length)
  })
