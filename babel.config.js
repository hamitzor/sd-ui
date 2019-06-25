module.exports = {
  presets: [
    ["@babel/env", {
      useBuiltIns: "entry",
      corejs: 3,
      targets: {
        "browsers": "> 1%, not op_mini all",
        "node": 11
      }
    }],
    "@babel/react"
  ],
  plugins: [
    "@babel/proposal-class-properties"
  ]
}