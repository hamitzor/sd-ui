const React = require('react')
const { connect } = require('react-redux')
const PropTypes = require('prop-types')
const { uploadVideo, getAllVideos, getVideo } = require('../../actions/video')
const { startObjectDetection } = require('../../actions/objectDetection')

class UploadTest extends React.Component {

  onUpload = (e) => {
    const file = e.target.files[0]
    const title = document.getElementById('video_title').value
    this.props.dispatch(uploadVideo(file, title)).then(() => console.log('DONE!!'))
  }

  fetchVideos = () => {
    this.props.dispatch(getAllVideos())
  }

  fetchVideo = () => {
    const videoId = document.getElementById('video_id').value
    this.props.dispatch(getVideo(videoId))
  }

  startObjectDetection = () => {
    const videoId = document.getElementById('video_id').value
    this.props.dispatch(startObjectDetection(videoId))
  }

  render() {
    return (<div>
      <input onChange={this.onUpload} type='file' /><br />
      <input id='video_title' type='text' placeholder='Title' /><br />
      <input id='video_id' type='text' placeholder='ID' /><br />
      <button onClick={this.fetchVideos}>Fetch Videos</button><br />
      <button onClick={this.fetchVideo}>Fetch Video</button><br />
      <button onClick={this.startObjectDetection}>Start Object Detection</button>
    </div>)
  }
}

UploadTest.propTypes = {
  dispatch: PropTypes.func
}

module.exports = connect()(UploadTest)