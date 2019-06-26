const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Flex = require('../Flex')
const AdminHeader = require('../AdminHeader')
const AdminFooter = require('../AdminFooter')
const Panel = require('../Panel')
const { withAdminContext } = require('../../context/AdminContext')
const { Redirect } = require('react-router-dom')
const Image = require('../Image')
const Text = require('../Text')
const Expansion = require('../Expansion')
const Button = require('../Button')
const Icon = require('../Icon')
const Test = require('../Test')
const { MdAdd, MdList, MdCheck, MdBlock, MdGroup, MdPersonAdd, MdInsertDriveFile, MdMenu, MdClose, MdAccountCircle } = require('react-icons/md')
const { Link } = require('react-router-dom')
const { CSSTransition } = require('react-transition-group')
const IconButton = require('../IconButton')


const styles = theme => {
  return {
    'root': {
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    'left-navbar': {
      width: '250px'
    },
    'display': {
      minWidth: '360px'
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
      ...theme.transform('translateX(-250px)'),
      width: '0px',
      transition: theme.transition('all')
    },
    'left-navbar-enter-active': {
      ...theme.transform('translateX(0)'),
      width: '250px',
    },
    'left-navbar-enter-done': {
      ...theme.transform('translateX(0)'),
      width: '250px',
    },
    'left-navbar-exit': {
      ...theme.transform('translateX(0)'),
      width: '250px',
      transition: theme.transition('all')
    },
    'left-navbar-exit-active': {
      ...theme.transform('translateX(-250px)'),
      width: '0px',
    },
    'left-navbar-exit-done': {
      ...theme.transform('translateX(-250px)'),
      width: '0px',
    },
    'display-enter': {
      width: '100%',
      transition: theme.transition('all')
    },
    'display-enter-active': {
      width: 'calc( 100% - 250px )',
    },
    'display-enter-done': {
      width: 'calc( 100% - 250px )',
    },
    'display-exit': {
      width: 'calc( 100% - 250px )',
      transition: theme.transition('all')
    },
    'display-exit-active': {
      width: '100%',
    },
    'display-exit-done': {
      width: '100%',
    },
    'display-on': {
      width: 'calc( 100% - 250px )',
    },
    'display-off': {
      width: '100%',
    },
    'header-content': {
      padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
    },
  }
}

class AdminHome extends React.Component {

  state = {
    openLeftNavbar: true,
    busy: false
  }

  animateBusyHandlers = {
    onEnter: () => { this.setState({ busy: true }) },
    onEntered: () => { this.setState({ busy: false }) },
    onExit: () => { this.setState({ busy: true }) },
    onExited: () => { this.setState({ busy: false }) }
  }


  componentDidMount() {
    this.setState({
      /* eslint-disable */
      openLeftNavbar: this.props.theme.width() !== 'xs'
      /* eslint-enable */
    })
  }

  handleToggleLeftNavbar = () => {
    this.setState(({ openLeftNavbar, busy }) => {
      let newState = busy ? {} : { openLeftNavbar: !openLeftNavbar }
      return newState
    })
  }

  render() {
    const {
      classes,
      className,
      adminContext,
      match,
      /* eslint-disable */
      //Just to catch ...others properly, theme prop is extracted.
      theme,

    } = this.props

    const {
      openLeftNavbar
    } = this.state


    const animate = theme.width() !== 'xs'


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
        <Link to={`${match.path}/${to}`}>
          <Button type='transparent' color='default' className={classes['inner-nav']} radius={0} fullWidth justifyContent='left' size={1} {...others}>
            {children}
          </Button>
        </Link>
      )
    }

    const leftNavbar = (
      <Panel radius={0} noBorder padding={0}>
        <Flex className={classes['left-navbar']} direction='column' parent>
          <Flex className={classes['user-info']} direction='column' alignItems='center' parent>
            <Image
              src='https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-1/p100x100/21034563_1656608651016648_3404805281443873405_n.jpg?_nc_cat=103&_nc_ht=scontent-mxp1-1.xx&oh=5645031ff6f862e2d784b016c37cf91a&oe=5D22F152'
              width={theme.unit * 15}
              height={theme.unit * 15}
              rounded
            />
            <Text size='big'>Hamit Zor</Text>
            <Text size='small'>Super Admin</Text>
          </Flex>
          <Link to={`${match.path}/dashboard`}><Button radius={0} fullWidth justifyContent='left' color='default' >Dashboard</Button></Link>
          <Expansion animate={animate} open={true} label='Blogs'>
            <div className={classes['inner-navbar']}>
              <InnerNav to='blos/new' ><Icon><MdAdd /></Icon>New Blog</InnerNav>
              <InnerNav to='blogs/all' ><Icon><MdList /></Icon>All Blogs</InnerNav>
              <InnerNav to='blogs/published' ><Icon><MdCheck /></Icon>Published Blogs</InnerNav>
              <InnerNav to='blogs/unpublished' ><Icon><MdBlock /></Icon>Unpublished Blogs</InnerNav>
            </div>
          </Expansion>
          <Expansion animate={animate} open={true} label='Comments'>
            <div className={classes['inner-navbar']}>
              <InnerNav to='comments/all' ><Icon><MdList /></Icon>All Comments</InnerNav>
              <InnerNav to='comments/approved' ><Icon><MdCheck /></Icon>Approved Comments</InnerNav>
              <InnerNav to='comments/unapproved' ><Icon><MdBlock /></Icon>Unapproved Comments</InnerNav>
            </div>
          </Expansion>
          <Expansion animate={animate} label='Users'>
            <div className={classes['inner-navbar']}>
              <InnerNav to='users' ><Icon><MdGroup /></Icon>All Users</InnerNav>
              <InnerNav to='users/new' ><Icon><MdPersonAdd /></Icon>New User</InnerNav>
            </div>
          </Expansion>
          <Expansion animate={animate} label='Settings'>
            <div className={classes['inner-navbar']}>
              <InnerNav to='users' ><Icon><MdInsertDriveFile /></Icon>Pages</InnerNav>
              <InnerNav to='users/new' ><Icon><MdPersonAdd /></Icon>Site Configuration</InnerNav>
            </div>
          </Expansion>
        </Flex>
      </Panel>
    )

    const Display = (animate, on) => {

      const displayClasses = classNames({
        [classes['display']]: true,
        [classes['display-on']]: !animate && on,
        [classes['display-off']]: !animate && !on
      })

      return (
        <Flex wrap='nowrap' fullWidth={false} className={displayClasses} direction='column' parent>
          <AdminHeader>
            <Flex className={classes['header-content']} justify='between' parent>
              <IconButton
                size={2}
                color='white'
                onClick={this.handleToggleLeftNavbar}>
                <Icon>
                  {openLeftNavbar ? <MdClose /> : <MdMenu />}
                </Icon>
              </IconButton>
              <IconButton
                size={2}
                color='white'>
                <Icon>
                  <MdAccountCircle />
                </Icon>
              </IconButton>
            </Flex>
          </AdminHeader>
          <Flex className={classes['container']} parent>
            <Test />
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

    const displayAnimateClasses = {
      enter: classes['display-enter'],
      enterActive: classes['display-enter-active'],
      enterDone: classes['display-enter-done'],
      exit: classes['display-exit'],
      exitActive: classes['display-exit-active'],
      exitDone: classes['display-exit-done']
    }

    return !adminContext.auth ? <Redirect to={`${match.path}/login`} /> : (
      <Flex className={rootClasses} parent wrap='nowrap' >
        {animate ?
          (<CSSTransition
            in={openLeftNavbar}
            timeout={200}
            classNames={leftNavbarAnimateClasses}
            {...this.animateBusyHandlers}
          >
            {leftNavbar}
          </CSSTransition>) : openLeftNavbar && leftNavbar}
        {animate ?
          (<CSSTransition
            in={openLeftNavbar}
            timeout={200}
            classNames={displayAnimateClasses}
            {...this.animateBusyHandlers}
          >
            {Display(true)}
          </CSSTransition>) : Display(false, openLeftNavbar)}
      </Flex>
    )
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
  adminContext: PropTypes.object.isRequired,
  className: PropTypes.string,
  match: PropTypes.object.isRequired,
}

AdminHome.defaultProps = {
  className: '',
}

const styledAdminHome = withAdminContext(withStyles(styles)(AdminHome))

styledAdminHome.displayName = 'AdminHome'

module.exports = styledAdminHome
