import PropTypes from 'prop-types'

const Icon = props => {
  return props.children
}

Icon.propTypes = {
  children: PropTypes.element.isRequired
}

Icon.displayName = 'Icon'

export default Icon
