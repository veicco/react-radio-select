const path = require('path')

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
    ],
  },
  externals: {
    'react': 'commonjs react'
  }
};
