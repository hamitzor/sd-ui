const React = require('react')
const PropTypes = require('prop-types')
const { Route, Switch } = require('react-router-dom')
const AdminLogin = require('../AdminLogin')
const AdminHome = require('../AdminHome')

class Admin extends React.Component {

  render() {
    const {
      match
    } = this.props

    return (
      <Switch>
        <Route exact path={`${match.path}`} component={AdminHome} />
        <Route path={`${match.path}/login`} component={AdminLogin} />
      </Switch>
    )
  }
}

Admin.propTypes = {
  match: PropTypes.object.isRequired,
}

module.exports = Admin
