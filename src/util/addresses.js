const { config, apiConfig } = require('./config-loader')

const apiRoot = 'http://' + apiConfig.web_api.hostname + ':' + apiConfig.web_api.port
const serverRoot = 'http://' + config.hostname + ':' + config.port

module.exports = { apiRoot, serverRoot }