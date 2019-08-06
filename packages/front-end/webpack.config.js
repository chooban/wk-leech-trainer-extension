const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  entry: {
    leech: './src/index.ts',
    background: './src/background.ts',
    // 'leeches-background': './src/leeches-background.ts',
    'options/index': './src/options/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist/'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!@(chooban))/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-regenerator',
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-transform-react-jsx', { pragma: 'h' }]
          ]
        }
      }
    }, {
      test: /\.html$/,
      use: [{
        loader: 'raw-loader'
      }]
    }, {
      test: /\.tsx?$/,
      loader: ['ts-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, '..', '..', 'node_modules')
    ]
  },
  plugins: [
    // eslint-disable-next-line
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __LESSONS_URL__: JSON.stringify('https://wk-stats-staging.herokuapp.com/leeches/lesson?api_key=')
    }),
    new CopyWebpackPlugin([{
      from: 'extension/'
    }]),
    new WriteFilePlugin()
  ],
  devtool: 'sourcemap',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
