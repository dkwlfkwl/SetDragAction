const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/js/SetDragAction.js'],
  output: {
    filename: './src/js/SetDragAction.js',
    library: 'SetDragAction',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', {'plugins': ["@babel/plugin-proposal-class-properties"]}]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: false,
    port: 9000,
    open: false,
    hot: true,
    host: '0.0.0.0'
  }
}