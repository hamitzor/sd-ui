import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'



const tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']
const size = ['small', 'normal', 'big']
const color = ['default', 'primary', 'secondary', 'error', 'white']


const colorStyles = theme => color.reduce((acc, val) => {
  const calculatedColor = val === 'default' ?
    theme.color.text.normal :
    val === 'white' ?
      theme.color.white :
      theme.color[val].normal
  acc = {
    ...acc,
    [`root-color-${val}`]: {
      color: calculatedColor
    }
  }
  return acc
}, {})

const sizeStyles = theme => size.reduce((acc, val) => {
  acc = {
    ...acc,
    [`root-size-${val}`]: { fontSize: theme.text[val] }
  }
  return acc
}, {})

const tagStyles = theme => tag.reduce((acc, val) => {
  if (val !== 'span' && val !== 'p') {
    acc = {
      ...acc,
      [`root-tag-${val}`]: { fontSize: theme.text[val] }
    }
  }
  return acc
}, {})


const styles = theme => {
  return {
    root: {
      margin: 0
    },
    uppercase: {
      textTransform: 'uppercase'
    },
    capitalize: {
      textTransform: 'capitalize'
    },
    lowercase: {
      textTransform: 'lowercase'
    },
    'margin-bottom': {
      marginBottom: theme.unit * 3
    },
    ...colorStyles(theme),
    ...sizeStyles(theme),
    ...tagStyles(theme),

  }
}

const Text = props => {
  const {
    classes,
    className,
    children,
    color,
    size,
    tag,
    uppercase,
    capitalize,
    lowercase,
    marginBottom,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`root-color-${color}`]]: true,
    [classes[`root-size-${size}`]]: true,
    [classes[`root-tag-${tag}`]]: true,
    [classes.uppercase]: uppercase,
    [classes.capitalize]: capitalize,
    [classes.lowercase]: lowercase,
    [classes['margin-bottom']]: marginBottom,
    [className]: true
  })

  return <props.tag {...others} className={rootClasses}>{children}</props.tag>

}

Text.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(color),
  size: PropTypes.oneOf(size),
  tag: PropTypes.oneOf(tag),
  uppercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  lowercase: PropTypes.bool,
  marginBottom: PropTypes.bool,
}

Text.defaultProps = {
  className: '',
  color: 'default',
  size: 'normal',
  tag: 'span',
  uppercase: false,
  capitalize: false,
  lowercase: false,
  marginBottom: false
}

const styledText = withStyles(styles)(Text)

styledText.displayName = 'Text'

export default styledText
