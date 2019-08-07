const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Flex = require('../Flex')
const Text = require('../Text')

const styles = theme => {
  return {
    root: {
      backgroundColor: theme.color.primary.normal
    },
    container: {
      padding: `${theme.unit * 2}px ${theme.unit * 2}px`,
      [theme.bigger('sm')]: {
        padding: `${theme.unit * 3}px ${theme.unit * 5}px`,
      },
      textAlign: 'center',
      fontWeight: 600
    }
  }
}

const AdminFooter = props => {
  const {
    classes
  } = props

  const rootClasses = classNames({
    [classes.root]: true
  })

  const containerClasses = classNames({
    [classes.container]: true,
  })

  return (
    <Flex className={rootClasses} justify='center' alignItems='center' parent>
      <Flex className={containerClasses} xs={12}>
        <Text size='small' color='white'>© 2011 SceneDetector All Rights Reserved</Text>
      </Flex>
    </Flex>
  )
}

AdminFooter.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styledAdminFooter = withStyles(styles)(AdminFooter)

styledAdminFooter.displayName = 'AdminFooter'

module.exports = styledAdminFooter
