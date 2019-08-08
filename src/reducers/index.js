const { combineReducers } = require('redux')
//const { codes: { cv_status } } = require('../util/config-loader')

const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CREATE_CONFIG_SET_REQUEST,
  CREATE_CONFIG_SET_SUCCESS,
  //FETCH_VIDEOS_REQUEST,
  //FETCH_VIDEOS_SUCCESS,
  //FETCH_VIDEOS_FAILURE,
  //FETCH_VIDEO_REQUEST,
  //FETCH_VIDEO_SUCCESS,
  //FETCH_VIDEO_FAILURE,
  //OBJECT_DETECTION_REQUEST,
  //OBJECT_DETECTION_STARTED,
  //OBJECT_DETECTION_MADE_PROGRESS,
  //OBJECT_DETECTION_SUCCESS,
  //OBJECT_DETECTION_FAILURE,
  //VIDEO_UPLOAD_STARTED,
  //VIDEO_UPLOAD_MADE_PROGRESS,
  //VIDEO_UPLOAD_SUCCESS,
  //VIDEO_UPLOAD_FAILURE,
  INITIAL_WIDTH_CALCULATED,
  WIDTH_CHANGED,
  LANGUAGE_CHANGED
} = require('../constants/action-types')

const lang = (state = 'en', action) => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      return action.lang
    default:
      return state
  }
}

const width = (state = null, action) => {
  switch (action.type) {
    case INITIAL_WIDTH_CALCULATED:
      return action.value
    case WIDTH_CHANGED:
      return action.value
    default:
      return state
  }
}

const userSession = (state = {
  authanticated: false,
  user: null
}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        authanticated: true,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        authanticated: false,
        user: null
      }
    case LOGOUT_SUCCESS:
      return {
        authanticated: false,
        user: null
      }
    case LOGOUT_FAILURE:
      return {
        authanticated: true
      }
    default:
      return state
  }
}

const configSet = (state = {
  fetching: false,
  updating: false,
  deleting: false,
  creating: false,
  count: 0,
  list: []
}, action) => {
  console.log(state)
  switch (action.type) {
    case CREATE_CONFIG_SET_REQUEST:
      return {
        ...state,
        creating: true
      }
    case CREATE_CONFIG_SET_SUCCESS:
      return {
        ...state,
        creating: false,
        count: state.count + 1,
        list: [...state.list, action.payload]
      }
    default:
      return state
  }
}

/*

const video = (state = {
  tryingFetch: false,
  fetchFailed: false,
  fetchFailedMessage: '',
  data: {}
}, action) => {
  switch (action.type) {
    case FETCH_VIDEO_REQUEST:
      return {
        tryingFetch: true,
        fetchFailed: false,
        fetchFailedMessage: '',
        data: {}
      }
    case FETCH_VIDEO_SUCCESS:
      return {
        tryingFetch: false,
        fetchFailed: false,
        fetchFailedMessage: '',
        data: action.data
      }
    case FETCH_VIDEO_FAILURE:
      return {
        tryingFetch: false,
        fetchFailed: true,
        fetchFailedMessage: action.message,
        data: {}
      }
    default:
      return state
  }
}

const videoUpload = (state = {
  uploading: false,
  progress: '0',
  done: false,
  failed: false,
  failedCode: '',
  failedMessage: ''
}, action) => {
  switch (action.type) {
    case VIDEO_UPLOAD_STARTED:
      return {
        uploading: true,
        progress: '0',
        done: false,
        failed: false,
        failedCode: '',
        failedMessage: ''
      }
    case VIDEO_UPLOAD_MADE_PROGRESS:
      return {
        uploading: true,
        progress: action.progress,
        done: false,
        failed: false,
        failedCode: '',
        failedMessage: ''
      }
    case VIDEO_UPLOAD_SUCCESS:
      return {
        uploading: false,
        progress: '100',
        done: true,
        failed: false,
        failedCode: '',
        failedMessage: ''
      }
    case VIDEO_UPLOAD_FAILURE:
      return {
        uploading: false,
        done: false,
        failed: true,
        failedCode: action.message,
        failedMessage: action.message
      }
    default:
      return state
  }
}

const videos = (state = {
  list: [],
  tryingFetch: false,
  fetchFailed: false,
  fetchFailedMessage: ''
}, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return {
        list: [],
        tryingFetch: true,
        fetchFailed: false,
        fetchFailedMessage: ''
      }
    case FETCH_VIDEOS_SUCCESS:
      return {
        list: action.data,
        tryingFetch: false,
        fetchFailed: false,
        fetchFailedMessage: ''
      }
    case FETCH_VIDEOS_FAILURE:
      return {
        list: [],
        tryingFetch: false,
        fetchFailed: true,
        fetchFailedMessage: action.message
      }
    default:
      return state
  }
}

const objectDetection = (state = {}, action) => {
  switch (action.type) {
    case OBJECT_DETECTION_REQUEST:
      return {
        ...state,
        [action.videoId]: {
          ...state[action.videoId],
          progress: '0',
          status: cv_status.NOT_STARTED
        }
      }
    case OBJECT_DETECTION_STARTED:
      return {
        ...state,
        [action.videoId]: {
          ...state[action.videoId],
          progress: '0',
          status: cv_status.STARTED,
          cancelLink: action.cancelLink,
          failed: false,
          message: ''
        }
      }
    case OBJECT_DETECTION_MADE_PROGRESS:
      return {
        ...state,
        [action.videoId]: {
          ...state[action.videoId],
          progress: action.progress,
          failed: false,
          message: ''
        }
      }
    case OBJECT_DETECTION_SUCCESS:
      return {
        ...state,
        [action.videoId]: {
          ...state[action.videoId],
          progress: '100',
          status: cv_status.COMPLETED,
          failed: false,
          message: ''
        }
      }
    case OBJECT_DETECTION_FAILURE:
      return {
        ...state,
        [action.videoId]: {
          ...state[action.videoId],
          status: cv_status.FAILED,
          failed: true,
          message: action.message
        }
      }
    default:
      return state
  }
}

*/

const rootReducer = combineReducers({
  width,
  userSession,
  lang,
  configSet
  //videos,
  //video,
  //objectDetection,
  //videoUpload
})

module.exports = rootReducer
