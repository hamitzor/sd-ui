const { combineReducers } = require('redux')
//const { codes: { cv_status } } = require('../util/config-loader')

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
  //VIDEO_UPLOAD_FAILURE
} = require('../constants/action-types')

const auth = (state = {
  authanticated: false,
  tryingLogin: false,
  loginFailed: false,
  loginFailedMessage: '',
  user: null
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        authanticated: false,
        tryingLogin: true,
        loginFailed: false,
        loginFailedMessage: '',
        user: null
      }
    case LOGIN_SUCCESS:
      return {
        authanticated: true,
        tryingLogin: false,
        loginFailed: false,
        loginFailedMessage: '',
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        authanticated: false,
        tryingLogin: false,
        loginFailed: true,
        loginFailedMessage: action.message,
        user: null
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
  auth,
  //videos,
  //video,
  //objectDetection,
  //videoUpload
})

module.exports = rootReducer
