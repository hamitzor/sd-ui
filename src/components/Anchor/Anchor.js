const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childChecker = require('../../util/child-checker')

// Props of the component
const props = {
  color: ['grey', 'darkgrey', 'primary', 'success', 'warning', 'error'],
  disabled: ['enabled', 'disabled']
}

// Generate prop-related styles
const dynamicStyles = theme => ({
  ...props.color.reduce((acc, color) => ({
    ...acc,
    ...props.disabled.reduce((acc, disabled) => {
      const styles = {}
      if (disabled !== 'disabled') {
        styles.color = theme.color[color].normal
        styles['&:hover'] = {
          color: theme.color[color].dark
        }
        styles['&:active'] = {
          color: theme.color[color].light
        }
      }
      else {
        styles.color = theme.color[color].disabled
      }

      return {
        ...acc,
        [`${color}-${disabled}`]: {
          ...styles,
          '& a': {
            ...styles
          }
        },
      }
    }, {})
  }), {}),
  'disabled': {
    pointerEvents: 'none',
  }
})

// Generate static styles
const staticStyles = () => ({
  anchor: {
    display: 'inline-block',
    textDecoration: 'none'
  }
})

// Combine styles
const styles = theme => ({ ...staticStyles(), ...dynamicStyles(theme) })

const Anchor = props => {
  const {
    children,
    classes,
    color,
    disabled,
    className,
    href,
    ...others
  } = props

  delete others.theme

  const elementClasses = {
    anchor: classNames({
      [classes.anchor]: true,
      [classes[`${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
      [classes.disabled]: disabled,
      [className]: true
    })
  }

  return (
    typeof children !== 'string' ?
      <span {...others} className={elementClasses.anchor}>
        {children}
      </span> :
      <a href={href} {...others} className={elementClasses.anchor}>
        {children}
      </a>
  )
}

Anchor.propTypes = {
  classes: PropTypes.object.isRequired,
  children: childChecker([{ type: 'string' }, { type: 'a' }]),
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(props.color),
  disabled: PropTypes.bool
}

Anchor.defaultProps = {
  className: '',
  color: 'primary',
  disabled: false
}

const StyledAnchor = withStyles(styles)(Anchor)

StyledAnchor.displayName = 'Anchor'

module.exports = StyledAnchor