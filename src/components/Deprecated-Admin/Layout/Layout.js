/*




const React = require('react')
const PropTypes = require('prop-types')
const { withStyles } = require('@material-ui/core/styles')
const AppBar = require('@material-ui/core/AppBar')
const Toolbar = require('@material-ui/core/Toolbar')
const Typography = require('@material-ui/core/Typography')
const IconButton = require('@material-ui/core/IconButton')
const AccountCircle = require('@material-ui/icons/AccountCircle')
const withAdminContext = require('../../../context/adminContext')
const { Link } = require('react-router-dom')
const Footer = require('../Footer')

const styles = theme => {

  const { spacing: {
    unit
  } } = theme

  return {
    AppBarRoot: {
      height: unit * 8,
      justifyContent: 'center'
    },
    grow: {
      flexGrow: 1
    },
    root: {}
  }
}

class Layout extends React.Component {

  state = {
    performingLogout: false
  }

  handleLogout = async () => {
    try {
      await this.logout()
    } catch (err) {
      //@TODO handle logout error
      console.log(err)
    }
  }

  logout = async () => {

    const { loggedOutCallback, sessionAPIEndPoint: endpoint } = this.props

    this.setState({
      performingLogout: true
    }, async () => {
      try {
        const res = await fetch(endpoint, { method: 'DELETE' })

        if (res.status === 200) {
          this.setState({ performingLogout: false })
          loggedOutCallback()
        } else {
          this.setState({ performingLogout: false })
          throw { status: res.status }
        }
      } catch (err) {
        throw err
      }
    })
  }

  render() {
    const { auth, width, classes } = this.props

    const { performingLogout } = this.state
    return (
      <div className={classes.root}>
        <AppBar
          position='static'
          classes={{
            root: classes.AppBarRoot
          }}>
          <Toolbar>
            <Link
              to='/admin'
              style={{
                color: 'inherit',
                textDecoration: 'none'
              }}
              className={classes.grow}>
              <Typography
                variant='h6'
                color='inherit'>
                hamitzor.com | Admin Panel
              </Typography>
            </Link>
            {auth && (
              <div>
                <IconButton
                  color='inherit'
                  disabled={performingLogout}
                  onClick={this.handleLogout}>
                  <AccountCircle />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {this.props.children}
        {!auth && <Footer width={width}></Footer>}
      </div>
    )
  }
}

Layout.propTypes = {
  auth: PropTypes.bool,
  classes: PropTypes.object.isRequired
}

export default withAdminContext(withStyles(styles)(Layout))





*/