const PropTypes = require('prop-types')

const Icon = props => {
  return props.children
}

Icon.propTypes = {
  children: PropTypes.element.isRequired
}

Icon.displayName = 'Icon'

module.exports = Icon
