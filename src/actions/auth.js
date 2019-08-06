const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} = require('../constants/action-types')
const codes = require('../../status-codes')
const { get, post, del } = require('../util/request')

exports.getSession = () => dispatch => {
  return get('/user-session/with-cookie')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.status === codes.OK) {
        return dispatch({
          type: LOGIN_SUCCESS,
          user: json.payload.user
        })
      }
      else {
        return dispatch({
          type: LOGIN_FAILURE,
          status: json.status
        })
      }
    })
}

exports.login = (user, pwd) => dispatch => {
  return post('/user-session', { user, pwd })
    .then(res => res.json())
    .then(json => {
      if (json.status === codes.OK) {
        return dispatch({
          type: LOGIN_SUCCESS,
          user: json.payload.user
        })
      }
      else {
        return dispatch({
          type: LOGIN_FAILURE,
          status: json.status
        })
      }
    })
}

exports.logout = () => dispatch => {
  return del('/user-session/with-cookie')
    .then(res => res.json())
    .then(json => {
      if (json.status === codes.OK) {
        return dispatch({
          type: LOGOUT_SUCCESS
        })
      }
      else {
        return dispatch({
          type: LOGOUT_FAILURE,
          status: json.status
        })
      }
    })
}
