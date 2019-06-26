const React = require('react')
const Snackbar = require('@material-ui/core/Snackbar')
const PropTypes = require('prop-types')
const AlertContent = require('../AlertContent')



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