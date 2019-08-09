const {
  CREATE_CONFIG_SET_REQUEST,
  CREATE_CONFIG_SET_SUCCESS,
  FETCH_CONFIG_SETS_REQUEST,
  FETCH_CONFIG_SETS_SUCCESS,
  FETCH_CONFIG_SETS_FAILURE
} = require('../constants/action-types')
const codes = require('../../status-codes')
const { post, get } = require('../util/request')

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
        return json
      }
    })
}

exports.getAll = () => dispatch => {
  dispatch({ type: FETCH_CONFIG_SETS_REQUEST })
  return get('/config')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.status === codes.OK) {
        return dispatch({
          type: FETCH_CONFIG_SETS_SUCCESS,
          payload: json.payload
        })
      }
      else {
        return dispatch({
          type: FETCH_CONFIG_SETS_FAILURE
        })
      }
    })
}
