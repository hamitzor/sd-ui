const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const { CSSTransition } = require('react-transition-group')

const colors = ['darkgrey', 'primary', 'success', 'warning', 'error']
const sizes = Array.from(Array(19).keys()).map(size => size + 1)

const colorClasses = theme => colors.reduce((acc, color) => ({
  ...acc,
  [`spinner-${color}`]: {
    borderTopColor: theme.color[color].normal
  }
}), {})

const sizeClasses = theme => sizes.reduce((acc, size) => ({
  ...acc,
  [`spinner-${size}`]: {
    animation: `spin ${size / 50 + 0.8}s linear infinite`,
    width: 12 + size * theme.unit,
    height: 12 + size * theme.unit
  }
}), {})

const styles = theme => ({
  '@keyframes spin': {
    from: { ...theme.transform('rotate(0deg)') },
    to: { ...theme.transform('rotate(360deg)') }
  },
  spinner: {
    '-webkit-animation': 'spin 1s linear infinite',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: '50%',
    borderColor: theme.color.grey.dark
  },
  'spinner-enter': {
    opacity: 0,
  },
  'spinner-enter-active': {
    opacity: 1,
    transition: theme.transition()
  },
  'spinner-exit': {
    opacity: 1,
  },
  'spinner-exit-active': {
    opacity: 0,
    transition: theme.transition()
  },
  ...colorClasses(theme),
  ...sizeClasses(theme)
})

// eslint-disable-next-line no-unused-vars
const Spinner = ({ classes, animate, visible, color, size, theme, ...others }) => {
  const spinnerAnimateClasses = {
    enter: classes['spinner-enter'],
    enterActive: classes['spinner-enter-active'],
    exit: classes['spinner-exit'],
    exitActive: classes['spinner-exit-active']
  }
  const componentClasses = {
    spinner: classNames(classes.spinner, classes[`spinner-${color}`], classes[`spinner-${size}`])
  }

  const spinner = (
    <div className={componentClasses.spinner} {...others}></div>
  )

  return (
    animate ?
      <CSSTransition
        in={visible}
        timeout={theme.duration}
        unmountOnExit
        classNames={spinnerAnimateClasses}
      >
        {spinner}
      </CSSTransition> : (visible && spinner)
  )
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  visible: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  size: PropTypes.oneOf(sizes)
}

Spinner.defaultProps = {
  animate: true,
  visible: false,
  color: 'primary',
  size: 2
}

const styled = withStyles(styles)(Spinner)

styled.displayName = 'Snipper'

module.exports = styled