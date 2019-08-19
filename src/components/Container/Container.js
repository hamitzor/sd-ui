const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')

const props = {
  spacing: [0, 1, 2, 3],
  direction: ['row', 'row-r', 'column', 'column-r', 'initial', 'inherit'],
  wrap: ['nowrap', 'wrap', 'wrap-r', 'initial', 'inherit'],
  justify: ['start', 'end', 'center', 'between', 'around', 'initial', 'inherit'],
  alignItems: ['stretch', 'center', 'start', 'end', 'baseline', 'initial', 'inherit'],
  alignContent: ['stretch', 'center', 'start', 'end', 'between', 'around', 'initial', 'inherit'],
}

const propNameToCssPropertyMap = Object.keys(props).filter(propName => propName !== 'spacing').reduce((acc, propName) => ({
  ...acc, [propName]: propName
    .replace('direction', 'flexDirection')
    .replace('wrap', 'flexWrap')
    .replace('justify', 'justifyContent')
}), {})

const propValueToCssValueMap = Object.keys(props).filter(propName => propName !== 'spacing').reduce((acc, propName) => ({
  ...acc,
  ...props[propName].reduce((acc, value) => ({
    ...acc,
    [value]: value
      .replace('-r', '-reverse')
      .replace(/(start|end)/, `flex-${value}`)
      .replace(/(between|around)/, `space-${value}`)
  }), {})
}), {})

const parentClasses = () => Object.keys(props).reduce((acc, propName) => {
  if (propName !== 'spacing') {
    return {
      ...acc,
      ...props[propName].reduce((acc, val) => {
        acc = {
          ...acc,
          [`${propName}-${val}`]: { [propNameToCssPropertyMap[propName]]: propValueToCssValueMap[val] }
        }
        return acc
      }, {})
    }
  }
  return acc
}, {})

const styles = {
  container: {
    display: 'flex'
  },
  'full-width': {
    width: '100%'
  },
  'full-height': {
    height: '100%'
  },
  ...parentClasses()
}

const Container = props => {

  const {
    className,
    classes,
    children,
    spacing,
    direction,
    wrap,
    justify,
    alignItems,
    alignContent,
    fullHeight,
    fullWidth,
    ...others
  } = props

  delete others['theme']

  const elementClasses = {
    container: classNames({
      [className]: true,
      [classes.container]: true,
      [classes[`direction-${direction}`]]: true,
      [classes[`wrap-${wrap}`]]: true,
      [classes[`justify-${justify}`]]: true,
      [classes[`alignItems-${alignItems}`]]: true,
      [classes[`alignContent-${alignContent}`]]: true,
      [classes['full-width']]: fullWidth,
      [classes['full-height']]: fullHeight
    })
  }

  return (
    <div className={elementClasses.container} {...others}>
      {typeof children === 'string' ? <div>{children}</div> :
        React.Children.map(children, child =>
          child && (child.type.displayName === 'Item' ? <child.type {...child.props} spacing={spacing}></child.type> : child)
        )}
    </div>
  )
}

Container.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  spacing: PropTypes.oneOf(props.spacing),
  direction: PropTypes.oneOf(props.direction),
  wrap: PropTypes.oneOf(props.wrap),
  justify: PropTypes.oneOf(props.justify),
  alignItems: PropTypes.oneOf(props.alignItems),
  alignContent: PropTypes.oneOf(props.alignContent),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool
}

Container.defaultProps = {
  className: '',
  spacing: 0,
  direction: 'row',
  wrap: 'nowrap',
  justify: 'start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  fullHeight: false
}

const styled = withStyles(styles)(Container)

styled.displayName = 'Container'

module.exports = styled