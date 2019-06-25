import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

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