import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import Color from 'color'



const scalar = [0, 1, 2, 3]
const color = ['default', 'primary', 'secondary']


const radiusStyles = theme => scalar.reduce((acc, val) => {
  acc = {
    ...acc,
    [`radius-${val}`]: { borderRadius: theme.unit * val / 2 }
  }
  return acc
}, {})

const borderStyles = theme => scalar.reduce((acc, borderVal) => {
  acc = {
    ...acc,
    ...color.reduce((acc, colorVal) => {
      const calculatedColor = borderVal === 0 ? 'transparent' : (colorVal === 'default' ? Color(theme.color.text.normal).alpha(borderVal / 10).toString() :
        Color(theme.color[colorVal].normal).alpha(borderVal / 4).toString())
      acc = {
        ...acc,
        [`border-${borderVal}-${colorVal}`]: { borderColor: calculatedColor }
      }
      return acc
    }, {})
  }
  return acc
}, {})


const styles = theme => {
  return {
    root: {
      backgroundColor: theme.color.background.panel,
      borderStyle: 'solid',
      borderWidth: 1,
      width: props => props.width,
      height: props => props.height,
      overflow: 'hidden'
    },
    'img': {
      width: '100%',
      height: '100%'
    },
    ...borderStyles(theme),
    ...radiusStyles(theme),
    'root-rounded': {
      borderRadius: '50%'
    },
  }
}

const Image = props => {
  const {
    classes,
    className,
    border,
    radius,
    color,
    src,
    rounded,
    alt,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    width,
    height,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`border-${border}-${color}`]]: true,
    [classes[`radius-${radius}`]]: true,
    [classes['root-rounded']]: rounded,
    [className]: true
  })

  return (
    <div {...others} className={rootClasses}>
      <img className={classes['img']} src={src} alt={alt} />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  border: PropTypes.oneOf(scalar),
  radius: PropTypes.oneOf(scalar),
  color: PropTypes.oneOf(color),
  rounded: PropTypes.bool,
  alt: PropTypes.string,
}

Image.defaultProps = {
  className: '',
  border: 1,
  radius: 2,
  color: 'default',
  rounded: false,
  alt: ''
}

const styledPanel = withStyles(styles)(Image)

styledPanel.displayName = 'Panel'

export default styledPanel
