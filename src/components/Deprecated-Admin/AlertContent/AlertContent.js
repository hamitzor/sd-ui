const React = require('react')
const PropTypes = require('prop-types')
const classNames = require('classnames')
const CheckCircleIcon = require('@material-ui/icons/CheckCircle')
const ErrorIcon = require('@material-ui/icons/Error')
const InfoIcon = require('@material-ui/icons/Info')
const CloseIcon = require('@material-ui/icons/Close')
const green = require('@material-ui/core/colors/green')
const amber = require('@material-ui/core/colors/amber')
const IconButton = require('@material-ui/core/IconButton')
const SnackbarContent = require('@material-ui/core/SnackbarContent')
const WarningIcon = require('@material-ui/icons/Warning')
const { withStyles } = require('@material-ui/core/styles')

const iconVariantMap = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const AlertContent = props => {

  const handleClose = (...args) => {
    if (props.onClose) {
      props.onClose(...args)
    }
  }

  const { classes, className, message, variant } = props
  const Icon = iconVariantMap[variant]
  const rootClass = classes[variant]

  return (
    <SnackbarContent
      className={classNames(rootClass, className)}
      message={
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          color='inherit'
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  )
}


AlertContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.string,
}


AlertContent.defaultProps = {
  variant: 'success',
  message: 'Loading...'
}

export default withStyles(styles)(AlertContent)