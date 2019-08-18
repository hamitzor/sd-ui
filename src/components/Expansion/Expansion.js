const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Icon = require('../Icon')
const { MdExpandMore, MdExpandLess } = require('react-icons/md')
const Button = require('../Button')
const { CSSTransition } = require('react-transition-group')


const colors = ['grey', 'darkgrey', 'primary', 'success', 'warning', 'error']
const types = ['light', 'filled', 'transparent']
const radiuses = [0, 1, 2, 3]

const AnimatedContentStyles = theme => ({
  'root': {
    overflow: 'hidden'
  },
  'root-enter': {
    height: '0px',
  },
  'root-enter-active': {
    height: props => `${props.calculatedHeight}px!important`,
    transition: theme.transition()
  },
  'root-exit': {
    height: props => props.calculatedHeight,
  },
  'root-exit-active': {
    height: '0px!important',
    transition: theme.transition()
  }
})


const AnimatedContent = withStyles(AnimatedContentStyles)(props => {
  /* eslint-disable */
  const {
    open,
    classes,
    children
  } = props
  /* eslint-enable */

  const rootAnimateClasses = {
    enter: classes['root-enter'],
    enterActive: classes['root-enter-active'],
    exit: classes['root-exit'],
    exitActive: classes['root-exit-active'],
  }

  return (
    <CSSTransition
      in={open}
      timeout={200}
      unmountOnExit
      classNames={rootAnimateClasses}
    >
      <div className={classes['root']}>{children}</div>
    </CSSTransition>
  )
})

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  toggle: {
    width: '100%',
  },
  'toggle-content': {
    justifyContent: 'space-between'
  },
  'toggle-icon': {
    fontSize: '1.5rem',
  },
  'toggle-icon-enter': {
    ...theme.transform('rotate(0deg)'),
    transition: theme.transition()
  },
  'toggle-icon-enter-active': {
    ...theme.transform('rotate(180deg)'),
  },
  'toggle-icon-enter-done': {
    ...theme.transform('rotate(180deg)'),
  },
  'toggle-icon-exit': {
    ...theme.transform('rotate(180deg)'),
    transition: theme.transition()
  },
  'toggle-icon-exit-active': {
    ...theme.transform('rotate(0deg)'),
  },
  'toggle-icon-exit-done': {
    ...theme.transform('rotate(0deg)'),
  }
})

class Expansion extends React.Component {

  state = {
    open: false,
    ready: false,
    busy: false,
    calculatedHeight: undefined
  }

  contentRef = React.createRef()

  componentDidMount() {
    console.log(this.contentRef.current.offsetHeight)
    this.setState({
      open: this.props.open,
      ready: true,
      calculatedHeight: this.contentRef.current.offsetHeight
    })
  }

  handleClick = (e) => {
    this.setState(({ open, busy }) => {
      this.props.onChange && this.props.onChange(e, busy ? open : !open)
      return {
        open: busy ? open : !open
      }
    })
  }

  animateBusyHandlers = {
    onEnter: () => { this.setState({ busy: true }) },
    onEntered: () => { this.setState({ busy: false }) },
    onExit: () => { this.setState({ busy: true }) },
    onExited: () => { this.setState({ busy: false }) }
  }

  render() {
    const {
      children,
      classes,
      className,
      type,
      color,
      label,
      animate,
      buttonProps,
      style,
      radius,
      ...others
    } = this.props

    delete others['onChange']
    delete others['theme']

    const {
      open,
      ready,
      calculatedHeight
    } = this.state


    const rootClasses = classNames(classes['root'], className)

    const toggleIcon = <MdExpandMore className={classes['toggle-icon']} />
    const toggleIconRotated = <MdExpandLess className={classes['toggle-icon']} />

    const toggleAnimateClasses = {
      enter: classes['toggle-icon-enter'],
      enterActive: classes['toggle-icon-enter-active'],
      enterDone: classes['toggle-icon-enter-done'],
      exit: classes['toggle-icon-exit'],
      exitActive: classes['toggle-icon-exit-active'],
      exitDone: classes['toggle-icon-exit-done']
    }

    const content = <div ref={this.contentRef}>{children}</div>

    const tempRootStyle = ready ? {} : { visibility: 'hidden' }

    return (
      <div style={{ ...style, ...tempRootStyle }} {...others} className={rootClasses} >
        <Button
          onClick={this.handleClick}
          type={type}
          radius={radius}
          className={classes['toggle']}
          contentClassName={classes['toggle-content']}
          color={color}
          {...buttonProps}>
          {label}
          <Icon>
            {animate ?
              <CSSTransition
                in={open}
                timeout={200}
                classNames={toggleAnimateClasses}
                {...this.animateBusyHandlers}
              >
                {toggleIcon}
              </CSSTransition> : open ? toggleIconRotated : toggleIcon}
          </Icon>
        </Button>
        {ready ?
          animate ?
            <AnimatedContent
              open={open}
              calculatedHeight={calculatedHeight}>
              {children}
            </AnimatedContent> :
            open && content :
          content
        }
      </div>
    )
  }
}

Expansion.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(types),
  color: PropTypes.oneOf(colors),
  radius: PropTypes.oneOf(radiuses),
  label: PropTypes.string.isRequired,
  animate: PropTypes.bool,
  onChange: PropTypes.func,
  buttonProps: PropTypes.object,
  style: PropTypes.object,
  open: PropTypes.bool,
}

Expansion.defaultProps = {
  className: '',
  type: 'light',
  color: 'primary',
  radius: 2,
  animate: true,
  buttonProps: {},
  style: {},
  open: false
}

const styledExpansion = withStyles(styles)(Expansion)

styledExpansion.displayName = 'Expansion'

module.exports = styledExpansion