const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = require('../constants/action-types')
const { apiRoot } = require('../util/addresses')
const codes = require('../../status-codes')

exports.tryLogin = (user, pwd) => dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  })
  return fetch(`${apiRoot}/user-session`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ user, pwd }),
  }).then(res => res.json()).then(
    json => {
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
    }
  )
}
