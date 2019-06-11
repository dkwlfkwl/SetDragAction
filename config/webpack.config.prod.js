module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/js/SetDragAction.js'],
  output: {
    filename: './js/SetDragAction.min.js',
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
  }
}