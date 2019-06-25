import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import childrenTypeChecker from '../../../custom_modules/children-type-checker'

const styles = () => {
  return {
    root: {
      listStyleType: 'none',
      padding: 0,
      margin: 0
    },
  }
}


const resolveChildren = (children, props) => {
  let result = []
  React.Children.forEach(children,
    (child, i) => {
      if (child) {
        result.push(<child.type
          {...child.props}
          onSelect={(e) => {
            if (props.onSelect) {
              props.onSelect(e, child.props.itemId, i)
            }
          }}
          key={i}
          hoverable={props.hoverable} >
        </child.type>)
      }
    }
  )
  return result
}

const List = props => {
  const {
    classes,
    className,
    children,
    /* eslint-disable */
    //Just to catch ...others properly, some props is extracted.
    hoverable,
    theme,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [className]: true
  })

  return (
    <ul
      className={rootClasses}
      {...others}>
      {resolveChildren(children, props)}
    </ul>
  )
}

List.propTypes = {
  children: childrenTypeChecker({
    'ListItem': [true],
  }),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  onSelect: PropTypes.func,
}

List.defaultProps = {
  className: '',
  hoverable: true
}

const styledList = withStyles(styles)(List)

styledList.displayName = 'List'

export default styledList