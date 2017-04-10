module.exports = {
  entry: './app/ReactApp.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'reactBundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};
