import PropTypes from 'prop-types'

const InputExtension = props => {
  return props.children
}

InputExtension.propTypes = {
  children: PropTypes.element.isRequired
}

InputExtension.displayName = 'InputExtension'

export default InputExtension
