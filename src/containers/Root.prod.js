const React = require('react')
const PropTypes = require('prop-types')
const { Provider } = require('react-redux')
const App = require('./App')

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root
