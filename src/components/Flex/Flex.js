const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const { breakpointNames } = require('../../theme/breakpoints')


const containerProps = {
  direction: ['row', 'row-r', 'column', 'column-r', 'initial', 'inherit'],
  wrap: ['nowrap', 'wrap', 'wrap-r', 'initial', 'inherit'],
  justify: ['start', 'end', 'center', 'between', 'around', 'initial', 'inherit'],
  alignItems: ['stretch', 'center', 'start', 'end', 'baseline', 'initial', 'inherit'],
  alignContent: ['stretch', 'center', 'start', 'end', 'between', 'around', 'initial', 'inherit'],
}

const itemProps = {
  size: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

const propNameToCssPropertyMap = Object.keys(containerProps).reduce((acc, propName) => ({
  ...acc, [propName]: propName
    .replace('direction', 'flexDirection')
    .replace('wrap', 'flexWrap')
    .replace('justify', 'justifyContent')
}), {})

const propValueToCssValueMap = Object.keys(containerProps).reduce((acc, propName) => ({
  ...acc,
  ...containerProps[propName].reduce((acc, value) => ({
    ...acc,
    [value]: value
      .replace('-r', '-reverse')
      .replace(/(start|end)/, `flex-${value}`)
      .replace(/(between|around)/, `space-${value}`)
  }), {})
}), {})

const parentEssentialClasses = () => Object.keys(containerProps).reduce((acc, propName) => ({
  ...acc,
  ...containerProps[propName].reduce((acc, val) => ({
    ...acc,
    [`${propName}-${val}`]: { [propNameToCssPropertyMap[propName]]: propValueToCssValueMap[val] }
  }), {})
}), {})

const itemClasses = theme => breakpointNames.reduce((acc, breakpoint) => ({
  ...acc,
  ...itemProps.size.reduce((acc, size) => ({
    ...acc,
    [`${breakpoint}-${size}`]: {
      [theme.bigger(breakpoint)]: {
        width: `${(size / 12 * 100).toFixed(6)}%`,
      }
    }
  }), {})
}), {})

const styles = theme => ({
  ...parentEssentialClasses(),
  ...itemClasses(theme),
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  'full-width': {
    width: '100%'
  },
  'full-height': {
    height: '100%'
  },
})

const Flex = props => {

  const {
    className,
    classes,
    children,
    container,
    item,
    direction,
    wrap,
    justify,
    alignItems,
    alignContent,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    fullHeight,
    fullWidth,
    ...others
  } = props

  delete others.theme

  const elementClasses = {
    flex: classNames(
      [
        className,
        classes[`direction-${direction}`],
        classes[`wrap-${wrap}`],
        classes[`justify-${justify}`],
        classes[`alignItems-${alignItems}`],
        classes[`alignContent-${alignContent}`],
      ],
      {
        [classes.container]: container,
        [classes[`xs-${xs}`]]: xs && item,
        [classes[`sm-${sm}`]]: sm && item,
        [classes[`md-${md}`]]: md && item,
        [classes[`lg-${lg}`]]: lg && item,
        [classes[`xl-${xl}`]]: xl && item,
        [classes[`xxl-${xxl}`]]: xxl && item,
        [classes['full-width']]: fullWidth || (container && !item),
        [classes['full-height']]: fullHeight
      })
  }
  return (
    <div className={elementClasses.flex} {...others}>
      {children}
    </div>
  )
}

Flex.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  container: PropTypes.bool,
  item: PropTypes.bool,
  direction: PropTypes.oneOf(containerProps.direction),
  wrap: PropTypes.oneOf(containerProps.wrap),
  justify: PropTypes.oneOf(containerProps.justify),
  alignItems: PropTypes.oneOf(containerProps.alignItems),
  alignContent: PropTypes.oneOf(containerProps.alignContent),
  xs: PropTypes.oneOf(itemProps.size),
  sm: PropTypes.oneOf(itemProps.size),
  md: PropTypes.oneOf(itemProps.size),
  lg: PropTypes.oneOf(itemProps.size),
  xl: PropTypes.oneOf(itemProps.size),
  xxl: PropTypes.oneOf(itemProps.size),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool
}

Flex.defaultProps = {
  className: '',
  children: null,
  container: false,
  item: false,
  direction: 'row',
  wrap: 'nowrap',
  justify: 'start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  fullHeight: false
}

const StyledFlex = withStyles(styles)(Flex)

StyledFlex.displayName = 'Flex'

module.exports = StyledFlex