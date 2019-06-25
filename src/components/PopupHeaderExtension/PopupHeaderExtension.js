import PropTypes from 'prop-types'

const PopupHeaderExtension = props => {
  return props.children
}

PopupHeaderExtension.propTypes = {
  children: PropTypes.any.isRequired
}

PopupHeaderExtension.displayName = 'PopupHeaderExtension'

export default PopupHeaderExtension
