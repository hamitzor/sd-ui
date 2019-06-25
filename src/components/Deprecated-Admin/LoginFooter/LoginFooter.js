import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const styles = theme => {
  const { spacing: {
    unit
  } } = theme

  return {
    footerGrid: {
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
      height: unit * 8
    },
    footerText: {
      paddingRight: unit * 3,
      paddingLeft: unit * 4
    }
  }
}

const LoginFooter = props => {

  const {
    copyrightStatement,
    email,
    width,
    classes
  } = props

  return (
    <footer>
      <Grid className={classes.footerGrid} container justify="space-between" alignItems="center">
        <Grid item xs={12} sm={7}>
          <Typography
            className={classes.footerText}
            variant="body1"
            align={width === "xs" ? "center" : "left"}
            color="inherit">{copyrightStatement}</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography
            className={classes.footerText}
            variant="body1"
            align={width === "xs" ? "center" : "right"}
            color="inherit">{email}</Typography>
        </Grid>
      </Grid>
    </footer>
  )
}

LoginFooter.propTypes = {
  copyrightStatement: PropTypes.string,
  email: PropTypes.string,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  classes: PropTypes.object.isRequired
}

LoginFooter.defaultProps = {
  copyrightStatement: '2019 Hamit Zor All Rights Reserverd',
  email: 'thenrerise@gmail.com',
  width: 'xl'
}

export default withStyles(styles)(LoginFooter)