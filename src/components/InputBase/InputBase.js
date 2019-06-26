const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')

const styles = theme => {
  return {
    root: {
      border: 'none',
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      color: theme.color.text.normal,
      fontSize: '1rem',
      '&:focus': {
        outline: 'none'
      },
      '&::-moz-focus-inner': {
        border: 0
      }
    },
    textarea: {
      resize: 'none',
      height: 'calc( 100% - 28px )',
      padding: 0,
      lineHeight: 'calc( 1em + 4px )'
    }
  }
}

const InputBase = props => {
  const {
    classes,
    element,
    type,
    disabled,
    value,
    onChange,
    className,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  return (
    element === 'input' ?
      <input
        spellCheck={false}
        onChange={onChange}
        className={classNames(
          classes.root,
          className
        )}
        disabled={disabled}
        type={type}
        value={value}
        {...others}
      /> :
      <textarea
        spellCheck={false}
        onChange={onChange}
        className={classNames(
          classes.root,
          classes.textarea,
          className
        )}
        disabled={disabled}
        value={value}
        {...others}
      />
  )
}

InputBase.propTypes = {
  classes: PropTypes.object.isRequired,
  element: PropTypes.oneOf(['textarea', 'input']),
  type: PropTypes.oneOf(['password', 'text']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

InputBase.defaultProps = {
  element: 'input',
  type: 'text',
  disabled: false
}

const styledInputBase = withStyles(styles)(InputBase)

styledInputBase.displayName = 'InputBase'

module.exports = styledInputBase
