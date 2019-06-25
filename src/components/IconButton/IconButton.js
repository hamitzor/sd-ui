import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import childrenTypeChecker from '../../../custom_modules/children-type-checker'


const color = ['default', 'primary', 'secondary', 'error', 'white']
const size = [1, 2, 3]
const disabled = ['disabled', 'enabled']

const rootStyles = theme => color.reduce((colorAcc, colorVal) => {
  colorAcc = {
    ...colorAcc,
    ...disabled.reduce((disabledAcc, disabledVal) => {

      let styles = {}
      const calculatedColor = colorVal === 'default' ?
        (disabledVal === 'disabled' ? theme.color.text.disabled : theme.color.text.normal) :
        colorVal === 'white' ?
          (disabledVal === 'disabled' ? theme.color.grey[200] : theme.color.white) :
          (disabledVal === 'disabled' ? theme.color[colorVal].disabled : theme.color[colorVal].normal)

      const calculatedHoverColor = colorVal === 'default' ?
        theme.color.text.dark :
        colorVal === 'white' ?
          theme.color.grey[200] :
          theme.color[colorVal].dark

      const calculatedActiveColor = colorVal === 'default' ?
        theme.color.text.light :
        colorVal === 'white' ?
          theme.color.white :
          theme.color[colorVal].light

      styles.color = calculatedColor
      if (disabledVal !== 'disabled') {
        styles['&:hover'] = {
          color: calculatedHoverColor,
        }
        styles['&:active'] = {
          color: calculatedActiveColor,
        }
      }

      disabledAcc = {
        ...disabledAcc,
        [`root-${colorVal}-${disabledVal}`]: styles
      }
      return disabledAcc
    }, {})
  }
  return colorAcc
}, {})

const sizeStyles = size.reduce((acc, val) => {
  acc = {
    ...acc,
    [`root-size-${val}`]: {
      fontSize: `${0.9 + val / 3}rem`
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
      fontWeight: 'inherit',
      backgroundColor: 'transparent',
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
      cursor: 'not-allowed'
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
    ...rootStyles(theme),
    ...sizeStyles,
  }
}

const IconButton = props => {
  const {
    children,
    classes,
    color,
    disabled,
    size,
    className,
    contentClassName,
    badge,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`root-${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
    [classes[`root-size-${size}`]]: true,
    [classes['root-disabled']]: disabled,
    [className]: true
  })

  const contentClasses = classNames({
    [classes.content]: true,
    [contentClassName]: true
  })

  return (
    <button {...others} className={rootClasses} disabled={disabled}>
      {badge}
      <div className={contentClasses}>
        {children}
      </div>
    </button>
  )
}

IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: childrenTypeChecker({
    'Icon': [true, 1],
  }),
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  color: PropTypes.oneOf(color),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(size),
  badge: childrenTypeChecker({
    'Badge': [false, 1]
  }),
}

IconButton.defaultProps = {
  className: '',
  contentClassName: '',
  color: 'primary',
  size: 2,
  disabled: false
}

const styledButton = withStyles(styles)(IconButton)

styledButton.displayName = 'IconButton'

export default styledButton
