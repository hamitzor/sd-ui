import PropTypes from 'prop-types'

const PopupBody = props => {
  return props.children
}

PopupBody.propTypes = {
  children: PropTypes.any.isRequired
}

PopupBody.displayName = 'PopupBody'

export default PopupBody
