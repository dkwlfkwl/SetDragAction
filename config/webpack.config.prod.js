const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/SetDragAction.js'],
  output: {
    filename: './SetDragAction.min.js',
    library: 'SetDragAction',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', {'plugins': ["@babel/plugin-proposal-class-properties"]}],
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
  ]
}