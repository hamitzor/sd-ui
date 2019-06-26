const React = require('react')
const FormControl = require('@material-ui/core/FormControl')
const InputLabel = require('@material-ui/core/InputLabel')
const Input = require('@material-ui/core/Input')
const InputAdornment = require('@material-ui/core/InputAdornment')
const IconButton = require('@material-ui/core/IconButton')
const Visibility = require('@material-ui/icons/Visibility')
const VisibilityOff = require('@material-ui/icons/VisibilityOff')
const { withStyles } = require('@material-ui/core/styles')
const PropTypes = require('prop-types')

const styles = theme => ({
  root: {

  }
})


class PasswordField extends React.Component {

  state = {
    show: false
  }

  handleShow = () => {
    this.setState(({ show }) => ({
      show: !show
    }))
  }

  render() {

    const {
      error,
      disabled,
      onFocus,
      onChange,
      onKeyDown,
      value
    } = this.props

    const {
      show
    } = this.state

    return (
      <FormControl>
        <InputLabel error={error} htmlFor='password-field'>{!error ? 'Password' : 'Please enter password'}</InputLabel>
        <Input
          error={error}
          disabled={disabled}
          id='password-field'
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={this.handleShow}>
                {show ? <Visibility color='primary' /> : <VisibilityOff color='primary' />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    )
  }
}

PasswordField.propTypes = {
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired
}

PasswordField.defaultProps = {
  error: false,
  disabled: false,
  value: '',
}

export default withStyles(styles)(PasswordField)