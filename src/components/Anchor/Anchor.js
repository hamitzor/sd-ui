const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childChecker = require('../../util/child-checker')


const colors = ['grey', 'darkgrey', 'primary', 'success', 'warning', 'error']
const disableds = ['enabled', 'disabled']


const colorClasses = theme => colors.reduce((acc, color) => ({
  ...acc,
  ...disableds.reduce((acc, disabled) => {
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
}), {})

const styles = theme => ({
  anchor: {
    display: 'inline-block',
    textDecoration: 'none'
  },
  'disabled': {
    pointerEvents: 'none',
  },
  ...colorClasses(theme)
})

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

  delete others['theme']

  const elementClasses = {
    anchor: classNames({
      [classes.anchor]: true,
      [classes[`${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
      [classes['disabled']]: disabled,
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
  className: PropTypes.string,
  color: PropTypes.oneOf(colors),
  disabled: PropTypes.bool,
  href: PropTypes.string.isRequired,
}

Anchor.defaultProps = {
  className: '',
  color: 'primary',
  disabled: false
}

const styledAnchor = withStyles(styles)(Anchor)

styledAnchor.displayName = 'Anchor'

module.exports = styledAnchor