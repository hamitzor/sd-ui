/*


import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withAdminContext from '../../../context/adminContext'
import { Redirect } from 'react-router-dom'
import LoginHeader from '../LoginHeader'
import LoginFooter from '../LoginFooter'
import LoginForm from '../LoginForm'

//@TODO this regex will be used while registering new admins from the panel
//const passwordRegex = /^(?=^[a-zA-Z0-9\.\?\_\-\*]*$)(?=.*[\.\?\_\-\*])(?=^.{8,20}$).*$/


const statusErrorMap = {
  404: "Username or password is wrong",
  400: "Username or password is not set",
  403: "This actino is not allowed",
  500: "Internal server error"
}

const styles = theme => {
  const { spacing: { unit } } = theme

  return {
    content: {
      minHeight: `calc( 100vh - ${unit * 16}px )`
    }
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  handleKeyDown = event => {
    event.persist()
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleFocus = name => () => {
    this.setState(({ validation }) => (
      {
        validation: {
          ...validation,
          [name]: true
        }
      }
    ))
  }

  handleAlertClose = () => {
    this.setState({
      formError: false,
    });
  }

  handleSubmit = () => {
    let { username, password } = this.state
    username = username.trim()
    password = password.trim()

    if (username === '' || password === '') {
      this.setState({
        validation: {
          username: username === '' ? false : true,
          password: password === '' ? false : true
        }
      })
      return
    }

    this.setState({
      performingLogin: true
    }, async () => {
      try {
        await this.login(username, password)
      }
      catch (err) {
        this.setState({
          ...this.getInitialState(),
          formError: true,
          formErrorMessage: err.status ? statusErrorMap[err.status] : 'An error occured while trying to login'
        })
      }
    })
  }


  login = async (username, password) => {

    const { loggedInCallback, sessionAPIEndPoint: endpoint } = this.props

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })
      console.log(res)
      if (res.status === 200) {
        const data = await res.json()
        loggedInCallback(data)
      }
      else {
        throw { status: res.status }
      }
    }
    catch (err) {
      throw err
    }
  }

  getInitialState = () => (
    {
      formError: false,
      formErrorMessage: 'Username or password is wrong',
      showPassword: false,
      username: '',
      password: '',
      formBusy: false,
      validation: {
        username: true,
        password: true
      }
    }
  )

  render() {
    const { classes, auth } = this.props

    const loginFormProps = {
      busy: this.state.formBusy,
      error: this.state.formError,
      errorMessage: this.state.formErrorMessage,
      username: this.state.username,
      password: this.state.password,
      validUsername: this.state.validation.username,
      validPassword: this.state.validation.password,
      onFocus: this.handleFocus,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onSubmit: this.handleSubmit,
      onAlertClose: this.handleAlertClose
    }

    return auth ? <Redirect to="/admin" /> : (
      <Fragment>
        <LoginHeader />
        <Grid container justify="center" alignItems="center" className={classes.content}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h4" gutterBottom>Admin Login</Typography>
            <LoginForm {...loginFormProps} />
          </Grid>
        </Grid>
        <LoginFooter />
      </Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withAdminContext(withStyles(styles)(Login))



*/