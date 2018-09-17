const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    leech: './src/index.js',
    background: './src/background.js',
    options: './src/options.js'
  },
  output: {
    path: path.resolve(__dirname, 'extension/dist'),
    filename: '[name].js'
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
      __LESSONS_URL__: JSON.stringify('https://wk-stats-staging.herokuapp.com/leeches/lesson?api_key=')
    })
    // new BundleAnalyzerPlugin()
  ],
  devtool: 'sourcemap',
  mode: 'development'
};
