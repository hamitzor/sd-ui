const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Flex = require('../Flex')
const AdminHeader = require('../AdminHeader')
const AdminFooter = require('../AdminFooter')
const Panel = require('../Panel')
const InputBase = require('../InputBase')
const InputContainer = require('../InputContainer')
const InputExtension = require('../InputExtension')
const Button = require('../Button')
const IconButton = require('../IconButton')
const Icon = require('../Icon')
const { FaRegEye, FaRegEyeSlash } = require('react-icons/fa')
const { IoMdKey, IoIosPerson, IoMdClose } = require('react-icons/io')
const Control = require('../Control')
const Text = require('../Text')
const Alert = require('../Alert')
const Anchor = require('../Anchor')
const { Link } = require('react-router-dom')
const { connect } = require('react-redux')
const { login } = require('../../actions/auth')
const { Redirect } = require('react-router-dom')
const {
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR
} = require('../../../status-codes')

const statusErrorMap = {
  [NOT_FOUND]: 'Username or password is wrong',
  [BAD_REQUEST]: 'Username or password is not set',
  [FORBIDDEN]: 'This actino is not allowed',
  [INTERNAL_SERVER_ERROR]: 'Internal server error'
}

const styles = theme => {
  return {
    root: {},
    container: {
      flex: 1,
      padding: `${theme.unit * 16}px ${theme.unit * 2}px`,
      [theme.bigger('sm')]: {
        padding: `${theme.unit * 34.8}px ${theme.unit * 5}px`,
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
    remember: {
      marginTop: theme.unit * 3
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
  //Redux fix: https://stackoverflow.com/questions/53786551/reactjs-redux-cant-perform-a-react-state-update-on-an-unmounted-component
  componentWillUnmount() {
    this.setState = () => undefined
  }

  componentDidMount() {
    document.getElementsByTagName('input')[0].focus()
  }

  getInitialState = () => (
    {
      error: false,
      message: '',
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

  handleSubmit = async () => {
    const { dispatch } = this.props
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
        const { status } = await dispatch(login(username, password))
        if (status !== OK) {
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
          message: statusErrorMap[INTERNAL_SERVER_ERROR]
        })
      }
    })
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
      userSession: { authanticated },
      width
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

    const isXs = width === 'xs'

    const rootClasses = classNames({
      [classes.root]: true
    })

    const containerClasses = classNames({
      [classes.container]: true
    })

    const alertClasses = classNames({
      [classes.alert]: true
    })

    const rememberClasses = classNames({
      [classes.remember]: true,
      [classes['margin-bottom']]: true
    })

    return authanticated ? <Redirect to='/admin' /> : (
      <Flex className={rootClasses} direction='column' parent>
        <AdminHeader>
          <div className={classes['header-content']}>
            <Anchor className={classes.logo}>
              <Link to='/admin'><Text tag='h4' color='white'>SceneDetector | Admin Panel Login</Text></Link>
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
                className={rememberClasses}
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
  dispatch: PropTypes.func.isRequired,
  userSession: PropTypes.object.isRequired,
  width: PropTypes.string
}

AdminLogin.defaultProps = {
  width: 'lg'
}

const styledAdminLogin = withStyles(styles)(AdminLogin)

styledAdminLogin.displayName = 'AdminLogin'

module.exports = connect(state => ({
  userSession: state.userSession,
  width: state.width
}))(styledAdminLogin)
