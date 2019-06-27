const fetch = require('cross-fetch')
const fs = require('fs')

const args = process.argv.slice(2)
const loadApiConfig = async () => {
  const apiConfig = (await (await fetch(args[0])).json()).payload
  const content = `module.exports = ${JSON.stringify(apiConfig)}`
  fs.writeFileSync('./default-api.config.js', content)
  if (args[1] === '-c') {
    fs.writeFileSync('./api.config.js', content)
  }
}

loadApiConfig()