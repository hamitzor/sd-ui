const React = require('react')
const PropTypes = require('prop-types')
const { Route, Switch } = require('react-router-dom')
const AdminLogin = require('../AdminLogin')
const AdminHome = require('../AdminHome')
const { withAppContext } = require('../../context/AppContext')
const { AdminProvider } = require('../../context/AdminContext')


class Admin extends React.Component {

  state = {
    auth: false,
    authDone: false,
    user: undefined
  }

  loggedInCallback = (user) => {
    this.setState({
      auth: true,
      user
    })
  }

  loggedOutCallback = () => {
    this.setState({ auth: false, user: undefined })
  }

  getContext = () => {
    return {
      adminContext: {
        ...this.props.appContext,
        ...this.state,
        loggedInCallback: this.loggedInCallback,
        loggedOutCallback: this.loggedOutCallback,
      }
    }
  }

  async componentDidMount() {

    const { apiEndpoints: { session } } = this.props.appContext

    try {
      const res = await fetch(session, {
        method: 'GET'
      })

      if (res.status === 200) {
        const user = await res.json()
        this.setState({
          auth: true,
          authDone: true,
          user
        })
      } else {
        this.setState({ authDone: true })
      }
    } catch (err) {
      this.setState({ authDone: true })
    }
  }

  render() {
    const {
      match
    } = this.props

    const {
      authDone
    } = this.state

    return authDone ? (
      <AdminProvider value={this.getContext()}>
        <Switch>
          <Route exact path={`${match.path}`} component={AdminHome} />
          <Route path={`${match.path}/login`} component={AdminLogin} />
        </Switch>
      </AdminProvider>
    ) : <div> Loading...</div>
  }
}

Admin.propTypes = {
  match: PropTypes.object.isRequired,
  appContext: PropTypes.object.isRequired,
}

module.exports = withAppContext(Admin)
