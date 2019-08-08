const PropTypes = require('prop-types')

const PopupBody = props => {
  return props.children
}

PopupBody.propTypes = {
  children: PropTypes.any
}

PopupBody.displayName = 'PopupBody'

module.exports = PopupBody
