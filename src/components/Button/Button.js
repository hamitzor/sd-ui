const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childChecker = require('../../util/child-checker')
const Icon = require('../Icon')
const Spinner = require('../Spinner')

// Props of the component
const props = {
  type: ['light', 'filled', 'transparent'],
  color: ['darkgrey', 'primary', 'success', 'warning', 'error'],
  size: ['small', 'normal', 'big'],
  radiuse: [0, 1, 2, 3],
  justify: ['center', 'left', 'right'],
  disabled: ['enabled', 'disabled']
}

const sizeNumberMapping = { small: 1, normal: 2, big: 3 }

// Generate prop-related styles
const dynamicStyles = theme => ({
  ...props.type.reduce((acc, type) => ({
    ...acc,
    ...props.disabled.reduce((acc, disabled) => ({
      ...acc,
      ...props.color.reduce((acc, color) => {
        const style = { '&:hover': {}, '&:active': {} }
        if (type === 'light') {
          style.boxShadow = theme.shadow[1]
          style.color = disabled === 'enabled' ? theme.color[color].normal : theme.color[color].disabled
          style.backgroundColor = disabled === 'enabled' ? theme.color.grey.normal : theme.color.grey.disabled
          if (disabled === 'enabled') {
            style['&:hover'].backgroundColor = theme.color.grey.dark
            style['&:active'].backgroundColor = theme.color.grey.light
          }
        }
        else if (type === 'filled') {
          style.boxShadow = theme.shadow[2]
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
          [`button-color-${type}-${color}-${disabled}`]: style,
        }
      }, {})
    }), {})
  }), {}),
  ...props.size.reduce((acc, size) => ({
    ...acc,
    [`text-size-${size}`]: {
      fontSize: theme.text[size],
    },
    [`icon-size-${size}`]: {
      fontSize: theme.text[size] + 5
    }
  }), {}),
  ...props.size.reduce((acc, size) => {
    let buttonPadding = '0 8px', textPadding = '4px 0'
    if (size === 'normal') {
      buttonPadding = '0 11px'
      textPadding = '4px 0'
    }
    else if (size === 'big') {
      buttonPadding = '0 15px'
      textPadding = '5px 0'
    }
    return {
      ...acc,
      [`button-padding-${size}`]: {
        padding: buttonPadding
      },
      [`text-padding-${size}`]: {
        padding: textPadding
      }
    }
  }, {}),
  ...props.radiuse.reduce((acc, radius) => ({
    ...acc,
    [`button-radius-${radius}`]: {
      borderRadius: radius * 2
    }
  }), {}),
  ...props.justify.reduce((acc, justify) => ({
    ...acc,
    [`justify-${justify}`]: {
      justifyContent: justify
    }
  }), {}),
  disabled: {
    cursor: 'default'
  },
  'tail-icon': {
    marginLeft: theme.unit
  },
  'head-icon': {
    marginRight: theme.unit
  },
  'button-full-width': {
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
  }
})

// Generate static styles
const staticStyles = theme => ({
  '@keyframes spin': {
    from: { ...theme.transform('rotate(0deg)') },
    to: { ...theme.transform('rotate(360deg)') }
  },
  button: {
    display: 'inline-block',
    position: 'relative',
    textTransform: 'uppercase',
    border: 'none',
    fontFamily: 'inherit',
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
    padding: theme.unit / 2
  },
})

// Combine styles
const styles = theme => ({ ...staticStyles(theme), ...dynamicStyles(theme) })

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
    ...others
  } = props

  delete others.theme

  const { text, headIcons, tailIcons } = resolveChildren(children)
  const elementClasses = {
    button: classNames({
      [classes.button]: true,
      [classes[`button-color-${type}-${color}-${disabled || busy ? 'disabled' : 'enabled'}`]]: true,
      [classes.disabled]: disabled || busy,
      [classes[`button-padding-${size}`]]: text !== undefined,
      [classes[`button-radius-${radius}`]]: true,
      [classes['button-disabled']]: disabled,
      [classes['button-full-width']]: fullWidth,
      [classes['button-full-width']]: fullWidth,
      [className]: true
    }),
    headIcon: classNames({
      [classes.icon]: true,
      [classes[`icon-size-${size}`]]: true,
      [classes['head-icon']]: text !== undefined,
    }),
    tailIcon: classNames({
      [classes.icon]: true,
      [classes[`icon-size-${size}`]]: true,
      [classes['tail-icon']]: text !== undefined,
    }),
    content: classNames({
      [classes.content]: true,
      [classes[`justify-${justify}`]]: true,
      [contentClassName]: true
    }),
    buttonText: classNames({
      [classes.text]: text !== undefined,
      [classes[`text-size-${size}`]]: text !== undefined,
      [classes[`text-padding-${size}`]]: text !== undefined,
    })
  }

  return (
    <button ref={rootRef} {...others} className={elementClasses.button} disabled={disabled}>
      {badge}
      <div className={elementClasses.content}>
        <div className={classes['loader-container']}>
          <Spinner visible={busy} size={sizeNumberMapping[size]} color={color} />
        </div>
        {headIcons.length > 0 && <div className={elementClasses.headIcon}>{headIcons}</div>}
        {text && <div data-role="button-text" className={elementClasses.buttonText}>{text}</div>}
        {tailIcons.length > 0 && <div className={elementClasses.tailIcon}>{tailIcons}</div>}
      </div>
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: childChecker([{ type: 'Icon' }, { type: 'string' }]),
  contentClassName: PropTypes.string,
  type: PropTypes.oneOf(props.type),
  color: PropTypes.oneOf(props.color),
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  size: PropTypes.oneOf(props.size),
  radius: PropTypes.oneOf(props.radiuse),
  badge: childChecker([{ type: 'Badge', max: 1 }]),
  justify: PropTypes.oneOf(props.justify),
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

const StyledButton = withStyles(styles)(Button)

StyledButton.displayName = 'Button'

module.exports = StyledButton