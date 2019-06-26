const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')



const scalar = [0, 1, 2, 3]
const color = ['default', 'primary', 'secondary']


const paddingStyles = theme => scalar.reduce((acc, val) => {
  acc = {
    ...acc,
    [`padding-${val}`]: { padding: `${theme.unit * val * 2}px ${theme.unit * val * 3}px` }
  }
  return acc
}, {})

const radiusStyles = theme => scalar.reduce((acc, val) => {
  acc = {
    ...acc,
    [`radius-${val}`]: { borderRadius: theme.unit * val / 2 }
  }
  return acc
}, {})


const styles = theme => {
  return {
    root: {
      backgroundColor: theme.color.background.panel,
      borderStyle: 'solid',
      borderColor: 'rgba(66, 66, 66, 0.08333333333333333)',
      borderWidth: 1
    },
    'root-no-border': {
      borderWidth: 0
    },
    'root-full-height': {
      height: '100%'
    },
    ...paddingStyles(theme),
    ...radiusStyles(theme)
  }
}

const Panel = props => {
  const {
    classes,
    className,
    children,
    padding,
    noBorder,
    radius,
    color,
    fullHeight,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes[`padding-${padding}`]]: true,
    [classes['root-no-border']]: noBorder,
    [classes[`radius-${radius}`]]: true,
    [classes['root-full-height']]: fullHeight,
    [className]: true
  })

  return (
    <div {...others} className={rootClasses}>{children}</div>
  )
}

Panel.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(scalar),
  noBorder: PropTypes.bool,
  radius: PropTypes.oneOf(scalar),
  color: PropTypes.oneOf(color),
  fullHeight: PropTypes.bool,
}

Panel.defaultProps = {
  className: '',
  padding: 1,
  noBorder: false,
  radius: 2,
  color: 'default',
  fullHeight: false
}

const styledPanel = withStyles(styles)(Panel)

styledPanel.displayName = 'Panel'

module.exports = styledPanel
