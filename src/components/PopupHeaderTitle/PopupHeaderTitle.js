const React = require('react')
const PropTypes = require('prop-types')

const PopupHeaderTitle = props => {
  return <span className={props.className}>{props.children}</span>
}

PopupHeaderTitle.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
}

PopupHeaderTitle.displayName = 'PopupHeaderTitle'

module.exports = PopupHeaderTitle
