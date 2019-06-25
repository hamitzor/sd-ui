import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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
        <InputLabel error={error} htmlFor="password-field">{!error ? 'Password' : 'Please enter password'}</InputLabel>
        <Input
          error={error}
          disabled={disabled}
          id="password-field"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position="end">
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