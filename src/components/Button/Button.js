const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childrenTypeChecker = require('../../../custom_modules/children-type-checker')



const type = ['light', 'outlined', 'filled', 'transparent']
const color = ['default', 'primary', 'secondary', 'error']
const size = [1, 2, 3]
const radius = [0, 1, 2, 3]
const disabled = ['disabled', 'enabled']
const align = ['center', 'left', 'right']


const rootStyles = theme => type.reduce((rootAcc, typeVal) => {
  rootAcc = {
    ...rootAcc,
    ...color.reduce((colorAcc, colorVal) => {
      colorAcc = {
        ...colorAcc,
        ...disabled.reduce((disabledAcc, disabledVal) => {

          let styles = {}
          const calculatedColor = colorVal === 'default' ?
            (disabledVal === 'disabled' ? theme.color.text.disabled : theme.color.text.normal) :
            (disabledVal === 'disabled' ? theme.color[colorVal].disabled : theme.color[colorVal].normal)

          const calculatedHoverColor = colorVal === 'default' ?
            theme.color.text.dark :
            theme.color[colorVal].dark

          const calculatedActiveColor = colorVal === 'default' ?
            theme.color.text.light :
            theme.color[colorVal].light


          if (typeVal === 'outlined') {
            styles.color = calculatedColor
            styles.border = `2px solid ${calculatedColor}`
            styles.backgroundColor = theme.color.white
            if (disabledVal !== 'disabled') {
              styles['&:hover'] = {
                color: calculatedHoverColor,
                border: `2px solid ${calculatedHoverColor}`
              }
              styles['&:active'] = {
                color: calculatedActiveColor,
                border: `2px solid ${calculatedActiveColor}`
              }
            }

          }
          else if (typeVal === 'light') {
            styles.color = calculatedColor
            styles.backgroundColor = theme.color.grey[200]
            if (disabledVal !== 'disabled') {
              styles['&:hover'] = {
                backgroundColor: theme.color.grey[300],
              }
              styles['&:active'] = {
                backgroundColor: theme.color.grey[200],
              }
            }
          }
          else if (typeVal === 'transparent') {
            styles.color = calculatedColor
            styles.backgroundColor = 'rgba(0,0,0,0)'
            if (disabledVal !== 'disabled') {
              styles['&:hover'] = {
                backgroundColor: 'rgba(0,0,0,0.08)',
              }
              styles['&:active'] = {
                backgroundColor: 'rgba(0,0,0,0)',
              }
            }
          }
          else {
            styles.color = theme.color.white
            styles.backgroundColor = calculatedColor
            if (disabledVal !== 'disabled') {
              styles['&:hover'] = {
                backgroundColor: calculatedHoverColor,
              }
              styles['&:active'] = {
                backgroundColor: calculatedActiveColor,
              }
            }
          }

          disabledAcc = {
            ...disabledAcc,
            [`root-${typeVal}-${colorVal}-${disabledVal}`]: styles
          }
          return disabledAcc
        }, {})
      }
      return colorAcc
    }, {})
  }

  return rootAcc
}, {})

const sizeStyles = theme => size.reduce((acc, val) => {
  acc = {
    ...acc,
    [`root-size-${val}`]: {
      paddingRight: theme.unit * val * 2,
      paddingLeft: theme.unit * val * 2,
    },
    [`Text-size-${val}`]: {
      paddingTop: theme.unit * val / 1.4 + 5,
      paddingBottom: theme.unit * val / 1.4 + 5,
      fontSize: `${0.7 + val / 9}rem`
    },
    [`Icon-size-${val}`]: {
      fontSize: `${1 + val / 5 - 0.2}rem`
    },
  }
  return acc
}, {})

const radiusStyles = theme => radius.reduce((acc, val) => {
  acc = {
    ...acc,
    [`root-radius-${val}`]: {
      borderRadius: theme.unit * val / 2
    }
  }
  return acc
}, {})

const alignStyles = () => align.reduce((acc, val) => {
  acc = {
    ...acc,
    [`content-align-${val}`]: {
      justifyContent: val
    }
  }
  return acc
}, {})


const styles = theme => {

  return {
    root: {
      display: 'inline-block',
      position: 'relative',
      textTransform: 'uppercase',
      border: 'none',
      fontFamily: 'inherit',
      fontWeight: 600,
      transition: theme.transition('background'),
      cursor: 'pointer',
      padding: 0,
      '&:focus': {
        outline: 'none'
      },
      '&::-moz-focus-inner': {
        border: 0
      }
    },
    'root-disabled': {
      cursor: 'default'
    },
    content: {
      display: 'flex',
      alignItems: 'center'
    },
    Text: {
      display: 'inline-block',
    },
    Icon: {
      display: 'flex',
      alignItems: 'center',
    },
    'head-icon': {
      marginRight: theme.unit
    },
    'tail-icon': {
      marginLeft: theme.unit
    },
    ...rootStyles(theme),
    ...sizeStyles(theme),
    ...radiusStyles(theme),
    ...alignStyles(),
    'root-full-width': {
      width: '100%'
    }
  }
}

const resolveChildren = (children) => {
  const headIcons = []
  const tailIcons = []
  let Text = undefined
  React.Children.forEach(children,
    (child, index) => {
      if (child) {

        const displayName = typeof child === 'string' ? 'Text' : child.type.displayName

        if (displayName === 'Icon') {
          if (!Text) {
            headIcons.push(<child.type key={`head-icon-${index}`} {...child.props}></child.type>)
          }
          else {
            tailIcons.push(<child.type key={`head-icon-${index}`} {...child.props}></child.type>)
          }
        }
        else if (displayName === 'Text' && !Text) {
          Text = child
        }
      }
    }
  )

  return { headIcons, tailIcons, Text }
}

const Button = props => {
  const {
    children,
    classes,
    type,
    color,
    disabled,
    size,
    radius,
    className,
    contentClassName,
    badge,
    justifyContent,
    fullWidth,
    rootRef,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const { Text, headIcons, tailIcons } = resolveChildren(children)

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`root-${type}-${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
    [classes[`root-size-${size}`]]: true,
    [classes[`root-radius-${radius}`]]: true,
    [classes['root-disabled']]: disabled,
    [classes['root-full-width']]: fullWidth,
    [className]: true
  })


  const headIconClasses = classNames({
    [classes.Icon]: true,
    [classes[`Icon-size-${size}`]]: true,
    [classes['head-icon']]: true
  })

  const tailIconClasses = classNames({
    [classes.Icon]: true,
    [classes[`Icon-size-${size}`]]: true,
    [classes['tail-icon']]: true
  })

  const TextClasses = classNames({
    [classes.Text]: true,
    [classes[`Text-size-${size}`]]: true
  })

  const contentClasses = classNames({
    [classes.content]: true,
    [classes[`content-align-${justifyContent}`]]: true,
    [contentClassName]: true
  })

  return (
    <button ref={rootRef} {...others} className={rootClasses} disabled={disabled}>
      {badge}
      <div className={contentClasses}>
        {[
          headIcons.length > 0 && <div className={headIconClasses} key='first-icons'>{headIcons}</div>,
          <div className={`BUTTON_TEXT ${TextClasses}`} key='text'>{Text}</div>,
          tailIcons.length > 0 && <div className={tailIconClasses} key='last-icons'>{tailIcons}</div>
        ]}
      </div>
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: childrenTypeChecker({
    'Icon': [false],
    'string': [true]
  }),
  contentClassName: PropTypes.string,
  type: PropTypes.oneOf(type),
  color: PropTypes.oneOf(color),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(size),
  radius: PropTypes.oneOf(radius),
  badge: childrenTypeChecker({
    'Badge': [false, 1]
  }),
  justifyContent: PropTypes.oneOf(align),
  fullWidth: PropTypes.bool,
  rootRef: PropTypes.any,
}

Button.defaultProps = {
  className: '',
  contentClassName: '',
  type: 'light',
  color: 'primary',
  size: 2,
  disabled: false,
  radius: 2,
  justifyContent: 'center',
  fullWidth: false,
}

const styledButton = withStyles(styles)(Button)

styledButton.displayName = 'Button'

module.exports = styledButton
