const React = require('react')
const PropTypes = require('prop-types')
const { withStyles } = require('@material-ui/core/styles')
const AppBar = require('@material-ui/core/AppBar')
const Toolbar = require('@material-ui/core/Toolbar')
const Typography = require('@material-ui/core/Typography')
const { Link } = require('react-router-dom')

const styles = theme => {

  const { spacing: {
    unit
  } } = theme

  return {
    appBarRoot: {
      height: unit * 8,
      justifyContent: 'center'
    },
    link: {
      flexGrow: 1,
      color: 'inherit',
      textDecoration: 'none'
    }
  }
}

class LoginHeader extends React.Component {

  render() {
    const { classes, title } = this.props

    return (
      <AppBar
        position='static'
        classes={{
          root: classes.appBarRoot
        }}>
        <Toolbar>
          <Link
            to='/admin'
            className={classes.link}>
            <Typography
              variant='h6'
              color='inherit'>
              {title}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

LoginHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
}

LoginHeader.defaultProps = {
  title: 'hamitzor.com | Admin Panel'
}

export default withStyles(styles)(LoginHeader)