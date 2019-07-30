const React = require('react')
const { connect } = require('react-redux')
const PropTypes = require('prop-types')

const postOptions = (obj, method = 'POST') => ({
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(obj)
})
const print = obj => {
  console.log(JSON.stringify(obj, null, 2))
}

class ConfigApiTest extends React.Component {

  async componentDidMount() {
    let res = {}
    const apiRoot = 'http://localhost:3000/config'
    res = await (await fetch(`${apiRoot}`)).json()
    print(res.payload)
    res = await (await fetch(`${res.payload[0]._links.createField}`,
      postOptions({ key: 'deleting', value: 'deleting' }))).json()
    res = await (await fetch(`${res.payload._links.self}`, postOptions({ key: 'Not deleted', value: 'val disturbed' }, 'PUT'))).json()
    console.log(res.payload)
  }

  render() {
    return null
  }
}

ConfigApiTest.propTypes = {
  dispatch: PropTypes.func
}

module.exports = connect()(ConfigApiTest)