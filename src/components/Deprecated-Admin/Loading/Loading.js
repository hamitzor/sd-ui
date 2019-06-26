const React = require('react')
const Grid = require('@material-ui/core/Grid')
const { withStyles } = require('@material-ui/core/styles')
const CircularProgress = require('@material-ui/core/CircularProgress')



const styles = theme => ({
  loadingContainer: {
    height: '100vh',
    width: '100%',
  }
})


const Loading = props => (
  <Grid container justify='center' alignItems='center' className={props.classes.loadingContainer}>
    <CircularProgress size={100} thickness={1} />
  </Grid>
)


export default withStyles(styles)(Loading)

