const path = require('path')

const client = {
  context: path.resolve(__dirname, 'src'),
  entry: './index',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: '/images',
              publicPath: '/images'
            },
          },
        ],
      }
    ]
  }
}

const testServer = {
  context: path.resolve(__dirname, 'src'),
  entry: './index-server',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.server.js'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}


module.exports = [client, testServer]