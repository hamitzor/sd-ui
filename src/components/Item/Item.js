const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const { breakpointNames } = require('../../theme/breakpoints')

const propCssValueMap = (val) => {
  if (typeof val === 'string') {
    if (val.includes('-r')) {
      return val.replace('-r', '-reverse')
    }
    if (val.includes('start') || val.includes('end')) {
      return `flex-${val}`
    }
    if (val.includes('between') || val.includes('around')) {
      return `space-${val}`
    }
  }

  return val
}

const propCssPropertyMap = (val) => {
  if (typeof val === 'string') {
    if (val.includes('direction')) {
      return 'flexDirection'
    }
    if (val.includes('wrap')) {
      return 'flexWrap'
    }
    if (val.includes('justify')) {
      return 'justifyContent'
    }
  }
  return val
}


const parentProps = {
  spacing: [0, 1, 2, 3],
  direction: ['row', 'row-r', 'column', 'column-r', 'initial', 'inherit'],
  wrap: ['nowrap', 'wrap', 'wrap-r', 'initial', 'inherit'],
  justify: ['start', 'end', 'center', 'between', 'around', 'initial', 'inherit'],
  alignItems: ['stretch', 'center', 'start', 'end', 'baseline', 'initial', 'inherit'],
  alignContent: ['stretch', 'center', 'start', 'end', 'between', 'around', 'initial', 'inherit'],
}

const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


const spacingClasses = theme => parentProps.spacing.reduce((acc, val) => ({
  ...acc,
  [`spacing-${val}`]: { paddingLeft: theme.unit * val * 2 }
}), {})


const parentClasses = () => Object.keys(parentProps).reduce((acc, propName) => {
  if (propName !== 'spacing') {
    acc = {
      ...acc,
      ...parentProps[propName].reduce((acc, val) => {
        acc = {
          ...acc,
          [`${propName}-${val}`]: { [propCssPropertyMap(propName)]: propCssValueMap(val) }
        }
        return acc
      }, {})
    }
  }
  return acc
}, {})

const childClasses = theme => breakpointNames.reduce((acc, breakpointName) => ({
  ...acc,
  ...sizes.reduce((acc, size) => ({
    ...acc,
    ...parentProps.spacing.reduce((acc, spacing) => ({
      ...acc,
      [`${breakpointName}-${size}-spacing-${spacing}`]:
      {
        [theme.bigger(breakpointName)]:
        {
          width: `calc( ${(size / 12 * 100).toFixed(6)}% - ${theme.unit * 2 * spacing}px )`,
          marginRight: theme.unit * 2 * spacing
        }
      }
    }), {})
  }), {})
}), {})

const styles = theme => {
  return {
    flex: {
      display: 'flex',
    },
    'full-width': {
      width: '100%'
    },
    'full-height': {
      height: '100%'
    },
    ...spacingClasses(theme),
    ...parentClasses(),
    ...childClasses(theme)
  }
}

const Flex = props => {

  const {
    className,
    classes,
    children,
    parent,
    spacing,
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

  delete others['theme']

  const essentialProps = { spacing, direction, wrap, justify, alignItems, alignContent, xs, sm, md, lg, xl, xxl }

  const parentClassName = classNames(
    classes.flex,
    ...['direction', 'wrap', 'justify', 'alignItems', 'alignContent', 'spacing'].map(val => {
      return classes[`${val}-${essentialProps[val]}`]
    }),
    {
      [classes['full-width']]: fullWidth
    }
  )

  const childClassName = classNames(
    ...breakpointNames.map(val => {
      const propVal = essentialProps[val]
      return propVal ? classes[`${val}-${propVal}-spacing-${spacing}`] : ''
    })
  )

  const defaultClassName = parent ? parentClassName : childClassName

  const rootClasses = classNames({
    [defaultClassName]: true,
    [className]: true,
    [classes['full-height']]: fullHeight
  })

  return (
    <div className={rootClasses} {...others}>
      {parent ? typeof children === 'string' ? <div>{children}</div> :
        React.Children.map(children, child =>
          child &&
          (child.type.displayName === 'Flex' ? <child.type {...child.props} spacing={spacing}></child.type> :
            child)
        )
        : children
      }
    </div>
  )
}

Flex.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  parent: function (props, propName) {
    if (props[propName] && (Object.keys(props).find(prop => breakpointNames.find(bp => bp === prop)) || typeof props[propName] !== 'boolean')) {
      return new Error('xs,sm,md,lg,xl and xxl can be used only in child Flex')
    }
  },
  spacing: PropTypes.oneOf(parentProps.spacing),
  direction: PropTypes.oneOf(parentProps.direction),
  wrap: PropTypes.oneOf(parentProps.wrap),
  justify: PropTypes.oneOf(parentProps.justify),
  alignItems: PropTypes.oneOf(parentProps.alignItems),
  alignContent: PropTypes.oneOf(parentProps.alignContent),
  xs: PropTypes.oneOf(sizes),
  sm: PropTypes.oneOf(sizes),
  md: PropTypes.oneOf(sizes),
  lg: PropTypes.oneOf(sizes),
  xl: PropTypes.oneOf(sizes),
  xxl: PropTypes.oneOf(sizes),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

Flex.defaultProps = {
  className: '',
  children: null,
  parent: false,
  direction: 'row',
  spacing: 0,
  wrap: 'wrap',
  justify: 'start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  fullHeight: false,
  fullWidth: true
}

const styled = withStyles(styles)(Flex)

styled.displayName = 'Flex'

module.exports = styled