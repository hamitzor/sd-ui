const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const childrenTypeChecker = require('../../../custom_modules/children-type-checker')
const Icon = require('../Icon')
const IconButton = require('../IconButton')
const { FaChevronRight, FaChevronLeft } = require('react-icons/fa')
const isTouchDevice = require('is-touch-device')


const color = ['default', 'primary', 'secondary']
const radius = [0, 1, 2, 3]

const radiusStyles = theme => radius.reduce((acc, val) => {
  acc = {
    ...acc,
    [`radius-${val}`]: {
      borderRadius: theme.unit * val / 2
    }
  }
  return acc
}, {})

const styles = theme => {

  return {
    root: {
      height: theme.unit * 9,
      display: 'flex',
      overflow: 'hidden',
    },
    'root-invisible': {
      visibility: 'hidden'
    },
    container: {
      width: `calc( 100% - ${theme.unit * 14}px )`,
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
    },
    'container-no-controls': {
      width: '100%',
      overflowX: 'auto'
    },
    tabs: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 40,
      display: 'flex',
      transition: theme.transition('all')
    },
    control: {
      width: theme.unit * 7,
    },
    'control-hide': {
      visibility: 'hidden'
    },
    'control-left-content': {
      justifyContent: 'flex-start'
    },
    'control-right-content': {
      justifyContent: 'flex-end'
    },
    ...radiusStyles(theme)
  }
}

class Tabs extends React.Component {
  state = {
    page: 1,
    totalPage: undefined,
    ready: false
  }

  containerRef = React.createRef()

  componentDidMount() {
    const containerWidth = this.containerRef.current.offsetWidth
    const tabNumber = this.props.children.length
    this.setState({
      /* eslint-disable react/prop-types */
      totalPage: Math.ceil(tabNumber / Math.floor(containerWidth / this.props.theme.unit / 24)),
      /* eslint-enable react/prop-types */
      ready: true,
      containerWidth
    })
  }

  nextPage = () => {
    this.setState(({ page, totalPage }) => ({
      page: page + 1 > totalPage ? 1 : page + 1
    }))
  }

  prevPage = () => {
    this.setState(({ page }) => ({
      page: page - 1 < 1 ? 1 : page - 1
    }))
  }

  handleOnActive = (e, id) => {
    this.props.onChange(e, id)
  }

  resolveChildren = (children, props) => {
    const tabNumber = children.length
    return React.Children.map(children,
      (child) => {
        if (child) {
          return <child.type
            {...child.props}
            color={props.color}
            active={child.props.tabId === props.active}
            onActive={this.handleOnActive}
            style={{ width: `${100 / tabNumber}%` }} ></child.type>
        }
      }
    )
  }


  render() {
    const {
      children,
      classes,
      className,
      radius,
      color,
      /* eslint-disable */
      //Just to catch ...others properly, theme prop is extracted.
      theme,
      active,
      onChange,
      hideControls,
      /* eslint-enable */
      ...others
    } = this.props

    const {
      page,
      ready,
      totalPage,
      containerWidth,
    } = this.state

    const derivedChildren = this.resolveChildren(children, this.props)
    const childCount = derivedChildren.length
    const showControls = hideControls ? false : typeof isTouchDevice() === 'boolean' && !isTouchDevice() && containerWidth < childCount * theme.unit * 24
    const rootClasses = classNames({
      [classes.root]: true,
      [classes['root-invisible']]: !ready,
      [classes[`radius-${radius}`]]: true,
      [className]: true
    })

    const controlLeftClasses = classNames({
      [classes.control]: true,
      [classes['control-hide']]: page < 2
    })

    const controlRightClasses = classNames({
      [classes.control]: true,
      [classes['control-hide']]: page + 1 > totalPage
    })

    const containerClasses = classNames({
      [classes.container]: true,
      [classes['container-no-controls']]: !showControls,
      [classes[`radius-${radius}`]]: true
    })

    return (
      <div {...others} className={rootClasses}>
        {
          showControls && <IconButton
            onClick={this.prevPage}
            size={1}
            color={color}
            className={controlLeftClasses}
            contentClassName={classes['control-left-content']}>
            <Icon>
              <FaChevronLeft />
            </Icon>
          </IconButton>
        }
        <div ref={this.containerRef} className={containerClasses}>
          <div style={{ left: `calc(calc( -${childCount * theme.unit * 24}px + 100% )/${totalPage - 1}*${page - 1})` }} className={classes.tabs}>
            {derivedChildren}
          </div>
        </div>
        {
          showControls && <IconButton
            onClick={this.nextPage}
            size={1}
            color={color}
            className={controlRightClasses}
            contentClassName={classes['control-right-content']}>
            <Icon>
              <FaChevronRight />
            </Icon>
          </IconButton>
        }
      </div>
    )
  }
}

Tabs.propTypes = {
  classes: PropTypes.object.isRequired,
  children: childrenTypeChecker({
    'Tab': [true],
  }),
  active: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(color),
  radius: PropTypes.oneOf(radius),
  hideControls: PropTypes.bool,
}

Tabs.defaultProps = {
  className: '',
  color: 'primary',
  radius: 2,
  hideControls: false
}

const styledTabs = withStyles(styles)(Tabs)

styledTabs.displayName = 'Tabs'

module.exports = styledTabs
