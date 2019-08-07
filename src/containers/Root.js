/* eslint-disable react/prop-types */
const React = require('react')
const PropTypes = require('prop-types')
const { Provider } = require('react-redux')
const App = require('./App')
const i18n = require('../i18n/translations')
const { Route, Switch } = require('react-router-dom')

const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <Route path={`/:lang(${Object.keys(i18n).join('|')})`} component={App} />
      <Route path="*" component={() => <div>4044</div>} />
    </Switch>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
module.exports = Root