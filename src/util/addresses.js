const apiConfig = require('../../api.config')

const apiRoot = `${apiConfig.port === 443 ? 'https' : 'http'}://${apiConfig.hostname}:${apiConfig.port}`
const serverRoot = `${apiConfig.web.port === 443 ? 'https' : 'http'}://${apiConfig.web.hostname}:${apiConfig.web.port}`
const apiWsRoot = `ws://${apiConfig.web.hostname}:${apiConfig.web.port}`

module.exports = { apiRoot, serverRoot, apiWsRoot }