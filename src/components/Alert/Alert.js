import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

const justify = ['left', 'right', 'unset']
const align = ['top', 'bottom', 'unset']
const color = ['primary', 'secondary', 'error']

const justifyStyles = theme => justify.reduce((acc, val) => {
  if (val !== 'unset') {
    acc = {
      ...acc,
      [`root-justify-${val}`]: {
        [val]: theme.unit * 5
      }
    }
  }
  return acc
}, {})

const alignStyles = theme => align.reduce((acc, val) => {
  if (val !== 'unset') {
    acc = {
      ...acc,
      [`root-align-${val}`]: {
        [val]: theme.unit * 5
      }
    }
  }
  return acc
}, {})


const colorStyles = theme => color.reduce((acc, val) => {
  acc = {
    ...acc,
    [`root-color-${val}`]: {
      backgroundColor: theme.color[val].normal
    }
  }
  return acc
}, {})


const styles = theme => {
  return {
    root: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: `${theme.unit * 2}px ${theme.unit * 4}px`,
      paddingRight: theme.unit * 2,
      borderRadius: theme.unit,
      boxShadow: theme.shadow[1],
      zIndex: theme.zIndex.Alert,
    },
    'root-fixed': {
      position: 'fixed'
    },
    'root-absolute': {
      position: 'absolute'
    },
    'root-enter': {
      opacity: 0,
      transition: theme.transition('all')
    },
    'root-enter-active': {
      opacity: 1,
    },
    'root-exit': {
      opacity: 1,
      transition: theme.transition('all')
    },
    'root-exit-active': {
      opacity: 0,
    },
    ...justifyStyles(theme),
    ...alignStyles(theme),
    ...colorStyles(theme),
    'root-full-width': {
      borderRadius: 0,
      left: 0,
      right: 0,
      top: 0,
      padding: `${theme.unit * 2}px ${theme.unit * 2}px`,
      maxWidth: 'none'
    },
  }
}

const Alert = props => {
  const {
    children,
    classes,
    className,
    open,
    fullWidth,
    animate,
    color,
    justify,
    align,
    fixed,
    absolute,
    /* eslint-disable */
    //Just to catch ...others properly, some props are extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes['root-full-width']]: fullWidth,
    [classes[`root-color-${color}`]]: true,
    [classes[`root-justify-${justify}`]]: true,
    [classes[`root-align-${align}`]]: true,
    [classes[`root-fixed`]]: fixed,
    [classes[`root-absolute`]]: absolute,
    [className]: true
  })


  const root = (
    <div {...others} className={rootClasses} >
      {children}
    </div>
  )

  const rootAnimateClasses = {
    enter: classes['root-enter'],
    enterActive: classes['root-enter-active'],
    exit: classes['root-exit'],
    exitActive: classes['root-exit-active']
  }

  return (
    animate ?
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={200}
        classNames={rootAnimateClasses}
      >
        {root}
      </CSSTransition> : open && root
  )
}

Alert.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool,
  fullWidth: PropTypes.bool,
  animate: PropTypes.bool,
  color: PropTypes.oneOf(color),
  justify: PropTypes.oneOf(justify),
  align: PropTypes.oneOf(align),
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
}

Alert.defaultProps = {
  className: '',
  open: false,
  fullWidth: false,
  animate: true,
  color: 'primary',
  justify: 'unset',
  align: 'unset',
  fixed: false,
  absolute: false
}

const styledAlert = withStyles(styles)(Alert)

styledAlert.displayName = 'Alert'

export default styledAlert