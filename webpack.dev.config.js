const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'extension/dist'),
    filename: 'leech.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.html$/,
      exclude: /node_modles/,
      use: [{
        loader: 'raw-loader'
      }]
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ]
  },
  plugins: [
    // eslint-disable-next-line
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __LESSONS_URL__: JSON.stringify('https://curious-bunny-wk-stats.test/lessons')
    })
  ],
  devtool: 'sourcemap'
};
