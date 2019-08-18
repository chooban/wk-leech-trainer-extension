/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/* eslint-enable */

module.exports = {
  entry: {
    leech: './src/index.ts',
    background: './src/background.ts',
    'leeches-background': './src/leeches-background.ts',
    'options/index': './src/options/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@(chooban))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.join(__dirname, 'src'), path.join(__dirname, '..', '..', 'node_modules')],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'extension/',
      },
    ]),
  ],
  devtool: 'sourcemap',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}
