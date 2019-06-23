const path = require("path")

const coreConfig = {
  context: path.resolve(__dirname, "src"),
  entry: "./index",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}

const testServerConfig = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.server",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.server.js"
  },
  target: "node",
  node: {
    __dirname: false
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}

module.exports = [coreConfig, testServerConfig]