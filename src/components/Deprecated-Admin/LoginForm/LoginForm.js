const React = require('react')
const PropTypes = require('prop-types')
const classNames = require('classnames')
const { withStyles } = require('@material-ui/core/styles')
const TextField = require('@material-ui/core/TextField')
const Grid = require('@material-ui/core/Grid')
const AccountCircle = require('@material-ui/icons/AccountCircle')
const Paper = require('@material-ui/core/Paper')
const VpnKey = require('@material-ui/icons/VpnKey')
const withContext = require('../../../context/adminContext')
const Button = require('@material-ui/core/Button')
const PasswordField = require('../PasswordField')
const Alert = require('../Alert')


//@TODO this regex will be used while registering new admins from the panel
//const passwordRegex = /^(?=^[a-zA-Z0-9\.\?\_\-\*]*$)(?=.*[\.\?\_\-\*])(?=^.{8,20}$).*$/


const styles = theme => {
  const { spacing: { unit } } = theme

  return {
    Paper: {
      width: '100%',
      paddingTop: unit * 6,
      paddingBottom: unit * 6

    },
    marginBottom: {
      marginBottom: unit * 2
    },
    marginTop: {
      marginTop: unit * 6
    },
    submitButton: {
      width: '100%'
    }
  }
}

const LoginForm = props => {

  const {
    busy,
    error,
    errorMessage,
    password,
    username,
    validUsername,
    validPassword,
    classes,
    onFocus,
    onChange,
    onKeyDown,
    onSubmit,
    onAlertClose
  } = props

  return (
    <Paper className={classes.Paper}>
      <Grid container justify='center'>
        <Grid item xs={11} sm={10} >
          <Grid container alignItems='flex-end' justify='center' className={classNames(classes.marginBottom)}>
            <Grid item xs={2}>
              <AccountCircle color='primary' />
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={busy}
                error={!validUsername}
                label={validUsername ? 'Username' : 'Please enter username'}
                onFocus={onFocus('username')}
                InputProps={{ spellCheck: false, autoComplete: 'off' }}
                value={username}
                onChange={onChange('username')}
                onKeyDown={onKeyDown}
              />
            </Grid>
          </Grid>
          <Grid container alignItems='flex-end' justify='center'>
            <Grid item xs={2}>
              <VpnKey color='primary' />
            </Grid>
            <Grid item xs={9}>
              <PasswordField
                error={!validPassword}
                value={password}
                onChange={onChange('password')}
                onFocus={onFocus('password')}
                onKeyDown={onKeyDown}
              />
            </Grid>
          </Grid>
          <Grid container alignItems='flex-end' justify='center'>
            <Grid item xs={6} className={classes.marginTop}>
              <Button
                disabled={busy}
                onClick={onSubmit}
                variant='contained'
                color='primary'
                className={classes.submitButton}>
                Login
              </Button>
              <Alert open={error} onClose={onAlertClose} message={errorMessage} variant='error' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )

}

LoginForm.propTypes = {
  formBusy: PropTypes.bool,
  validUsername: PropTypes.bool,
  validPassword: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  password: PropTypes.string,
  username: PropTypes.string,
  classes: PropTypes.object.isRequired,
  handleFocus: PropTypes.func,
  handleChange: PropTypes.func,
  handleInputKeyDown: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleAlertClose: PropTypes.func,
}

LoginForm.defaultProps = {
  formBusy: false,
  validUsername: true,
  validPassword: true,
  error: false,
  errorMessage: '',
  password: '',
  username: '',
  handleFocus: () => null,
  handleChange: () => null
}

export default withContext(withStyles(styles)(LoginForm))
