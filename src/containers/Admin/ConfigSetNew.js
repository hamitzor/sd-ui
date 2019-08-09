const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const { connect } = require('react-redux')
const Flex = require('../../components/Flex')
const InputContainer = require('../../components/InputContainer')
const Icon = require('../../components/Icon')
const InputBase = require('../../components/InputBase')
const i18n = require('../../i18n/translations')
const Button = require('../../components/Button')
const IconButton = require('../../components/IconButton')
const { IoMdClose } = require('react-icons/io')
const Alert = require('../../components/Alert')
const { create, getAll } = require('../../actions/configuration-set')
const Popup = require('../../components/Popup')
const PopupBody = require('../../components/PopupBody')
const PopupHeader = require('../../components/PopupHeader')
const PopupFooter = require('../../components/PopupFooter')
const PopupHeaderTitle = require('../../components/PopupHeaderTitle')
const PopupHeaderExtension = require('../../components/PopupHeaderExtension')
const { transitionTime } = require('../../theme')
const ListItem = require('../../components/ListItem')
const List = require('../../components/List')
const {
  DUPLICATED
} = require('../../../error-codes')
const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('../../../status-codes')

const statusErrorMap = {
  [DUPLICATED]: 'configSetNameDuplicated',
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
      width: '100%'
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
    const { dispatch } = this.props
    dispatch(getAll())
  }

  resetStateWithDelay = () => new Promise(resolve => {
    setTimeout(() => {
      this.setState(this.getInitialState(), () => resolve())
    }, transitionTime)
  })

  getInitialState = () => ({
    selectedConfigField: null,
    selectedConfigSet: null,
    dialogOpen: false,
    dialogContent: null,
    dialogTitle: '',
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
    let { configSetName, validation, busy } = this.state
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

    if (Object.keys(validation).filter(key => validation[key].valid === false).length > 0) {
      return
    }

    this.setState({
      busy: true
    }, async () => {
      try {
        const { status, payload } = await dispatch(create(configSetName))
        if (status !== OK) {
          this.setState({
            busy: false,
            validation: {
              configSetName: {
                valid: false,
                message: i18n[lang][statusErrorMap[payload.name]]
              }
            }
          })
        }
        else {
          this.setState({
            dialogOpen: false
          }, () => this.resetStateWithDelay())
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

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    }, () => this.resetStateWithDelay())
  }

  openCreateConfigSetDialog = () => {
    const {
      lang
    } = this.props

    this.setState({
      dialogOpen: true,
      dialogTitle: i18n[lang].newConfigSetTitle
    })
  }

  render() {

    const {
      width,
      classes,
      lang,
      configSet
    } = this.props

    const {
      selectedConfigSet,
      dialogOpen,
      dialogTitle,
      busy,
      configSetName,
      error,
      message,
      validation,
    } = this.state


    const isXs = width === 'xs'

    return (
      <React.Fragment>
        <Popup width='maxContent' open={dialogOpen} onClose={this.handleDialogClose} fullScreen={isXs}>
          <PopupHeader color='secondary' style={{ justifyContent: 'space-between' }}>
            <PopupHeaderTitle>
              {dialogTitle}
            </PopupHeaderTitle>
            {isXs &&
              <PopupHeaderExtension>
                <IconButton
                  size={1}
                  color='white'
                  onClick={this.handleDialogClose}>
                  <Icon>
                    <IoMdClose />
                  </Icon>
                </IconButton>
              </PopupHeaderExtension>}
          </PopupHeader>
          <PopupBody>
            <React.Fragment>
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
            </React.Fragment>
          </PopupBody>
          <PopupFooter>
            <Flex
              parent
              justify='end'
              style={{ paddingBottom: 5 }}>
              <Button
                style={{ marginRight: 10 }}
                type='light'
                color='error'
                onClick={this.handleDialogClose}
                disabled={busy}
              >Vazgeç
              </Button>
              <Button
                type='filled'
                onClick={this.handleSubmit}
                disabled={busy}
              >{i18n[lang].create}
              </Button>
            </Flex>
          </PopupFooter>
        </Popup>
        <div className={classes.root}>
          <Button onClick={this.openCreateConfigSetDialog}>OPEN!</Button>
        </div>
        <List
          hoverable
          onSelect={(el, i) => {
            this.setState({
              selectedConfigSet: i
            })
          }}>
          {configSet.list.map(el => <ListItem key={el.name} itemId={el.name} selected={selectedConfigSet === el.name}>{el.name}</ListItem>)}
        </List>
        <List
          hoverable
          onSelect={(el, i) => {
            this.setState({
              selectedConfigSet: i
            })
          }}>
          {selectedConfigSet && configSet.list.filter(o => o.name === selectedConfigSet)[0].fields.map(el => <ListItem key={el.key} itemId={el.key} selected={selectedConfigSet === el.key}>{el.key}</ListItem>)}
        </List>
      </React.Fragment>
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
  configSet: PropTypes.object.isRequired
}

ConfigSetNew.defaultProps = {
  width: 'lg'
}

const styledAdminHome = withStyles(styles)(ConfigSetNew)

styledAdminHome.displayName = 'AdminHome'

module.exports = connect(state => ({
  userSession: state.userSession,
  width: state.width,
  lang: state.lang,
  configSet: state.configSet
}))(styledAdminHome)
