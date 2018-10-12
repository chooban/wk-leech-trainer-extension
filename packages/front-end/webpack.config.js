const webpack = require('webpack')
const config = require('./webpack.dev.config')

config.mode = 'production'

config.plugins.push(new webpack.DefinePlugin({
  // eslint-disable-next-line
  __LESSONS_URL__: JSON.stringify('https://wk-stats.herokuapp.com/leeches/lesson?api_key=${apiKey}')
}))

module.exports = config
