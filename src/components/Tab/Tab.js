import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import Button from '../Button'


const color = ['default', 'primary', 'secondary']

const colorStyles = theme => color.reduce((acc, val) => {
  const calculatedColor = val === 'default' ? theme.color.text.normal : theme.color[val].normal
  acc = {
    ...acc,
    [`active-color-${val}`]: { borderTopColor: calculatedColor }
  }
  return acc
}, {})

const styles = theme => {
  return {
    root: {
      transition: theme.transition('all'),
      borderTop: '3px solid transparent',
      minWidth: theme.unit * 24,
      height: '100%'
    },
    content: {
      justifyContent: 'center'
    },
    ...colorStyles(theme)
  }
}

const handleClick = (e, props) => {
  props.onActive && props.onActive(e, props.tabId)
}

const Tab = props => {
  const {
    classes,
    className,
    children,
    color,
    active,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    tabId,
    onActive,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`active-color-${color}`]]: active,
    [className]: true
  })

  return (
    <Button {...others} className={rootClasses} radius={0} color={color} contentClassName={classes.content} onClick={(e) => { handleClick(e, props) }}>{children}</Button>
  )
}

Tab.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tabId: PropTypes.number.isRequired,
  color: PropTypes.oneOf(color),
  active: PropTypes.bool,
  onActive: PropTypes.func,
}

Tab.defaultProps = {
  className: '',
  color: 'primary',
  active: false
}

const styledTab = withStyles(styles)(Tab)

styledTab.displayName = 'Tab'

export default styledTab
