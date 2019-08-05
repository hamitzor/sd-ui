const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} = require('../constants/action-types')
const codes = require('../../status-codes')
const { post, del } = require('../util/request')

exports.tryLogin = (user, pwd) => dispatch => {
  dispatch({ type: LOGIN_REQUEST })
  return post('/user-session', { user, pwd })
    .then(res => res.json())
    .then(json => {
      if (json.status === codes.OK) {
        dispatch({
          type: LOGIN_SUCCESS,
          user: json.payload.user
        })
      }
      else {
        dispatch({
          type: LOGIN_FAILURE,
          message: json.status
        })
      }
    })
}

exports.tryLogout = () => dispatch => {
  dispatch({ type: LOGOUT_REQUEST })
  return del('/user-session')
    .then(res => res.json())
    .then(json => {
      if (json.status === codes.OK) {
        dispatch({
          type: LOGOUT_SUCCESS
        })
      }
      else {
        dispatch({
          type: LOGOUT_FAILURE,
          message: json.status
        })
      }
    })
}
