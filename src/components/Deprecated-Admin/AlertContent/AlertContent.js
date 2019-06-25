import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core/styles'

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
          key="close"
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