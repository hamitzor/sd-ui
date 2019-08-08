const {
  CREATE_CONFIG_SET_REQUEST,
  CREATE_CONFIG_SET_SUCCESS,
  CREATE_CONFIG_SET_FAILURE
} = require('../constants/action-types')
const codes = require('../../status-codes')
const { post } = require('../util/request')

exports.create = name => dispatch => {
  dispatch({ type: CREATE_CONFIG_SET_REQUEST })
  return post('/config', { name })
    .then(res => res.json())
    .then(json => {
      if (json.status === codes.OK) {
        dispatch({
          type: CREATE_CONFIG_SET_SUCCESS,
          payload: json.payload
        })
        return json
      }
      else {
        dispatch({
          type: CREATE_CONFIG_SET_FAILURE,
          status: json.status
        })
        return json
      }
    })
}
