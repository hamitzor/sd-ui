import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import crypto from 'crypto'
import { FaRegCheckSquare, FaRegSquare, FaDotCircle, FaRegCircle } from 'react-icons/fa'


const color = ['default', 'primary', 'secondary']
const disabled = ['disabled', 'enabled']

const iconStyles = theme => [...color, 'error'].reduce((colorAcc, colorVal) => {
  colorAcc = {
    ...colorAcc,
    ...disabled.reduce((disabledAcc, disabledVal) => {

      let styles = {}
      const calculatedColor = colorVal === 'default' ?
        (disabledVal === 'disabled' ? theme.color.text.disabled : theme.color.text.normal) :
        (disabledVal === 'disabled' ? theme.color[colorVal].disabled : theme.color[colorVal].normal)

      const calculatedHoverColor = colorVal === 'default' ?
        (disabledVal === 'disabled' ? theme.color.text.disabled : theme.color.text.dark) :
        (disabledVal === 'disabled' ? theme.color[colorVal].disabled : theme.color[colorVal].dark)

      const calculatedActiveColor = colorVal === 'default' ?
        (disabledVal === 'disabled' ? theme.color.text.disabled : theme.color.text.light) :
        (disabledVal === 'disabled' ? theme.color[colorVal].disabled : theme.color[colorVal].light)

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
        [`icon-${colorVal}-${disabledVal}`]: styles
      }
      return disabledAcc
    }, {})
  }
  return colorAcc
}, {})


const styles = theme => {

  return {
    root: {
      display: 'inline-block',
      fontSize: '0.9rem'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: 20
    },
    input: {
      position: 'absolute',
      zIndex: -1,
      opacity: 0
    },
    icon: {
      fontSize: 20,
      cursor: 'pointer',
      transition: theme.transition('color'),
    },
    label: {
      paddingLeft: 5,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      minHeight: 20,
      lineHeight: '100%',
      color: theme.color.text.normal,
      cursor: 'pointer',
      transition: theme.transition('color'),
      '&:hover': {
        color: theme.color.text.light,
      },
      '&::selection': {
        backgroundColor: 'transparent'
      }
    },
    'label-disabled': {
      color: theme.color.text.disabled,
      '&:hover': {
        color: theme.color.text.disabled,
      },
      cursor: 'not-allowed',
    },
    error: {
      color: theme.color.error.normal,
      fontSize: '.7rem',
      marginTop: theme.unit / 2
    },
    ...iconStyles(theme)
  }
}

class Control extends React.Component {

  input = React.createRef()
  inputId = crypto.randomBytes(1).toString('hex')

  render() {
    const {
      classes,
      control,
      color,
      disabled,
      value,
      inputLabel,
      error,
      errorMessage,
      className,
      inputProps,
      checked,
      onChange,
      /* eslint-disable */
      //Just to catch ...others properly, theme prop is extracted.
      theme,
      /* eslint-enable */
      ...others
    } = this.props

    const rootClasses = classNames({
      [classes.root]: true,
      [classes['root-disabled']]: disabled,
      [className]: true
    })

    const labelClasses = classNames({
      [classes.label]: true,
      [classes[`label-disabled`]]: disabled,
    })

    const contentClasses = classNames({
      [classes.content]: true,
    })

    const inputClasses = classNames({
      [classes.input]: true,
    })

    const iconClasses = classNames({
      [classes.icon]: true,
      [classes[`icon-${color}-${disabled ? 'disabled' : 'enabled'}`]]: true,
      [classes[`icon-error-${disabled ? 'disabled' : 'enabled'}`]]: error
    })

    const errorClasses = classNames({
      [classes.error]: true
    })

    const ControlIcon = control === 'checkbox' ? (checked ? FaRegCheckSquare : FaRegSquare) :
      (checked ? FaDotCircle : FaRegCircle)

    return (
      <div {...others} className={rootClasses} >
        <div className={contentClasses}>
          {<label style={{ display: 'flex', alignItems: 'center' }} htmlFor={this.inputId}><ControlIcon className={iconClasses}></ControlIcon></label>}
          <input ref={this.input} name={name} disabled={disabled} className={inputClasses} onChange={onChange} checked={checked} id={this.inputId} {...inputProps} type={control} value={value} ></input>
          <label className={labelClasses} htmlFor={this.inputId} >{inputLabel}</label>
        </div>
        {error && <div className={errorClasses}>{errorMessage}</div>}
      </div>
    )
  }
}

Control.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  control: PropTypes.oneOf(['checkbox', 'radio']),
  color: PropTypes.oneOf(color),
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  inputLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ])
}

Control.defaultProps = {
  className: '',
  control: 'checkbox',
  color: 'primary',
  disabled: false,
  error: false,
  errorMessage: '',
  inputProps: {},
  inputLabel: '\u00A0',
}

const styledControl = withStyles(styles)(Control)

styledControl.displayName = 'Control'

export default styledControl
