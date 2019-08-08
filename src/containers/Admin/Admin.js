const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Flex = require('../../components/Flex')
const AdminHeader = require('../../components/AdminHeader')
const AdminFooter = require('../../components/AdminFooter')
const Panel = require('../../components/Panel')
const { Redirect, Route, Switch } = require('react-router-dom')
const Image = require('../../components/Image')
const Text = require('../../components/Text')
const Expansion = require('../../components/Expansion')
const Button = require('../../components/Button')
const Icon = require('../../components/Icon')
const { MdAdd, MdList, MdCheck, MdBlock, MdMenu, MdClose, MdAccountCircle } = require('react-icons/md')
const { Link } = require('react-router-dom')
const { CSSTransition } = require('react-transition-group')
const IconButton = require('../../components/IconButton')
const { connect } = require('react-redux')
const { logout } = require('../../actions/auth')
const ConfigSetNew = require('./ConfigSetNew')

const styles = theme => {
  return {
    'root': {
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    'left-navbar': {
      width: '360px'
    },
    'content': {
      flex: 1
    },
    'container': {
      flex: 1
    },
    'user-info': {
      paddingTop: theme.unit * 2,
      paddingBottom: theme.unit * 3
    },
    'inner-nav': {
      paddingLeft: theme.unit * 5
    },
    'inner-navbar': {
      paddingTop: 10,
      paddingBottom: 10
    },
    'left-navbar-enter': {
      ...theme.transform('translateX(-360px)'),
      width: '0px',
      transition: theme.transition('all')
    },
    'left-navbar-enter-active': {
      ...theme.transform('translateX(0)'),
      width: '360px',
    },
    'left-navbar-enter-done': {
      ...theme.transform('translateX(0)'),
      width: '360px',
    },
    'left-navbar-exit': {
      ...theme.transform('translateX(0)'),
      width: '360px',
      transition: theme.transition('all')
    },
    'left-navbar-exit-active': {
      ...theme.transform('translateX(-360px)'),
      width: '0px',
    },
    'left-navbar-exit-done': {
      ...theme.transform('translateX(-360px)'),
      width: '0px',
    },
    'left-navbar-close': {
      padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
      paddingBottom: 0
    },
    'content-enter': {
      width: '100%',
      transition: theme.transition('all')
    },
    'content-enter-active': {
      width: 'calc( 100% - 360px )',
    },
    'content-enter-done': {
      width: 'calc( 100% - 360px )',
    },
    'content-exit': {
      width: 'calc( 100% - 360px )',
      transition: theme.transition('all')
    },
    'content-exit-active': {
      width: '100%',
    },
    'content-exit-done': {
      width: '100%',
    },
    'content-on': {
      width: 'calc( 100% - 360px )',
    },
    'content-off': {
      width: '100%',
    },
    'header-content': {
      padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
    },
  }
}

class Admin extends React.Component {

  state = {
    leftNavbarOpened: true,
    busy: false
  }

  animateBusyHandlers = {
    onEnter: () => { this.setState({ busy: true }) },
    onEntered: () => { this.setState({ busy: false }) },
    onExit: () => { this.setState({ busy: true }) },
    onExited: () => { this.setState({ busy: false }) }
  }

  componentDidMount() {
    const { width } = this.props
    this.setState({
      leftNavbarOpened: width !== 'xs'
    })
  }

  toggleLeftNavbar = val => () => {
    this.setState(({ busy }) => {
      let newState = busy ? {} : { leftNavbarOpened: val }
      return newState
    })
  }

  render() {
    const {
      classes,
      className,
      userSession: { user, authanticated },
      width,
      dispatch,
      match: { url },
      theme: { unit },
      location,
      lang,
    } = this.props

    if (!authanticated) {
      return <Redirect to={{
        pathname: `/${lang}/login`,
        state: { from: location }
      }} />
    }

    if (user.role !== 'ADMIN') {
      return <div>You have to be Administrator to access Admin Panel</div>
    }

    const {
      leftNavbarOpened
    } = this.state

    const animate = width !== 'xs'

    const rootClasses = classNames({
      [classes.root]: true,
      [className]: true
    })

    const InnerNav = props => {
      const {
        to,
        children,
        ...others
      } = props

      return (
        <Link to={`${url}/${to}`}>
          <Button type='transparent' color='default' className={classes['inner-nav']} radius={0} fullWidth justifyContent='left' size={1} {...others}>
            {children}
          </Button>
        </Link>
      )
    }

    const leftNavbar = (
      <Panel radius={0} noBorder padding={0}>
        <Flex className={classes['left-navbar']} direction='column' parent>
          <Flex parent justify='end'>
            {leftNavbarOpened && <IconButton
              className={classes['left-navbar-close']}
              size={2}
              color='default'
              onClick={this.toggleLeftNavbar(false)}>
              <Icon>
                <MdClose />
              </Icon>
            </IconButton>}
          </Flex>
          <Flex className={classes['user-info']} direction='column' alignItems='center' parent>
            <Image
              src={user.avatar}
              width={unit * 15}
              height={unit * 15}
              rounded
            />
            <Text size='big'>{`${user.name} (${user.user})`}</Text>
            <Text size='small'>{user.role === 'ADMIN' ? 'Admin' : 'Regular User'}</Text>
          </Flex>
          <Link to={`${url}/dashboard`}>
            <Button radius={0} fullWidth justifyContent='left' color='default' >Dashboard</Button>
          </Link>
          <Expansion animate={animate} open={true} label='Config Sets'>
            <div className={classes['inner-navbar']}>
              <InnerNav to='config/set/new' ><Icon><MdAdd /></Icon>New Config Set</InnerNav>
              <InnerNav to='config/set/all' ><Icon><MdList /></Icon>All Config Sets</InnerNav>
            </div>
          </Expansion>
          <Expansion animate={animate} open={false} label='Comments'>
            <div className={classes['inner-navbar']}>
              <InnerNav to='comments/all' ><Icon><MdList /></Icon>All Comments</InnerNav>
              <InnerNav to='comments/approved' ><Icon><MdCheck /></Icon>Approved Comments</InnerNav>
              <InnerNav to='comments/unapproved' ><Icon><MdBlock /></Icon>Unapproved Comments</InnerNav>
            </div>
          </Expansion>
        </Flex>
      </Panel>
    )

    const content = (animate) => {

      const contentClasses = classNames({
        [classes['content']]: true,
        [classes['content-on']]: !animate && leftNavbarOpened,
        [classes['content-off']]: !animate && !leftNavbarOpened
      })

      return (
        <Flex wrap='nowrap' fullWidth={false} className={contentClasses} direction='column' parent>
          <AdminHeader>
            <Flex className={classes['header-content']} justify='between' parent>
              {!leftNavbarOpened ? <IconButton
                size={2}
                color='white'
                onClick={this.toggleLeftNavbar(true)}>
                <Icon>
                  <MdMenu />
                </Icon>
              </IconButton> : <div />}
              <IconButton
                onClick={() => dispatch(logout())}
                size={2}
                color='white'>
                <Icon>
                  <MdAccountCircle />
                </Icon>
              </IconButton>
            </Flex>
          </AdminHeader>
          <Flex className={classes['container']} parent>
            <Switch>
              <Route path={`${url}/config/set/new`} component={ConfigSetNew} />
              <Route path={`${url}/config/set/all`} component={() => <div>/confi/set/all</div>} />
              <Route path={`${url}/dashboard`} component={() => <div>/dashboard</div>} />
              <Route path={url} component={() => <Redirect to={`${url}/dashboard`} />} />
            </Switch>
          </Flex>
          <AdminFooter />
        </Flex>
      )
    }

    const leftNavbarAnimateClasses = {
      enter: classes['left-navbar-enter'],
      enterActive: classes['left-navbar-enter-active'],
      enterDone: classes['left-navbar-enter-done'],
      exit: classes['left-navbar-exit'],
      exitActive: classes['left-navbar-exit-active'],
      exitDone: classes['left-navbar-exit-done']
    }

    const contentAnimateClasses = {
      enter: classes['content-enter'],
      enterActive: classes['content-enter-active'],
      enterDone: classes['content-enter-done'],
      exit: classes['content-exit'],
      exitActive: classes['content-exit-active'],
      exitDone: classes['content-exit-done']
    }

    return (
      <Flex className={rootClasses} parent wrap='nowrap' >
        {animate ?
          (<CSSTransition
            in={leftNavbarOpened}
            timeout={200}
            classNames={leftNavbarAnimateClasses}
            {...this.animateBusyHandlers}
          >
            {leftNavbar}
          </CSSTransition>) : leftNavbarOpened && leftNavbar}
        {animate ?
          (<CSSTransition
            in={leftNavbarOpened}
            timeout={200}
            classNames={contentAnimateClasses}
            {...this.animateBusyHandlers}
          >
            {content(true)}
          </CSSTransition>) : content(false, leftNavbarOpened)}
      </Flex>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  userSession: PropTypes.object.isRequired,
  width: PropTypes.string,
  location: PropTypes.object.isRequired
}

Admin.defaultProps = {
  className: '',
  width: 'lg'
}

const styledAdminHome = withStyles(styles)(Admin)

styledAdminHome.displayName = 'AdminHome'

module.exports = connect(state => ({
  userSession: state.userSession,
  width: state.width,
  lang: state.lang
}))(styledAdminHome)
