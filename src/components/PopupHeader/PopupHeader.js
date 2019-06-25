import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import childrenTypeChecker from '../../../custom_modules/children-type-checker'
import classNames from 'classnames'

const color = ['primary', 'secondary', 'error']

const colorStyles = theme => color.reduce((acc, val) => {
  acc = {
    ...acc,
    [`root-color-${val}`]: {
      backgroundColor: theme.color[val].normal,
      padding: `${theme.unit * 3}px ${theme.unit * 4}px`
    }
  }
  return acc
}, {})

const styles = theme => {
  return {
    root: {
      display: 'flex',
    },
    title: {
      fontWeight: 600,
      color: theme.color.text.normal
    },
    'title-white': {
      color: theme.color.white
    },
    ...colorStyles(theme)
  }
}

const resolveChildren = (children) => {
  const returnValue = {}

  React.Children.forEach(children,
    (child) => {
      if (child) {
        const displayName = child.type.displayName
        returnValue[displayName] = child
      }
    }
  )

  return returnValue
}

const PopupHeader = props => {
  const {
    children,
    classes,
    color,
    full,
    className,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    /* eslint-enable */
    ...others
  } = props

  const { PopupHeaderTitle, PopupHeaderExtension } = resolveChildren(children)

  const rootClasses = classNames({
    [classes.root]: true,
    [classes['root-full']]: full,
    [classes[`root-color-${color}`]]: full,
    [className]: true
  })

  const titleClasses = classNames({
    [classes.title]: true,
    [classes['title-white']]: full
  })

  return <div className={rootClasses} {...others}>
    {
      [
        PopupHeaderTitle && <PopupHeaderTitle.type {...PopupHeaderTitle.props} key='title' className={titleClasses} />,
        PopupHeaderExtension
      ]
    }
  </div>
}

PopupHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(color),
  full: PropTypes.bool,
  children: childrenTypeChecker({
    'PopupHeaderTitle': [false, 1],
    'PopupHeaderExtension': [false, 1],
  })
}

PopupHeader.defaultProps = {
  className: '',
  color: 'primary',
  full: false
}

const styledPopupHeader = withStyles(styles)(PopupHeader)

styledPopupHeader.displayName = 'PopupHeader'

export default styledPopupHeader
