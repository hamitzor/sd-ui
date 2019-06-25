import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'



const styles = theme => ({
  loadingContainer: {
    height: '100vh',
    width: '100%',
  }
})


const Loading = props => (
  <Grid container justify="center" alignItems="center" className={props.classes.loadingContainer}>
    <CircularProgress size={100} thickness={1} />
  </Grid>
)


export default withStyles(styles)(Loading)

