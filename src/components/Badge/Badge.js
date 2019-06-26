const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')



const color = ['default', 'primary', 'secondary', 'error']

const rootStyles = theme => color.reduce((colorAcc, colorVal) => {

  const calculatedColor = colorVal === 'default' ?
    theme.color.text.normal : theme.color[colorVal].normal

  const calculatedHoverColor = colorVal === 'default' ?
    theme.color.text.dark : theme.color[colorVal].dark

  const calculatedActiveColor = colorVal === 'default' ?
    theme.color.text.light : theme.color[colorVal].light

  colorAcc = {
    ...colorAcc,
    [`root-color-${colorVal}`]: {
      color: theme.color.white,
      backgroundColor: calculatedColor,
      '&:hover': {
        backgroundColor: calculatedHoverColor
      },
      '&:active': {
        backgroundColor: calculatedActiveColor,
      }
    },
    [`@keyframes shine-color-${colorVal}`]: {
      from: { filter: 'brightness(1)', ...theme.transform('rotate(-15deg)') },
      to: { filter: 'brightness(1.2)', ...theme.transform('rotate(15deg)') },
    },
    [`root-shine-color-${colorVal}`]: {
      '-webkit-animation-name': `shine-color-${colorVal}`, /* Safari 4.0 - 8.0 */
      animationName: `shine-color-${colorVal}`
    }
  }
  return colorAcc
}, {})

const styles = theme => {

  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: theme.unit * -2,
      right: theme.unit * -2,
      width: theme.unit * 5.2,
      height: theme.unit * 5.2,
      fontSize: '0.6rem',
      borderRadius: '50%',
      transition: theme.transition('background'),
      cursor: 'initial',
      textTransform: 'none'
    },
    'root-shine': {
      '-webkit-animation-duration': '1s',
      '-webkit-animation-iteration-count': 'infinite',
      '-webkit-animation-direction': 'alternate',
      '-webkit-animation-timing-function': 'ease-in-out',
      animationDuration: '1s',
      animationIiterationCount: 'infinite',
      animationDirection: 'alternate',
      animationTimingFunction: 'ease-in-out'
    },
    ...rootStyles(theme)
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
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`root-color-${color}`]]: true,
    [classes['root-shine']]: shine,
    [classes[`root-shine-color-${color}`]]: shine,
    [className]: true
  })

  let displayedValue = value

  if (maxValue && !isNaN(value) && parseInt(value) > maxValue) {
    displayedValue = `${maxValue}+`
  }

  return (
    <div {...others} className={rootClasses}>
      {displayedValue}
    </div>
  )
}

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(color),
  value: PropTypes.string.isRequired,
  maxValue: PropTypes.number,
  shine: PropTypes.bool,
}

Badge.defaultProps = {
  className: '',
  color: 'secondary',
  shine: false
}

const styledBadge = withStyles(styles)(Badge)

styledBadge.displayName = 'Badge'

module.exports = styledBadge
