const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/SetDragAction.js'],
  output: {
    filename: './src/SetDragAction.js',
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
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        inject: 'head',
        template: './src/index.html',
        filename: './index.html',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    compress: false,
    port: 9000,
    open: false,
    hot: true,
    host: '0.0.0.0'
  }
}