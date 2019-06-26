const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Icon = require('../Icon')
const { FaCaretDown } = require('react-icons/fa')
const Button = require('../Button')
const Color = require('color')
const ListItem = require('../ListItem')
const List = require('../List')
const { CSSTransition } = require('react-transition-group')
const childrenTypeChecker = require('../../../custom_modules/children-type-checker')

const transitionTime = 150

const color = ['default', 'primary', 'secondary']


const bodyFixerStyles = {
  '@global': {
    'body': {
      overflow: 'hidden',
      paddingRight: 15
    }
  }
}

const BodyFixer = () => null
const BodyFixerWithStyles = withStyles(bodyFixerStyles)(BodyFixer)

const selectElementColorStyles = theme => color.reduce((acc, val) => {
  const calculatedColor = Color(val === 'default' ? theme.color.text.normal : theme.color[val].normal).rgb()
  acc = {
    ...acc,
    [`select-element-color-${val}`]: {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg height='29' viewBox='0 0 24 24' width='29' xmlns='http://www.w3.org/2000/svg'><path style='fill:${calculatedColor};' d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>')`,
    }
  }
  return acc
}, {})

const styles = theme => {

  return {
    root: {
      display: 'inline-block',
      position: 'relative'
    },
    'hide-select': {
      display: 'none',
    },
    'select-element': {
      '-moz-appearance': 'none', /* Firefox */
      '-webkit-appearance': 'none', /* Safari and Chrome */
      appearance: 'none',
      paddingRight: 50,
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: `calc( 100% - ${theme.unit * 3}px )`,
      backgroundPositionY: 5,
      '& option': {
        color: theme.color.text.normal
      }
    },
    ...selectElementColorStyles(theme),
    button: {
      fontWeight: 500,
      textTransform: 'none'
    },
    'button-error': {
      border: `1px solid ${Color(theme.color.error.light).alpha(0.3).toString()}`
    },
    'button-caret': {
      fontSize: '1rem',
      marginLeft: 15
    },
    error: {
      color: theme.color.error.normal,
      fontSize: '.7rem',
      marginTop: theme.unit
    },
    'menu': {
      position: 'absolute',
      top: 0,
      zIndex: 30,
      border: `1px solid ${theme.color.grey[300]}`,
      backgroundColor: theme.color.background.panel,
      borderRadius: theme.unit,
      transformOrigin: 'left top',
      paddingTop: theme.unit * 1.5,
      paddingBottom: theme.unit * 1.5,
      overflowY: 'auto'
    },
    'menu-enter': {
      opacity: 0,
      ...theme.transform(
        `translateY(${theme.unit * -4}px) scaleY(0.5) scaleX(0.8)`
      ),
      transition: theme.transition('all', transitionTime)
    },
    'menu-enter-active': {
      opacity: 1,
      ...theme.transform(
        `translateY(0px) scaleY(1)  scaleX(1)`
      ),
    },
    'menu-exit': {
      opacity: 1,
      ...theme.transform(
        `translateY(0px) scaleY(1)  scaleX(1)`
      ),
      transition: theme.transition('all', transitionTime)
    },
    'menu-exit-active': {
      opacity: 0,
      ...theme.transform(
        `translateY(${theme.unit * -4}px) scaleY(0.5)  scaleX(0.8)`
      ),
    },
    'menu-item': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.9rem',
      paddingLeft: theme.unit * 5,
      paddingRight: theme.unit * 5,
      whiteSpace: 'nowrap'
    }
  }
}
//@TODO: add ready unready. 

class Select extends React.Component {

  state = {
    open: false,
    busy: false,
    ready: false,
    menuHeight: undefined,
    menuItemHeights: [],
    selectedIndex: 0,
    calculatedSelectClasses: ''
  }

  rootRef = React.createRef()
  selectElementRef = React.createRef()
  selectedOptionRef = React.createRef()
  menuRef = React.createRef()
  buttonRef = React.createRef()

  handleSelect = (_, key, i) => {
    if (!this.state.busy) {
      const event = new Event('change', { bubbles: true })
      this.selectElementRef.current.value = key
      this.selectElementRef.current.dispatchEvent(event)
      this.setState({
        open: false,
        selectedIndex: i
      })
    }
  }

  handleClick = () => {
    this.setState({
      open: true
    })
  }

  componentDidMount() {
    if (!this.props.native) {
      let menuHeight = 0
      let menuItemHeights = []
      this.menuRef.current
        .querySelectorAll('ul li')
        .forEach((li) => {
          menuHeight = menuHeight + li.offsetHeight
          menuItemHeights.push(menuHeight)
        })

      menuItemHeights.unshift(0)
      this.setState({
        ready: true,
        menuHeight: menuItemHeights[this.props.maxOption - 1],
        menuItemHeights
      })
      document.addEventListener('click', this.handleClickOutside)
    }
    else {
      const button = this.buttonRef.current
      const calculatedSelectClasses = button.querySelector('.BUTTON_TEXT').className + ' ' + button.className
      this.setState({
        ready: true,
        calculatedSelectClasses
      })
    }
  }

  componentDidUpdate() {
    if (this.menuRef.current) {
      this.menuRef.current.scrollTop = this.state.menuItemHeights[this.state.selectedIndex]
    }
  }

  componentWillUnmount() {
    if (!this.props.native) {
      document.removeEventListener('click', this.handleClickOutside)
    }
  }

  handleClickOutside = (event) => {
    if (this.state.open && !this.state.busy) {
      if (this.rootRef.current && !this.rootRef.current.contains(event.target)) {
        this.setState({
          open: false
        })
      }
    }
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
      native,
      color,
      disabled,
      value,
      error,
      errorMessage,
      selectProps,
      onChange,
      animate,
      buttonProps,
      style,
      /* eslint-disable */
      //Just to catch ...others properly, theme prop is extracted.
      theme,
      maxOption,
      /* eslint-enable */
      ...others
    } = this.props

    const {
      open,
      ready,
      menuHeight,
      calculatedSelectClasses
    } = this.state


    const rootClasses = classNames(classes.root, className)

    const buttonClasses = classNames(
      classes.button,
      { [classes['button-error']]: error }
    )

    const selectElementClasses = classNames({
      [classes['hide-select']]: !native,
      [calculatedSelectClasses]: true,
      [classes['select-element']]: true,
      [classes[`select-element-color-${color}`]]: true,
    })

    const options = React.Children.map(children, (child, i) => (
      <option key={i} value={`${child.props.value}`}>{child.props.children}</option>
    ))

    let selectedOne = false

    const menu = (
      <div ref={this.menuRef} className={classes.menu} style={{ maxHeight: menuHeight ? menuHeight + theme.unit * 4 : 'none' }}>
        <List onSelect={this.handleSelect}>
          {
            React.Children.map(options, (child, i) => {
              const selected = !selectedOne && `${value}` === child.props.value
              if (selected) {
                selectedOne = true
              }
              return (
                <ListItem
                  selected={selected}
                  className={classes['menu-item']}
                  key={i}
                  itemId={`${child.props.value}`}>
                  {child.props.children}
                </ListItem>
              )
            }
            )
          }
        </List>
      </div>
    )

    const getLabelFromOptions = (value) => {
      let label = undefined
      React.Children.forEach(options, child => {
        if (value === child.props.value) {
          label = child.props.children
          return
        }
      })
      return label
    }

    const listAnimateClasses = {
      enter: classes['menu-enter'],
      enterActive: classes['menu-enter-active'],
      exit: classes['menu-exit'],
      exitActive: classes['menu-exit-active'],
    }

    const tempRootStyle = ready ? {} : { position: 'absolute', zIndex: -1, visibility: 'hidden' }
    return (
      <div style={{ ...style, ...tempRootStyle }} ref={this.rootRef} {...others} className={rootClasses} >
        {ready && open && <BodyFixerWithStyles />}
        {
          !native &&
          <Button
            onClick={this.handleClick}
            disabled={disabled}
            type='light'
            radius={2}
            className={buttonClasses}
            color={color}
            {...buttonProps}>
            {getLabelFromOptions(value)}
            <Icon>
              <FaCaretDown className={classes['button-caret']} />
            </Icon>
          </Button>
        }
        {
          ready ?
            animate ? <CSSTransition
              in={open}
              unmountOnExit
              timeout={transitionTime}
              classNames={listAnimateClasses}
              {...this.animateBusyHandlers}
            >
              {menu}
            </CSSTransition> :
              open && menu :
            <div>
              {menu}
              <Button
                rootRef={this.buttonRef}
                key={1}
                disabled={disabled}
                type='light'
                radius={2}
                className={buttonClasses}
                color={color}
                {...buttonProps}>
                temp_button
              </Button>
            </div>
        }
        <select
          ref={this.selectElementRef}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={selectElementClasses}
          {...selectProps}>
          {options}
        </select>
        {error && <div className={classes.error}>{errorMessage}</div>}
      </div>
    )
  }
}

Select.propTypes = {
  children: childrenTypeChecker({
    'option': [true]
  }),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  native: PropTypes.bool,
  color: PropTypes.oneOf(color),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  selectProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  maxOption: PropTypes.number,
  animate: PropTypes.bool,
  buttonProps: PropTypes.object,
  style: PropTypes.object,
}

Select.defaultProps = {
  className: '',
  native: false,
  color: 'default',
  disabled: false,
  error: false,
  errorMessage: '',
  selectProps: {},
  maxOption: 6,
  animate: true,
  buttonProps: {},
  style: {}
}

const styledSelect = withStyles(styles)(Select)

styledSelect.displayName = 'Select'

module.exports = styledSelect
