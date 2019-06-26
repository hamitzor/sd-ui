const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')


const color = ['default', 'primary', 'secondary', 'error', 'white']
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
        styles['&:visited'] = {
          color: calculatedColor,
        }
      }

      disabledAcc = {
        ...disabledAcc,
        [`root-${colorVal}-${disabledVal}`]: {
          ...styles,
          '& a': {
            ...styles
          }
        },
      }
      return disabledAcc
    }, {})
  }
  return colorAcc
}, {})


const styles = theme => {

  return {
    root: {

    },
    'root-disabled': {
      pointerEvents: 'none',
    },
    ...rootStyles(theme)
  }
}

const Anchor = props => {
  const {
    children,
    classes,
    color,
    disabled,
    className,
    href,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`root-${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
    [classes['root-disabled']]: disabled,
    [className]: true
  })

  return (
    typeof children !== 'string' ?
      <span {...others} className={rootClasses}>
        {children}
      </span> :
      <a href={href} {...others} className={rootClasses}>
        {children}
      </a>
  )
}

Anchor.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(color),
  disabled: PropTypes.bool,
  href: PropTypes.string,
}

Anchor.defaultProps = {
  className: '',
  color: 'primary',
  disabled: false
}

const styledAnchor = withStyles(styles)(Anchor)

styledAnchor.displayName = 'Anchor'

module.exports = styledAnchor
