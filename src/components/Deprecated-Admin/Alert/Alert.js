import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import PropTypes from 'prop-types'
import AlertContent from '../AlertContent'



const Alert = props => {

  const handleClose = (...args) => {
    if (props.onClose) {
      props.onClose(...args)
    }
  }

  const {
    anchorOrigin,
    open,
    autoHideDuration,
    variant,
    onClose,
    message,
  } = props

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <AlertContent
        onClose={onClose}
        variant={variant}
        message={message} />
    </Snackbar>
  )

}


Alert.propTypes = {
  anchorOrigin: PropTypes.object,
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.func,
  variant: PropTypes.string,
  message: PropTypes.string
}

Alert.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  open: false,
  autoHideDuration: 6000
}

export default Alert