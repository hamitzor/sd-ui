import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import Flex from '../Flex'
import AdminHeader from '../AdminHeader'
import AdminFooter from '../AdminFooter'
import Panel from '../Panel'
import InputBase from '../InputBase'
import InputContainer from '../InputContainer'
import InputExtension from '../InputExtension'
import Button from '../Button'
import IconButton from '../IconButton'
import Icon from '../Icon'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IoMdKey, IoIosPerson, IoMdClose } from 'react-icons/io'
import Control from '../Control'
import Text from '../Text'
import Alert from '../Alert'
import { withAdminContext } from '../../context/AdminContext'
import { Redirect } from 'react-router-dom'
import Anchor from '../Anchor'
import { Link } from 'react-router-dom'

const statusErrorMap = {
  404: 'Username or password is wrong',
  400: 'Username or password is not set',
  403: 'This actino is not allowed',
  500: 'Internal server error'
}

const styles = theme => {
  return {
    root: {
      height: '100vh'
    },
    container: {
      flex: 1,
      padding: `${theme.unit * 2}px ${theme.unit * 2}px`,
      [theme.bigger('sm')]: {
        padding: `${theme.unit * 3}px ${theme.unit * 5}px`,
      },
    },
    form: {
      padding: `${theme.unit * 15}px ${theme.unit * 15}px`,
      [theme.smaller('sm')]: {
        width: '100%',
        padding: `${theme.unit * 4}px 0`,
      },
      position: 'relative',
      maxWidth: 452
    },
    button: {
      [theme.smaller('sm')]: {
        width: `calc( 100% - ${theme.unit * 4}px )`,
      }
    },
    'margin-bottom': {
      marginBottom: theme.unit * 3
    },
    'margin-top': {
      marginTop: theme.unit * 4
    },
    alert: {
      [theme.bigger('sm')]: {
        maxWidth: 300,
        left: theme.unit * 15,
        right: theme.unit * 15,
        marginTop: theme.unit * 2

      }
    },
    'alert-message': {
      color: theme.color.white,
      fontSize: '0.9rem'
    },
    logo: {
      '& a': {
        textDecoration: 'none'
      }
    },
    'header-content': {
      padding: `${theme.unit * 2}px ${theme.unit * 2}px`,
      [theme.bigger('sm')]: {
        padding: `${theme.unit * 2}px ${theme.unit * 5}px`,
      }
    }
  }
}

class AdminLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState = () => (
    {
      error: false,
      message: 'Something went wrong',
      showPassword: false,
      username: '',
      password: '',
      busy: false,
      keep: false,
      validation: {
        username: {
          valid: true,
          message: ''
        },
        password: {
          valid: true,
          message: ''
        }
      }
    }
  )

  handleKeyDown = event => {
    event.persist()
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleFocus = name => () => {
    this.setState(({ validation }) => (
      {
        error: false,
        message: '',
        validation: {
          ...validation,
          [name]: {
            message: '',
            valid: true
          }
        }
      }
    ))
  }

  handleSubmit = () => {
    let { username, password, busy } = this.state
    username = username.trim()
    password = password.trim()

    if (username === '' || password === '' || busy) {
      this.setState({
        validation: {
          username: {
            valid: username !== '',
            message: username !== '' ? '' : 'You must enter your username'
          },
          password: {
            valid: password !== '',
            message: password !== '' ? '' : 'You must enter your password'
          }
        }
      })
      return
    }

    this.setState({
      busy: true
    }, async () => {
      try {
        const status = await this.login(username, password)
        if (status !== 200) {
          this.setState({
            ...this.getInitialState(),
            error: true,
            message: statusErrorMap[status]
          })
        }
      }
      catch (err) {
        this.setState({
          ...this.getInitialState(),
          error: true,
          message: statusErrorMap[500]
        })
      }
    })
  }

  login = async (username, password) => {

    const { adminContext: { loggedInCallback, apiEndpoints } } = this.props
    let status = undefined
    try {
      const res = await fetch(apiEndpoints.session, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })
      if (res.status === 200) {
        const data = await res.json()
        status = 200
        loggedInCallback(data)
      }
      else {
        status = res.status
      }
    }
    catch (err) {
      throw err
    }

    return status
  }

  handleKeepChange = event => {
    this.setState({
      keep: event.target.checked
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  togglePassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }))
  }

  handleAlertClose = () => {
    this.setState({ error: false })
  }

  render() {
    const {
      classes,
      className,
      adminContext,
      /* eslint-disable */
      //Just to catch ...others properly, theme prop is extracted.
      theme,
      /* eslint-enable */
    } = this.props

    const {
      username,
      password,
      showPassword,
      busy,
      keep,
      error,
      message,
      validation
    } = this.state

    const width = theme.width()
    const isXs = width === 'xs'

    const rootClasses = classNames({
      [classes.root]: true,
      [className]: true
    })

    const containerClasses = classNames({
      [classes.container]: true
    })

    const alertClasses = classNames({
      [classes.alert]: true
    })


    return adminContext.auth ? <Redirect to='/admin' /> : (
      <Flex className={rootClasses} direction='column' parent>
        <AdminHeader>
          <div className={classes['header-content']}>
            <Anchor className={classes.logo}>
              <Link to="/admin"><Text tag="h4" color="white">Hamit Zor - Admin</Text></Link>
            </Anchor>
          </div>
        </AdminHeader>
        <Flex className={containerClasses} justify='center' alignItems='center' parent>
          <Panel className={classes.form}>
            <Flex parent justify={isXs ? 'center' : 'start'}>
              <Text marginBottom tag='h4'  >Administrator Login</Text>
            </Flex>
            <Flex direction='column' alignItems={isXs ? 'center' : 'stretch'} parent>
              <InputContainer
                className={classes['margin-bottom']}
                label='Username'
                desc='Administrator Username'
                errorMessage={validation.username.message}
                error={!validation.username.valid}>
                <InputExtension>
                  <Icon>
                    <IoIosPerson />
                  </Icon>
                </InputExtension>
                <InputBase
                  value={username}
                  onKeyDown={this.handleKeyDown}
                  onFocus={this.handleFocus('username')}
                  onChange={this.handleChange('username')}
                />
              </InputContainer>
              <InputContainer
                className={classes['margin-bottom']}
                label='Password'
                desc='Administrator Password'
                errorMessage={validation.password.message}
                error={!validation.password.valid}>
                <InputExtension>
                  <Icon>
                    <IoMdKey />
                  </Icon>
                </InputExtension>
                <InputBase
                  value={password}
                  onKeyDown={this.handleKeyDown}
                  onFocus={this.handleFocus('password')}
                  onChange={this.handleChange('password')}
                  type={showPassword ? 'text' : 'password'}
                />
                {
                  password && <InputExtension>
                    <IconButton
                      tabIndex='-1'
                      size={1}
                      color='default'
                      onClick={this.togglePassword}>
                      <Icon>
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </Icon>
                    </IconButton>
                  </InputExtension>
                }
              </InputContainer>
              <Control
                className={classes['margin-bottom']}
                value='remember'
                onChange={this.handleKeepChange}
                checked={keep}
                inputLabel='Keep me logged in'
              />
              <Button
                type='filled'
                className={classes.button}
                onClick={this.handleSubmit}
                disabled={busy}
              >
                Login
              </Button>
            </Flex>
            <Alert
              absolute={!isXs}
              fixed={isXs}
              align={isXs ? 'top' : 'unset'}
              justify={isXs ? 'left' : 'unset'}
              className={alertClasses}
              color='error'
              open={error}
              fullWidth={isXs}
              animate={!isXs}>
              <Flex wrap='nowrap' parent justify='between'>
                <div className={classes['alert-message']}>{message}</div>
                <IconButton
                  size={1}
                  color='white'
                  onClick={this.handleAlertClose}>
                  <Icon>
                    <IoMdClose />
                  </Icon>
                </IconButton>
              </Flex>
            </Alert>
          </Panel>
        </Flex>
        <AdminFooter />
      </Flex>
    )
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  adminContext: PropTypes.object.isRequired,
  className: PropTypes.string
}

AdminLogin.defaultProps = {
  className: '',
}

const styledAdminLogin = withAdminContext(withStyles(styles)(AdminLogin))

styledAdminLogin.displayName = 'AdminLogin'

export default styledAdminLogin
