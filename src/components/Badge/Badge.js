const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')

const colors = ['grey', 'darkgrey', 'primary', 'success', 'warning', 'error']

const colorClasses = theme => colors.reduce((acc, color) => ({
  ...acc,
  [`badge-color-${color}`]: {
    color: color === 'grey' ? theme.color.darkgrey.normal : theme.color.white,
    backgroundColor: color === 'grey' ? theme.color[color].dark : theme.color[color].normal
  }
}), {})

const styles = theme => {
  return {
    badge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: theme.unit * -2,
      right: theme.unit * -2,
      width: theme.unit * 5.3,
      height: theme.unit * 5.3,
      fontSize: 12,
      borderRadius: '50%',
      transition: theme.transition(['background']),
      cursor: 'initial',
      textTransform: 'none',
      fontWeight: 700
    },
    'badge-shine': {
      '-webkit-animation-name': `shine`,
      '-webkit-animation-duration': '1s',
      '-webkit-animation-iteration-count': 'infinite',
      '-webkit-animation-direction': 'alternate',
      '-webkit-animation-timing-function': 'ease-in-out',
      animationName: `shine`,
      animationDuration: '1s',
      animationIiterationCount: 'infinite',
      animationDirection: 'alternate',
      animationTimingFunction: 'ease-in-out'
    },
    '@keyframes shine': {
      from: { filter: 'brightness(1)', ...theme.transform('rotate(-15deg)') },
      to: { filter: 'brightness(1.2)', ...theme.transform('rotate(15deg)') },
    },
    ...colorClasses(theme)
  }
}

const Badge = props => {

  const {
    classes,
    color,
    className,
    value,
    maxValue,
    shine,
    ...others
  } = props

  delete props.theme

  const badgeClasses = classNames({
    [classes.badge]: true,
    [classes[`badge-color-${color}`]]: true,
    [classes['badge-shine']]: shine,
    [className]: true
  })

  return (
    <div className={badgeClasses} {...others}>
      {(maxValue && !isNaN(value) && parseInt(value) > maxValue) ? `${maxValue}+` : value}
    </div>
  )
}

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  color: PropTypes.oneOf(colors),
  value: PropTypes.string.isRequired,
  maxValue: PropTypes.number,
  shine: PropTypes.bool,
}

Badge.defaultProps = {
  className: '',
  color: 'warning',
  shine: false
}

const StyledBadge = withStyles(styles)(Badge)

StyledBadge.displayName = 'Badge'

module.exports = StyledBadge
