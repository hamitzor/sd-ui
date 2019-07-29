const {
  VIDEO_UPLOAD_STARTED,
  VIDEO_UPLOAD_MADE_PROGRESS,
  VIDEO_UPLOAD_SUCCESS,
  VIDEO_UPLOAD_FAILURE,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE
} = require('../constants/action-types')
const { apiConfig } = require('../util/config-loader')
const { apiRoot } = require('../util/addresses')
const formatRoute = require('../util/format-route')

const WEB_STATUS = apiConfig.codes.web_status
const videoEndpoint = (route, mapping) => apiRoot + apiConfig.web_api.route.video.sub_route + formatRoute(apiConfig.web_api.route.video[route], mapping)

exports.uploadVideo = (file, title) => dispatch => {
  dispatch({
    type: VIDEO_UPLOAD_STARTED
  })
  return new Promise(resolve => {
    const formData = new FormData()
    formData.append('videoFile', file)
    formData.set('title', title)
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.open('post', videoEndpoint('post'), true)

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100, 2)
        dispatch({
          type: VIDEO_UPLOAD_MADE_PROGRESS,
          progress
        })
      }
    }

    xhr.onerror = function (e) {
      dispatch({
        type: VIDEO_UPLOAD_FAILURE,
        code: 'CLIENT_SIDE_ERROR',
        message: e
      })
      resolve()
    }

    xhr.onload = function () {
      const res = JSON.parse(this.response)
      if (res.status === WEB_STATUS.OK) {
        dispatch({
          type: VIDEO_UPLOAD_SUCCESS
        })
      }
      else {
        dispatch({
          type: VIDEO_UPLOAD_FAILURE,
          code: res.status,
          message: res.payload.message
        })
      }
      resolve()
    }

    xhr.send(formData)
  })
}

exports.getVideo = videoId => dispatch => {
  dispatch({
    type: FETCH_VIDEO_REQUEST
  })
  return fetch(videoEndpoint('get', { video_id: videoId }), {
    credentials: 'include'
  }).then(res => res.json()).then(
    json => {
      if (json.status === WEB_STATUS.OK) {
        dispatch({
          type: FETCH_VIDEO_SUCCESS,
          data: json.payload
        })
      }
      else {
        dispatch({
          type: FETCH_VIDEO_FAILURE,
          message: json.status
        })
      }
    }
  )
}

exports.getAllVideos = () => dispatch => {
  dispatch({
    type: FETCH_VIDEOS_REQUEST
  })
  return fetch(videoEndpoint('get_all'), {
    credentials: 'include'
  }).then(res => res.json()).then(
    json => {
      if (json.status === WEB_STATUS.OK) {
        dispatch({
          type: FETCH_VIDEOS_SUCCESS,
          data: json.payload
        })
      }
      else {
        dispatch({
          type: FETCH_VIDEOS_FAILURE,
          message: json.status
        })
      }
    }
  )
}
