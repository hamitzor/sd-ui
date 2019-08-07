const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')
const Flex = require('../Flex')


const styles = theme => {
  return {
    root: {
      backgroundColor: theme.color.primary.normal,
      minHeight: theme.unit * 10
    }
  }
}

const AdminHeader = props => {
  const {
    children,
    classes
  } = props

  const rootClasses = classNames({
    [classes.root]: true
  })

  return (
    <Flex className={rootClasses} justify='center' alignItems='center' parent>
      {children}
    </Flex>
  )
}

AdminHeader.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired
}

AdminHeader.defaultProps = {
  children: '',
}

const styledAdminHeader = withStyles(styles)(AdminHeader)

styledAdminHeader.displayName = 'AdminHeader'

module.exports = styledAdminHeader
