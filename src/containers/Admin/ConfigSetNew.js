const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const { connect } = require('react-redux')
const Panel = require('../../components/Panel')
const Flex = require('../../components/Flex')
const Text = require('../../components/Text')
const InputContainer = require('../../components/InputContainer')
const Icon = require('../../components/Icon')
const InputBase = require('../../components/InputBase')
const i18n = require('../../i18n/translations')
const Button = require('../../components/Button')
const IconButton = require('../../components/IconButton')
const { IoMdClose } = require('react-icons/io')
const Alert = require('../../components/Alert')
const { create } = require('../../actions/configuration-set')
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

const styles = theme => ({
  root: {},
  panel: {
    padding: theme.unit * 8,
    margin: theme.unit * 5
  },
  form: {
    margin: theme.unit * 8,
    padding: `${theme.unit * 15}px ${theme.unit * 10}px`,
    [theme.smaller('sm')]: {
      width: '100%',
      padding: `${theme.unit * 4}px 0`,
    },
    position: 'relative',
    maxWidth: 400
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
  }
})

class ConfigSetNew extends React.Component {

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
    configSetName: '',
    busy: false,
    validation: {
      configSetName: {
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
    let { configSetName, busy } = this.state
    configSetName = configSetName.trim()

    if (configSetName === '' || busy) {
      this.setState({
        validation: {
          configSetName: {
            valid: configSetName !== '',
            message: configSetName !== '' ? '' : i18n[lang].validationErrorEmptyConfigSetName
          }
        }
      })
      return
    }

    this.setState({
      busy: true
    }, async () => {
      try {
        const { status } = await dispatch(create(configSetName))
        if (status !== OK) {
          this.setState({
            ...this.getInitialState(),
            error: true,
            message: i18n[lang][statusErrorMap[status]]
          })
        }
        else {
          this.setState({
            busy: false
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
      width,
      lang,
    } = this.props

    const {
      configSetName: configSetName,
      busy,
      error,
      message,
      validation
    } = this.state

    const isXs = width === 'xs'

    return (
      <div className={classes.root}>
        <Panel className={classes.form}>
          <Flex parent justify={isXs ? 'center' : 'start'}>
            <Text marginBottom tag='h4'>{i18n[lang].newConfigSetTitle}</Text>
          </Flex>
          <Flex direction='column' alignItems={isXs ? 'center' : 'stretch'} parent>
            <InputContainer
              className={classes['margin-bottom']}
              label={i18n[lang].configSetName}
              desc={i18n[lang].configSetNameDesc}
              errorMessage={validation.configSetName.message}
              error={!validation.configSetName.valid}>
              <InputBase
                value={configSetName}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus('configSetName')}
                onChange={this.handleChange('configSetName')}
              />
            </InputContainer>
            <Button
              type='filled'
              className={classes.button}
              onClick={this.handleSubmit}
              disabled={busy}
              busy={busy}
            >
              {i18n[lang].create}
            </Button>
          </Flex>
          <Alert
            absolute={!isXs}
            fixed={isXs}
            align={isXs ? 'top' : 'unset'}
            justify={isXs ? 'left' : 'unset'}
            className={classes.alert}
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
      </div>
    )
  }
}

ConfigSetNew.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  userSession: PropTypes.object.isRequired,
  width: PropTypes.string,
}

ConfigSetNew.defaultProps = {
  width: 'lg'
}

const styledAdminHome = withStyles(styles)(ConfigSetNew)

styledAdminHome.displayName = 'AdminHome'

module.exports = connect(state => ({
  userSession: state.userSession,
  width: state.width,
  lang: state.lang
}))(styledAdminHome)
