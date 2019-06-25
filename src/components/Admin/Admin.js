import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import AdminLogin from '../AdminLogin'
import AdminHome from '../AdminHome'
import { withAppContext } from '../../context/AppContext'
import { AdminProvider } from '../../context/AdminContext'


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

export default withAppContext(Admin)
