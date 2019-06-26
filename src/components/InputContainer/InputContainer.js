//@TODO: Will add disabled input features.

const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childrenTypeChecker = require('../../../custom_modules/children-type-checker')

const color = ['primary', 'secondary']
const type = ['default', 'pale', 'paler']


const focusedColorStyles = theme => color.reduce((acc, val) => {
  acc = {
    ...acc,
    [`focused-color-${val}`]: {
      color: theme.color[val].normal
    }
  }
  return acc
}, {})

const focusedBorderStyles = theme => color.reduce((acc, val) => {
  acc = {
    ...acc,
    [`focused-border-${val}`]: {
      borderWidth: 2,
      borderColor: theme.color[val].normal
    },
    [`focused-border-only-bottom-${val}`]: {
      borderBottomWidth: 2,
      borderBottomColor: theme.color[val].normal
    }
  }
  return acc
}, {})

const hoveredBackgroundStyles = theme => type.reduce((acc, val) => {

  const typeHoverBackgroundColorMap = {
    'default': 'transparent',
    'pale': theme.color.grey[100],
    'paler': theme.color.grey[200]
  }

  acc = {
    ...acc,
    [`hovered-background-${val}`]: {
      backgroundColor: `${typeHoverBackgroundColorMap[val]}!important`
    }
  }
  return acc
}, {})

const typeStyles = theme => type.reduce((acc, val) => {

  const typeBackgroundColorMap = {
    'default': 'transparent',
    'pale': theme.color.grey[50],
    'paler': theme.color.grey[100]
  }

  acc = {
    ...acc,
    [`type-${val}`]: {
      backgroundColor: typeBackgroundColorMap[val]
    }
  }
  return acc
}, {})

const styles = theme => {
  const { unit } = theme
  const width = unit * 60
  const leftWidth = unit * 2
  const borderRadius = unit
  const borderWidth = 1
  const labelFontSize = '.7rem'
  const labelMarginTop = '-.6rem'
  const descFontSize = '.7rem'
  const errorColor = 'tomato'
  const borderColor = 'rgba(0,0,0,0.3)'
  const labelColor = 'rgba(0,0,0,0.5)'
  const labelFontWeight = 500

  return {
    'root': {
      display: 'inline-block',
      marginTop: 5,
      width: width,

      fontWeight: 500
    },
    'root-full-width': {
      width: '100%'
    },
    'container': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderRadius: borderRadius
    },
    'left': {
      width: leftWidth,
      height: '100%',
      border: `${borderWidth}px solid ${borderColor}`,
      borderRight: 'none',
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      transition: theme.transition('border', 'color')
    },
    'right': {
      width: width - leftWidth,
      height: '100%',
      display: 'flex',
    },
    'right-full-width': {
      width: `calc( 100% - ${leftWidth}px )`
    },
    'label-container': {
      borderBottom: `${borderWidth}px solid ${borderColor}`,
      borderTop: `${borderWidth}px solid ${borderColor}`,
      transition: theme.transition('border', 'color'),
    },
    'label': {
      marginTop: labelMarginTop,
      fontSize: labelFontSize,
      maxWidth: width - leftWidth - 40,
      color: labelColor,
      fontWeight: labelFontWeight,
      whiteSpace: 'nowrap',
      paddingRight: 5,
      paddingLeft: 4,
      paddingTop: 2,
      borderRadius: borderRadius / 2,
      transition: theme.transition('opacity', 'color'),
      opacity: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    'label-show': {
      opacity: 1
    },
    'fake-placeholder': {
      fontSize: '1rem',
      position: 'absolute',
      zIndex: 5,
      color: labelColor,
      left: 0,
      right: 0,
      transition: theme.transition('opacity', 'color'),
      opacity: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    'fake-placeholder-multiple-row': {
      marginTop: 14
    },
    'fake-placeholder-hide': {
      opacity: 0
    },
    'grow': {
      flex: 1,
      border: `${borderWidth}px solid ${borderColor}`,
      borderLeft: 'none',
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      transition: theme.transition('border', 'color'),
    },
    'desc': {
      display: 'inline-block',
      fontSize: descFontSize,
      float: 'left',
      color: labelColor,
      paddingTop: theme.unit / 5 * 4,
      marginLeft: theme.unit,
      marginRight: theme.unit * 2,
      textAlign: 'left'
    },
    'error': {
      display: 'inline-block',
      fontSize: descFontSize,
      float: 'right',
      fontWeight: 500,
      paddingTop: theme.unit / 5 * 4,
      marginRight: theme.unit,
      marginLeft: theme.unit * 2,
      color: errorColor,
      textAlign: 'right'
    },
    'InputBase': {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      zIndex: 6,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    'InputBase-container': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      position: 'relative',
      flex: 1,

    },
    'InputBase-container-multiple-row': {
      alignItems: 'stretch',
    },
    'headExtensions': {
      //backgroundColor: 'lightgreen',
      height: 38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 5
    },
    'tailExtensions': {
      //backgroundColor: 'orange',
      height: 38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
      marginRight: 10
    },
    'controlsContainer': {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      height: '100%',
      left: 0,
      right: 0
    },
    'hovered-border': {
      borderColor: 'rgba(0,0,0,0.8)!important',
    },
    ...focusedBorderStyles(theme),
    ...focusedColorStyles(theme),
    ...hoveredBackgroundStyles(theme),
    ...typeStyles(theme),
    'label-container-hide': {
      borderTopColor: 'transparent'
    },
    'error-border': {
      borderColor: theme.color.error.normal,
      borderWidth: 2
    },
    'error-border-only-bottom': {
      borderBottomColor: theme.color.error.normal,
      borderBottomWidth: 2
    },
    'error-color': {
      color: theme.color.error.normal
    }
  }
}

const resolveChildren = (children, props) => {
  const headExtensions = []
  const tailExtensions = []
  let InputBase = undefined
  let inputProps = {}
  React.Children.forEach(children,
    (child, index) => {
      if (child) {
        const displayName = child.type.displayName

        if (displayName === 'InputExtension') {
          if (!InputBase) {
            headExtensions.push(<child.type key={`head-ext-${index}`} {...child.props}></child.type>)
          }
          else {
            tailExtensions.push(<child.type key={`head-ext-${index}`} {...child.props}></child.type>)
          }
        }
        else if (displayName === 'InputBase' && !InputBase) {
          inputProps = child.props
          InputBase = <child.type {...child.props} element={props.lineNumber > 1 ? 'textarea' : 'input'} ></child.type>
        }
      }
    }
  )

  return { headExtensions, tailExtensions, InputBase, inputProps }
}

class InputContainer extends React.Component {

  state = {
    focused: false,
    hovered: false,
  }


  render() {
    const {
      /* eslint-disable*/
      //Just to catch '...others' properly, theme prop is extracted.
      children,
      /* eslint-enable*/
      classes,
      color,
      type,
      fullWidth,
      label,
      desc,
      lineNumber,
      error,
      errorMessage,
      className,
      /* eslint-disable*/
      //Just to catch '...others' properly, theme prop is extracted.
      theme,
      /* eslint-enable*/
      ...others
    } = this.props

    const {
      focused,
      hovered
    } = this.state

    const { headExtensions, tailExtensions, InputBase, inputProps } = resolveChildren(children, this.props)

    const { value: inputValue } = inputProps

    const rootClasses = classNames({
      [classes['root']]: true,
      [classes['root-full-width']]: fullWidth,
      [className]: true
    })

    const containerClasses = classNames({
      [classes['container']]: true,
      [classes[`type-${type}`]]: true,
      [classes[`hovered-background-${type}`]]: hovered || inputValue.length > 1,
    })

    const fakePlaceholderClasses = classNames({
      [classes['fake-placeholder']]: true,
      [classes['fake-placeholder-hide']]: focused || inputValue.length > 1 || error,
      [classes['fake-placeholder-multiple-row']]: lineNumber > 1
    })

    const leftClasses = classNames({
      [classes['left']]: true,
      [classes['error-border']]: error,
      [classes[`focused-border-${color}`]]: focused || inputValue.length > 1,
      [classes['hovered-border']]: hovered && !focused && inputValue.length < 1 && !error
    })

    const rightClasses = classNames({
      [classes['right']]: true,
      [classes['right-full-width']]: fullWidth
    })

    const labelContainerClasses = classNames({
      [classes['label-container']]: true,
      [classes['error-border-only-bottom']]: error,
      [classes[`focused-border-only-bottom-${color}`]]: focused || inputValue.length > 1,
      [classes['hovered-border']]: hovered && !focused && inputValue.length < 1 && !error,
      [classes['label-container-hide']]: focused || inputValue.length > 1 || error
    })

    const labelClasses = classNames({
      [classes['label']]: true,
      [classes[`type-${type}`]]: true,
      [classes['error-color']]: error,
      [classes[`focused-color-${color}`]]: focused || inputValue.length > 1,
      [classes[`label-show`]]: focused || inputValue.length > 1 || error
    })

    const growClasses = classNames({
      [classes['grow']]: true,
      [classes['error-border']]: error,
      [classes[`focused-border-${color}`]]: focused || inputValue.length > 1,
      [classes['hovered-border']]: hovered && !focused && inputValue.length < 1 && !error
    })

    const descClasses = classNames({
      [classes.desc]: true
    })

    const errorClasses = classNames({
      [classes.error]: true
    })

    const inputBaseContainerClasses = classNames({
      [classes['InputBase-container']]: true,
      [classes['InputBase-container-multiple-row']]: lineNumber > 1
    })

    const controlsContainerClasses = classNames({
      [classes['controlsContainer']]: true
    })

    const headExtensionsClasses = classNames({
      [classes['headExtensions']]: true
    })

    const tailExtensionsClasses = classNames({
      [classes['tailExtensions']]: true
    })



    return (
      <div
        onFocus={() => { this.setState({ focused: true }) }}
        onBlur={() => { this.setState({ focused: false }) }}
        onMouseEnter={() => { this.setState({ hovered: true }) }}
        onMouseLeave={() => { this.setState({ hovered: false }) }}
        className={rootClasses}
        {...others}
      >
        <div style={{ height: `calc( (1em + 3px)*${lineNumber} + 32px )` }} className={containerClasses}>
          <div className={controlsContainerClasses}>
            <div className={headExtensionsClasses}>
              {headExtensions}
            </div>
            <div className={inputBaseContainerClasses}>
              <div className={fakePlaceholderClasses}>{label}</div>
              <div className={classes['InputBase']}>
                {InputBase}
              </div>
            </div>
            <div className={tailExtensionsClasses}>
              {tailExtensions}
            </div>
          </div>
          <div className={leftClasses} />
          <div className={rightClasses}>
            <div className={labelContainerClasses}>
              <div className={labelClasses}>{label}</div>
            </div>
            <div className={growClasses} />
          </div>
        </div>
        {!error && desc && <span className={descClasses}>{desc}</span>}
        {error && <span className={errorClasses}>{errorMessage}</span>}
      </div >
    )
  }
}


InputContainer.propTypes = {
  children: childrenTypeChecker({
    'InputBase': [true, 1],
    'InputExtension': [false]
  }),
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(color),
  type: PropTypes.oneOf(type),
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string,
  lineNumber: PropTypes.number,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
}

InputContainer.defaultProps = {
  color: 'primary',
  type: 'default',
  fullWidth: false,
  desc: '',
  lineNumber: 1,
  error: false,
  errorMessage: '',
  className: ''
}



const StyledInputContainer = withStyles(styles)(InputContainer)

StyledInputContainer.displayName = 'InputContainer'

module.exports = StyledInputContainer
/* eslint-enable */
