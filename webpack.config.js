const config = require('./webpack.dev.config');
const webpack = require('webpack');

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  minimize: true
}));

config.plugins.push(new webpack.DefinePlugin({
  // eslint-disable-next-line
  __LESSONS_URL__: JSON.stringify('https://wk-stats.herokuapp.com/leeches/lesson?api_key=${apiKey}')
}));

module.exports = config;
