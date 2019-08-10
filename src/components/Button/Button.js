const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childChecker = require('../../util/child-checker')
const Icon = require('../Icon')
const types = ['light', 'filled', 'transparent']
const colors = ['darkgrey', 'primary', 'warning', 'error']
const sizes = ['small', 'normal', 'big']
const radiuses = [0, 1, 2, 3]
const justifies = ['center', 'left', 'right']
const disableds = ['enabled', 'disabled']


const colorClasses = theme => types.reduce((acc, type) => {
  return {
    ...acc,
    ...disableds.reduce((acc, disabled) => {
      return {
        ...acc,
        ...colors.reduce((acc, color) => {
          const style = { '&:hover': {}, '&:active': {} }
          if (type === 'light') {
            style.color = theme.color[color].normal
            style.backgroundColor = disabled === 'enabled' ? theme.color.grey.normal : theme.color.grey.disabled
            if (disabled === 'enabled') {
              style['&:hover'].backgroundColor = theme.color.grey.dark
              style['&:active'].backgroundColor = theme.color.grey.light
            }
          }
          else if (type === 'filled') {
            style.color = theme.color.white
            style.backgroundColor = disabled === 'enabled' ? theme.color[color].normal : theme.color[color].disabled
            if (disabled === 'enabled') {
              style['&:hover'].backgroundColor = theme.color[color].dark
              style['&:active'].backgroundColor = theme.color[color].light
            }
          }
          else {
            style.color = disabled === 'enabled' ? theme.color[color].normal : theme.color[color].disabled
            style.backgroundColor = 'transparent'
            if (disabled === 'enabled') {
              style['&:hover'].color = theme.color[color].light
              style['&:active'].color = theme.color[color].dark
            }
          }

          return {
            ...acc,
            [`root-color-${type}-${color}-${disabled}`]: style,
            [`loader-color-${color}`]: { borderColor: type === 'filled' ? theme.color.background : theme.color.grey.dark, borderTopColor: theme.color[color].normal }
          }
        }, {})
      }
    }, {})
  }
}, {})

const sizeStyles = theme => sizes.reduce((acc, size) => {
  let rootPadding = '0 8px', textPadding = '5px 0', loaderSize = theme.unit * 4
  if (size === 'normal') {
    rootPadding = '0 11px'
    textPadding = '5px 0'
    loaderSize = theme.unit * 6
  }
  else if (size === 'big') {
    rootPadding = '0 15px'
    textPadding = '6px 0'
    loaderSize = theme.unit * 7
  }
  return {
    ...acc,
    [`root-size-${size}`]: {
      padding: rootPadding
    },
    [`text-size-${size}`]: {
      fontSize: theme.text[size],
      padding: textPadding
    },
    [`icon-size-${size}`]: {
      fontSize: theme.text[size] + 7
    },
    [`loader-size-${size}`]: {
      width: loaderSize,
      height: loaderSize
    }
  }
}, {})

const radiusStyles = () => radiuses.reduce((acc, radius) => ({
  ...acc,
  [`root-radius-${radius}`]: {
    borderRadius: radius * 2
  }
}), {})

const alignStyles = () => justifies.reduce((acc, justify) => ({
  ...acc,
  [`justify-${justify}`]: {
    justifyContent: justify
  }
}), {})

const styles = theme => {
  return {
    '@keyframes spin': {
      from: { ...theme.transform('rotate(0deg)') },
      to: { ...theme.transform('rotate(360deg)') }
    },
    root: {
      display: 'inline-block',
      position: 'relative',
      textTransform: 'uppercase',
      border: 'none',
      fontFamily: 'inherit',
      fontWeight: 600,
      transition: theme.transition(['background', 'color']),
      cursor: 'pointer',
      padding: 0,
      '&:focus': {
        outline: 'none'
      },
      '&::-moz-focus-inner': {
        border: 0
      }
    },
    disabled: {
      cursor: 'default'
    },
    content: {
      display: 'flex',
      alignItems: 'center'
    },
    text: {
      display: 'inline-block',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
    },
    'tail-icon': {
      marginLeft: theme.unit
    },
    'head-icon': {
      marginRight: theme.unit
    },
    ...colorClasses(theme),
    ...sizeStyles(theme),
    ...radiusStyles(),
    ...alignStyles(),
    'root-full-width': {
      width: '100%'
    },
    'loader-container': {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    loader: {
      position: 'absolute',
      '-webkit-animation-name': 'spin',
      animationName: 'spin',
      '-webkit-animation-duration': '0.7s',
      '-webkit-animation-iteration-count': 'infinite',
      '-webkit-animation-timing-function': 'ease-in-out',
      animationDuration: '0.7s',
      animationIiterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
      borderWidth: 4,
      borderStyle: 'solid',
      borderRadius: '50%'
    }
  }
}

const resolveChildren = children => {
  const childList = Array.isArray(children) ? children : [children]
  return childList.reduce((acc, child) => {
    if (child) {
      const type = child.type ? child.type : typeof child
      if (type === Icon) {
        acc[acc.text ? 'headIcons' : 'tailIcons'].push(child)
      }
      else {
        acc.text = child
      }
    }
    return acc
  }, { headIcons: [], tailIcons: [] })
}

const Button = props => {
  const {
    classes,
    className,
    children,
    contentClassName,
    type,
    color,
    disabled,
    busy,
    size,
    radius,
    badge,
    justify,
    fullWidth,
    rootRef,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const { text, headIcons, tailIcons } = resolveChildren(children)
  const elClasses = {
    root: classNames({
      [classes.root]: true,
      [classes[`root-color-${type}-${color}-${disabled || busy ? 'disabled' : 'enabled'}`]]: true,
      [classes.disabled]: disabled || busy,
      [classes[`root-size-${size}`]]: true,
      [classes[`root-radius-${radius}`]]: true,
      [classes['root-disabled']]: disabled,
      [classes['root-full-width']]: fullWidth,
      [classes['root-full-width']]: fullWidth,
      [className]: true
    }),
    headIcon: classNames({
      [classes.icon]: true,
      [classes[`icon-size-${size}`]]: true,
      [classes['head-icon']]: true
    }),
    tailIcon: classNames({
      [classes.icon]: true,
      [classes[`icon-size-${size}`]]: true,
      [classes['tail-icon']]: true
    }),
    content: classNames({
      [classes.content]: true,
      [classes[`justify-${justify}`]]: true,
      [contentClassName]: true
    }),
    buttonText: classNames({
      [classes.text]: true,
      [classes[`text-size-${size}`]]: true
    }),
    loader: classNames({
      [classes.loader]: true,
      [classes[`loader-size-${size}`]]: true,
      [classes[`loader-color-${color}`]]: busy
    })
  }

  return (
    <button ref={rootRef} {...others} className={elClasses.root} disabled={disabled}>
      {badge}
      <div className={elClasses.content}>
        <div className={classes['loader-container']}>
          {busy && <div className={elClasses.loader}></div>}
        </div>
        <div className={elClasses.headIcon}>{headIcons}</div>
        <div data-role="button-text" className={elClasses.buttonText}>{text}</div>
        <div className={elClasses.tailIcon}>{tailIcons}</div>
      </div>
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: childChecker([{ type: 'Icon' }, { type: 'string', required: true }]),
  contentClassName: PropTypes.string,
  type: PropTypes.oneOf(types),
  color: PropTypes.oneOf(colors),
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  size: PropTypes.oneOf(sizes),
  radius: PropTypes.oneOf(radiuses),
  badge: childChecker([{ type: 'Badge', max: 1 }]),
  justify: PropTypes.oneOf(justifies),
  fullWidth: PropTypes.bool,
  rootRef: PropTypes.any
}

Button.defaultProps = {
  className: '',
  contentClassName: '',
  type: 'light',
  color: 'primary',
  disabled: false,
  busy: false,
  size: 'normal',
  radius: 2,
  justify: 'center',
  fullWidth: false,
  rootRef: null,
}

module.exports = withStyles(styles)(Button)