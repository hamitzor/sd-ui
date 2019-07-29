const { config, apiConfig } = require('./config-loader')

const apiRoot = 'http://' + apiConfig.web_api.hostname + ':' + apiConfig.web_api.port
const serverRoot = 'http://' + config.hostname + ':' + config.port

const apiWsRoot = 'ws://' + apiConfig.web_api.hostname + ':' + apiConfig.web_api.port

module.exports = { apiRoot, serverRoot, apiWsRoot }