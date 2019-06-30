const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = require('../constants/action-types')
const { apiConfig } = require('../util/config-loader')
const { apiRoot } = require('../util/addresses')
const formatRoute = require('../util/format-route')

const WEB_STATUS = apiConfig.codes.web_status
const authEndpoint = (route, mapping) => apiRoot + apiConfig.web_api.route.auth.sub_route + formatRoute(apiConfig.web_api.route.auth[route], mapping)

exports.tryLogin = (username, password) => dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  })
  return fetch(authEndpoint('login', { username, password }), {
    credentials: 'include'
  }).then(res => res.json()).then(
    json => {
      if (json.status === WEB_STATUS.OK) {
        dispatch({
          type: LOGIN_SUCCESS,
          sessionId: json.payload.sessionId,
          user: json.payload.user
        })
      }
      else {
        dispatch({
          type: LOGIN_FAILURE,
          message: json.status
        })
      }
    }
  )
}
