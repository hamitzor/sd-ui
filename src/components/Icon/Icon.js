const PropTypes = require('prop-types')

const Icon = ({ children }) => children

Icon.propTypes = {
  children: PropTypes.element.isRequired
}

Icon.displayName = 'Icon'

module.exports = Icon