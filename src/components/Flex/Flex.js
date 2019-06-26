const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const { breakpointNames } = require('../../theme/breakpoints')

const propToCssValue = (val) => {
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

const propToCssProperty = (val) => {
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

const size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


const spacingStyles = theme => parentProps.spacing.reduce((acc, val) => {
  acc = {
    ...acc,
    [`spacing-${val}`]: { paddingLeft: theme.unit * val * 2 }
  }
  return acc
}, {})


const parentStyles = () => Object.keys(parentProps).reduce((propAcc, propName) => {
  if (propName !== 'spacing') {
    propAcc = {
      ...propAcc,
      ...parentProps[propName].reduce((classAcc, val) => {
        classAcc = {
          ...classAcc,
          [`${propName}-${val}`]: { [propToCssProperty(propName)]: propToCssValue(val) }
        }
        return classAcc
      }, {})
    }
  }
  return propAcc
}, {})


const childStyles = theme => breakpointNames.reduce((propAcc, breakpoint) => {
  propAcc = {
    ...propAcc,
    ...size.reduce((classAcc, val) => {
      classAcc = {
        ...classAcc,
        ...parentProps.spacing.reduce((spacingAcc, spacing) => {
          spacingAcc = {
            ...spacingAcc,
            [`${breakpoint}-${val}-spacing-${spacing}`]:
            {
              [theme.bigger(breakpoint)]:
              {
                width: `calc( ${(val / 12 * 100).toFixed(6)}% - ${theme.unit * 2 * spacing}px )`,
                marginRight: theme.unit * 2 * spacing
              }
            }
          }
          return spacingAcc
        }, {})
      }
      return classAcc
    }, {})
  }
  return propAcc
}, {})


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
    ...spacingStyles(theme),
    ...parentStyles(),
    ...childStyles(theme)
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
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others

  } = props



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
  xs: PropTypes.oneOf(size),
  sm: PropTypes.oneOf(size),
  md: PropTypes.oneOf(size),
  lg: PropTypes.oneOf(size),
  xl: PropTypes.oneOf(size),
  xxl: PropTypes.oneOf(size),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

Flex.defaultProps = {
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

const StyledFlex = withStyles(styles)(Flex)

StyledFlex.displayName = 'Flex'

module.exports = StyledFlex
