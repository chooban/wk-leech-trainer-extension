require('isomorphic-fetch')
const factory = require('../dist/index').default

console.log(`Using API key of ${process.argv[2]}`)

const api = factory(process.argv[2])
api.progress()
  .then((progress) => {
    console.log(progress)
  })
