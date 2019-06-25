import PropTypes from 'prop-types'

const PopupFooter = props => {
  return props.children
}

PopupFooter.propTypes = {
  children: PropTypes.any.isRequired
}

PopupFooter.displayName = 'PopupFooter'

export default PopupFooter
