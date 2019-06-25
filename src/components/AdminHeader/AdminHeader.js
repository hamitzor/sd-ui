import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import Flex from '../Flex'


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
    classes,
    className,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [className]: true
  })


  return (
    <Flex className={rootClasses} justify="center" alignItems="center" parent>
      {children}
    </Flex>
  )
}

AdminHeader.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

AdminHeader.defaultProps = {
  children: '',
  className: ''
}

const styledAdminHeader = withStyles(styles)(AdminHeader)

styledAdminHeader.displayName = 'AdminHeader'

export default styledAdminHeader
