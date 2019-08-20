const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const { MdDone, MdFiberManualRecord } = require('react-icons/md')

// Props of the component
const props = {
  kind: ['radio', 'checkbox'],
  color: ['darkgrey', 'primary', 'success', 'warning', 'error'],
  disabled: ['disabled', 'enabled']
}

// Generate prop-related styles
const dynamicStyles = theme => ({
  ...props.color.reduce((acc, color) => ({
    ...acc,
    ...props.disabled.reduce((acc, disabled) => {
      const styles = {}

      if (disabled !== 'disabled') {
        styles.color = theme.color[color].normal
        styles.borderColor = theme.color[color].normal
        styles['&:hover'] = {
          color: theme.color[color].dark
        }
        styles['&:active'] = {
          color: theme.color[color].light
        }
      }
      else {
        styles.color = theme.color[color].disabled
        styles.borderColor = theme.color[color].disabled
      }

      return {
        ...acc,
        [`${color}-${disabled}`]: styles
      }
    }, {})
  }), {}),
  ...props.kind.reduce((acc, kind) => ({
    ...acc,
    [kind]: {
      borderRadius: kind === 'radio' ? '50%' : 2
    }
  }), {}),
  disabled: {
    pointerEvents: 'none'
  },
  'not-checked': {
    color: 'transparent',
    '&:hover': {
      color: 'transparent'
    },
    '&:active': {
      color: 'transparent'
    }
  }
})

// Generate static styles
const staticStyles = theme => ({
  container: {
    display: 'inline-block',
    width: theme.unit * 4,
    height: theme.unit * 4
  },
  control: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    transition: theme.transition(['color']),
    cursor: 'pointer'
  },
  icon: {
    fontSize: 18
  }
})

// Combine styles
const styles = theme => ({ ...staticStyles(theme), ...dynamicStyles(theme), })

const Control = props => {

  const {
    classes,
    kind,
    color,
    disabled,
    className,
    checked,
    ...others
  } = props

  delete others.theme

  const elementClasses = {
    container: classNames({
      [classes.container]: true,
      [classes.disabled]: disabled
    }),
    control: classNames({
      [classes.control]: true,
      [classes[`${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
      [className]: true,
      [classes['not-checked']]: !checked,
      [classes[kind]]: true
    })
  }
  return (
    <div className={elementClasses.container} {...others}>
      <div className={elementClasses.control}>
        {kind === 'radio' ? <MdFiberManualRecord className={classes.icon} /> : <MdDone className={classes.icon} />}
      </div>
    </div>
  )
}

Control.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  kind: PropTypes.oneOf(props.kind),
  color: PropTypes.oneOf(props.color),
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
}

Control.defaultProps = {
  className: '',
  kind: 'checkbox',
  color: 'primary',
  disabled: false,
}

const StyledControl = withStyles(styles)(Control)

StyledControl.displayName = 'Control'

module.exports = StyledControl
