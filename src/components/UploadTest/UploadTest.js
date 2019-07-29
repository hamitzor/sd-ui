const React = require('react')
const { connect } = require('react-redux')
const PropTypes = require('prop-types')
const { uploadVideo } = require('../../actions/video')

class UploadTest extends React.Component {

  onUpload = (e) => {
    const file = e.target.files[0]
    const title = 'Test'

    this.props.dispatch(uploadVideo(file, title)).then(() => console.log('DONE!!'))
  }

  render() {
    return (<div>
      <input onChange={this.onUpload} type='file' />
    </div>)
  }
}

UploadTest.propTypes = {
  dispatch: PropTypes.func
}

module.exports = connect()(UploadTest)