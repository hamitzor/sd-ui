const {
  OBJECT_DETECTION_REQUEST,
  OBJECT_DETECTION_STARTED,
  OBJECT_DETECTION_MADE_PROGRESS,
  OBJECT_DETECTION_SUCCESS,
  OBJECT_DETECTION_FAILURE
} = require('../constants/action-types')
const { apiConfig } = require('../util/config-loader')
const { apiRoot, apiWsRoot } = require('../util/addresses')
const formatRoute = require('../util/format-route')

const CV_STATUS = apiConfig.codes.cv_status
const WEB_STATUS = apiConfig.codes.web_status
const objectDetectionEndpoint = (route, mapping) => apiRoot + apiConfig.web_api.route.object_detection.sub_route +
  formatRoute(apiConfig.web_api.route.object_detection[route], mapping)

const objectDetectionWsEndpoint = (route, mapping) => apiWsRoot + apiConfig.web_api.ws_route.object_detection.sub_route +
  formatRoute(apiConfig.web_api.ws_route.object_detection[route], mapping)

exports.startObjectDetection = videoId => dispatch => {
  const statusWs = new WebSocket(objectDetectionWsEndpoint('watch_status', { video_id: videoId }))
  const progressWs = new WebSocket(objectDetectionWsEndpoint('watch_progress', { video_id: videoId }))
  let cancelLink = ''

  statusWs.addEventListener("open", () => {
    statusWs.send("hey")
  })
  progressWs.addEventListener("open", () => {
    progressWs.send("hey")
  })

  statusWs.addEventListener("message", e => {
    const json = JSON.parse(e.data)
    if (json.status === WEB_STATUS.OK) {
      const payload = json.payload
      if (payload.status === CV_STATUS.STARTED) {
        dispatch({
          type: OBJECT_DETECTION_STARTED,
          videoId,
          cancelLink
        })
      }
      else if (payload.status === CV_STATUS.COMPLETED) {
        dispatch({
          type: OBJECT_DETECTION_SUCCESS,
          videoId
        })
      }
      else {
        dispatch({
          type: OBJECT_DETECTION_FAILURE,
          videoId,
          message: payload.status
        })
      }
    }
    else {
      dispatch({
        type: OBJECT_DETECTION_FAILURE,
        videoId,
        message: json.status
      })
    }
  })

  progressWs.addEventListener("message", e => {
    const json = JSON.parse(e.data)
    if (json.status === WEB_STATUS.OK) {
      const payload = json.payload
      dispatch({
        type: OBJECT_DETECTION_MADE_PROGRESS,
        videoId,
        progress: payload.progress
      })
    }
    else {
      dispatch({
        type: OBJECT_DETECTION_FAILURE,
        videoId,
        message: 'Cannot get progress'
      })
    }
  })

  dispatch({
    type: OBJECT_DETECTION_REQUEST,
    videoId
  })

  setTimeout(() => {
    fetch(objectDetectionEndpoint('start', { video_id: videoId }), {
      credentials: 'include'
    }).then(res => res.json()).then(
      json => {
        console.log(json)
        cancelLink = json._links.cancel
      }
    )
  }, 500)
}

exports.getVideos
