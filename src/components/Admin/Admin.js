const React = require('react')
const PropTypes = require('prop-types')
const { Route, Switch } = require('react-router-dom')
const AdminLogin = require('../AdminLogin')
const AdminHome = require('../AdminHome')

const Admin = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/login`} component={AdminLogin} />
    <Route path={`${url}`} component={AdminHome} />
  </Switch>
)

Admin.propTypes = {
  match: PropTypes.object.isRequired,
}

module.exports = Admin
