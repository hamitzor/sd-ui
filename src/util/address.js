const config = require('./config-loader')

const webApiRoot = 'http://' + config.web_api.host + ':' + config.web_api.port

module.exports = { webApiRoot }