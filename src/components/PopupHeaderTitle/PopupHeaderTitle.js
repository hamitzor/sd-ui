import React from 'react'
import PropTypes from 'prop-types'

const PopupHeaderTitle = props => {
  return <span className={props.className}>{props.children}</span>
}

PopupHeaderTitle.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
}

PopupHeaderTitle.displayName = 'PopupHeaderTitle'

export default PopupHeaderTitle
