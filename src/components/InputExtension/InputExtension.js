const PropTypes = require('prop-types')

const InputExtension = props => {
  return props.children
}

InputExtension.propTypes = {
  children: PropTypes.element.isRequired
}

InputExtension.displayName = 'InputExtension'

module.exports = InputExtension
