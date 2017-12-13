const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/leech-trainer.js',
  output: {
    path: path.resolve(__dirname, 'extension/dist'),
    filename: 'leech.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' }
      ]
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src')
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  // This will expose source map files so that errors will point to your
  // original source files instead of the transpiled files.
  devtool: 'sourcemap'
};
