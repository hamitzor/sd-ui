const { combineReducers } = require('redux')
const { codes: { cv_status } } = require('../util/config-loader')

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  OBJECT_DETECTION_REQUEST,
  OBJECT_DETECTION_STARTED,
  OBJECT_DETCTION_MADE_PROGRESS,
  OBJECT_DETCTION_SUCCESS,
  OBJECT_DETCTION_FAILURE,
  VIDEO_UPLOAD_STARTED,
  VIDEO_UPLOAD_MADE_PROGRESS,
  VIDEO_UPLOAD_SUCCESS,
  VIDEO_UPLOAD_FAILURE
} = require('../constants/action-types')

const auth = (state = {
  authanticated: false,
  tryingLogin: false,
  loginFailed: false,
  loginFailedMessage: '',
  apiKey: null,
  user: {}
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        authanticated: false,
        tryingLogin: true,
        loginFailed: false,
        loginFailedMessage: '',
        apiKey: null,
        user: {}
      }
    case LOGIN_SUCCESS:
      return {
        authanticated: true,
        tryingLogin: false,
        loginFailed: false,
        loginFailedMessage: '',
        apiKey: action.apiKey,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        authanticated: false,
        tryingLogin: false,
        loginFailed: true,
        loginFailedMessage: action.message,
        apiKey: null,
        user: {}
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
        list: action.list,
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

const objectDetection = (state = {
  progress: {},
  status: {}
}, action) => {
  switch (action.type) {
    case OBJECT_DETECTION_REQUEST:
      return {
        progress: {
          ...state.progress,
          [action.videoId]: '0'
        },
        status: {
          ...state.status,
          [action.videoId]: cv_status.NOT_STARTED
        },
      }
    case OBJECT_DETECTION_STARTED:
      return {
        progress: {
          ...state.progress,
          [action.videoId]: '0'
        },
        status: {
          ...state.status,
          [action.videoId]: cv_status.STARTED
        },
      }
    case OBJECT_DETCTION_MADE_PROGRESS:
      return {
        progress: {
          ...state.progress,
          [action.videoId]: action.progress
        },
        status
      }
    case OBJECT_DETCTION_SUCCESS:
      return {
        progress: {
          ...state.progress,
          [action.videoId]: '100'
        },
        status: {
          ...state.status,
          [action.videoId]: cv_status.COMPLETED
        },
      }
    case OBJECT_DETCTION_FAILURE:
      return {
        progress: {
          ...state.progress,
          [action.videoId]: '0'
        },
        status: {
          ...state.status,
          [action.videoId]: cv_status.FAILED
        },
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
  failedMessage: ''
}, action) => {
  switch (action.type) {
    case VIDEO_UPLOAD_STARTED:
      return {
        uploading: true,
        progress: '0',
        done: false,
        failed: false,
        failedMessage: ''
      }
    case VIDEO_UPLOAD_MADE_PROGRESS:
      return {
        uploading: true,
        progress: action.progress,
        done: false,
        failed: false,
        failedMessage: ''
      }
    case VIDEO_UPLOAD_SUCCESS:
      return {
        uploading: false,
        progress: '100',
        done: true,
        failed: false,
        failedMessage: ''
      }
    case VIDEO_UPLOAD_FAILURE:
      return {
        uploading: false,
        progress: state.progress,
        done: false,
        failed: true,
        failedMessage: action.message
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  auth,
  videos,
  objectDetection,
  videoUpload
})

export default rootReducer
