const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const { CSSTransition } = require('react-transition-group')
const Icon = require('../../components/Icon')
const { FaInfoCircle, FaExclamationCircle, FaCheckCircle, FaExclamation } = require('react-icons/fa')

// Props of the component
const props = {
  align: ['top', 'bottom', 'unset'],
  type: ['info', 'success', 'warning', 'error']
}

// Generate prop-related styles
const dynamicStyles = theme => ({
  ...props.align.reduce((acc, val) => ({
    ...acc,
    [`align-${val}`]: { [val !== 'unset' ? val : '']: theme.unit * 2 },
    [`align-${val}-full-width`]: { [val !== 'unset' ? val : '']: 0 },
  }), {}),
  ...props.type.reduce((acc, val) => ({
    ...acc, [`type-${val}`]: {
      color: val === 'info' ? theme.color.primary.normal : theme.color[val].normal
    }
  }), {}),
  'fixed': {
    position: 'fixed'
  },
  'absolute': {
    position: 'absolute'
  },
  'full-width': {
    borderRadius: 0,
    left: 0,
    right: 0,
    padding: `${theme.unit * 3}px ${theme.unit * 2}px`,
    boxShadow: theme.shadow[1],
    maxWidth: 'none'
  }
})

// Generate static styles
const staticStyles = theme => ({
  alert: {
    backgroundColor: theme.color.white,
    cursor: 'pointer',
    fontSize: theme.text.normal,
    padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
    borderRadius: theme.unit,
    boxShadow: theme.shadow[2],
    zIndex: theme.z.Alert,
    right: theme.unit * 3
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginLeft: 7
  },
  icon: {
    fontSize: 20
  }
})

// Generate animate related styles
const animateStyles = theme => ({
  'enter': {
    opacity: 0,
    transition: theme.transition()
  },
  'enter-active': {
    opacity: 1,
  },
  'exit': {
    opacity: 1,
    transition: theme.transition()
  },
  'exit-active': {
    opacity: 0,
  }
})

// Combine styles
const styles = theme => ({ ...staticStyles(theme), ...dynamicStyles(theme), ...animateStyles(theme) })

const Alert = props => {
  const {
    children,
    classes,
    className,
    open,
    fullWidth,
    animate,
    type,
    fixed,
    absolute,
    theme,
    ...others
  } = props

  const elementClasses = {
    alert: classNames({
      [classes.alert]: true,
      [classes['full-width']]: fullWidth,
      [classes[`type-${type}`]]: true,
      [classes[`align-${type === 'error' || type === 'info' ? 'top' : 'bottom'}-full-width`]]: fullWidth,
      [classes[`align-${type === 'error' || type === 'info' ? 'top' : 'bottom'}`]]: true,
      [classes.fixed]: fixed,
      [classes.absolute]: absolute,
      [className]: true
    })
  }

  const icons = {
    info: <FaInfoCircle className={classes.icon} />,
    success: <FaCheckCircle className={classes.icon} />,
    warning: <FaExclamation className={classes.icon} />,
    error: <FaExclamationCircle className={classes.icon} />
  }

  const alert = (
    <div className={elementClasses.alert} {...others}>
      <div className={classes.content}>
        <Icon>
          {icons[type]}
        </Icon>
        <div className={classes.text}>
          {children}
        </div>
      </div>
    </div>
  )

  const alertAnimateClasses = {
    enter: classes['enter'],
    enterActive: classes['enter-active'],
    exit: classes['exit'],
    exitActive: classes['exit-active']
  }

  return (
    animate ?
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={theme.duration}
        classNames={alertAnimateClasses}
      >
        {alert}
      </CSSTransition> : open && alert
  )
}

Alert.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool,
  fullWidth: PropTypes.bool,
  animate: PropTypes.bool,
  type: PropTypes.oneOf(props.type),
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
}

Alert.defaultProps = {
  className: '',
  open: false,
  fullWidth: false,
  animate: true,
  type: 'info',
  fixed: true,
  absolute: false
}

const StyledAlert = withStyles(styles)(Alert)

StyledAlert.displayName = 'Alert'

module.exports = StyledAlert