const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Flex = require('../../components/Flex')
const AdminHeader = require('../../components/AdminHeader')
const AdminFooter = require('../../components/AdminFooter')
const Panel = require('../../components/Panel')
const InputBase = require('../../components/InputBase')
const InputContainer = require('../../components/InputContainer')
const InputExtension = require('../../components/InputExtension')
const Button = require('../../components/Button')
const IconButton = require('../../components/IconButton')
const Icon = require('../../components/Icon')
const { FaRegEye, FaRegEyeSlash } = require('react-icons/fa')
const { IoMdClose } = require('react-icons/io')
const { FiLock, FiUser } = require('react-icons/fi')
const Text = require('../../components/Text')
const Alert = require('../../components/Alert')
const Anchor = require('../../components/Anchor')
const { Link } = require('react-router-dom')
const { connect } = require('react-redux')
const { login } = require('../../actions/auth')
const { Redirect } = require('react-router-dom')
const i18n = require('../../i18n/translations')
const {
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR
} = require('../../../status-codes')

const statusErrorMap = {
  [NOT_FOUND]: 'loginErrorWrong',
  [BAD_REQUEST]: 'loginErrorBadRequest',
  [FORBIDDEN]: 'errorForbidden',
  [INTERNAL_SERVER_ERROR]: 'errorServerError'
}

const styles = theme => {
  return {
    root: {},
    'lang-link': {
      marginRight: theme.unit * 4
    },
    container: {
      flex: 1,
      padding: `${theme.unit * 16}px ${theme.unit * 2}px`,
      [theme.bigger('sm')]: {
        padding: `${theme.unit * 33.75}px ${theme.unit * 5}px`,
      },
    },
    form: {
      padding: `${theme.unit * 20}px ${theme.unit * 15}px`,
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
      marginTop: theme.unit * 2,
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
    'header-content': {
      '& a': {
        textDecoration: 'none'
      },
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

  componentDidMount() {
    const firstInput = document.getElementsByTagName('input')[0]
    if (firstInput) {
      firstInput.focus()
    }
  }

  getInitialState = () => ({
    error: false,
    message: '',
    showPassword: false,
    username: '',
    password: '',
    busy: false,
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
  })

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
    const { dispatch, lang } = this.props
    let { username, password, busy } = this.state
    username = username.trim()
    password = password.trim()

    if (username === '' || password === '' || busy) {
      this.setState({
        validation: {
          username: {
            valid: username !== '',
            message: username !== '' ? '' : i18n[lang].validationErrorEmptyUsername
          },
          password: {
            valid: password !== '',
            message: password !== '' ? '' : i18n[lang].validationErrorEmptyUsername
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
            message: i18n[lang][statusErrorMap[status]]
          })
        }
      }
      catch (err) {
        this.setState({
          ...this.getInitialState(),
          error: true,
          message: i18n[lang][statusErrorMap[INTERNAL_SERVER_ERROR]]
        })
      }
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
      width,
      lang,
      match: { url },
      location: { state }
    } = this.props

    if (authanticated) {
      console.log(state)
      if (state) {
        return <Redirect to={state.from.pathname} />
      }
      return <Redirect to={`/${lang}`} />
    }

    const {
      username,
      password,
      showPassword,
      busy,
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

    return (
      <Flex className={rootClasses} direction='column' parent>
        <AdminHeader className={classes['header-content']}>
          <div></div>
          <div>
            <Anchor>
              <Link to='/admin'><Text tag='h4' color='white'>{i18n[lang].loginHeader}</Text></Link>
            </Anchor>
          </div>
          <div className={classes['lang-link']}>
            <Anchor>
              <Link to={`${url.replace(/^\/..\//, lang === 'tr' ? '/en/' : '/tr/')}`}><Text tag='h5' color='white'>{lang === 'tr' ? 'EN' : 'TR'}</Text></Link>
            </Anchor>
          </div>
        </AdminHeader>
        <Flex className={containerClasses} justify='center' alignItems='center' parent>
          <Panel className={classes.form}>
            <Flex parent justify={isXs ? 'center' : 'start'}>
              <Text marginBottom tag='h4'>{i18n[lang].loginFormTitle}</Text>
            </Flex>
            <Flex direction='column' alignItems={isXs ? 'center' : 'stretch'} parent>
              <InputContainer
                className={classes['margin-bottom']}
                label={i18n[lang].username}
                desc={i18n[lang].usernameDesc}
                errorMessage={validation.username.message}
                error={!validation.username.valid}>
                <InputExtension>
                  <Icon>
                    <FiUser />
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
                label={i18n[lang].password}
                desc={i18n[lang].passwordDesc}
                errorMessage={validation.password.message}
                error={!validation.password.valid}>
                <InputExtension>
                  <Icon>
                    <FiLock />
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
              <Button
                type='filled'
                busy={busy}
                className={classes.button}
                onClick={this.handleSubmit}
                disabled={busy}
              >
                {i18n[lang].login}
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
        <AdminFooter lang={lang} />
      </Flex>
    )
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  userSession: PropTypes.object.isRequired,
  width: PropTypes.string,
  lang: PropTypes.string.isRequired
}

AdminLogin.defaultProps = {
  width: 'lg'
}

const styledAdminLogin = withStyles(styles)(AdminLogin)

styledAdminLogin.displayName = 'AdminLogin'

module.exports = connect(state => ({
  userSession: state.userSession,
  width: state.width,
  lang: state.lang
}))(styledAdminLogin)
