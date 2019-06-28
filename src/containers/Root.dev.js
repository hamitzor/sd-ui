const React = require('react')
const { Fragment } = require('react')
const PropTypes = require('prop-types')
const { Provider } = require('react-redux')
const DevTools = require('./DevTools')
const App = require('./App')

const Root = ({ store }) => (
  <Provider store={store}>
    <Fragment>
      <App />
      <DevTools />
    </Fragment>
  </Provider >
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

module.exports = Root
