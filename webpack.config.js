const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: {
    'index.js': './src/index.js',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{from: './src/style.scss', to: 'style.scss'}])
  ],
  externals: {
    'react': 'commonjs react'
  }
};
