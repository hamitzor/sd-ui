const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default
const classNames = require('classnames')




const styles = theme => {
  return {
    root: {
      backgroundColor: theme.color.background.panel,
      minHeight: theme.unit * 8,
      display: 'block',
      color: theme.color.text.normal,
      transition: theme.transition('background-color'),
      '&::selection': {
        backgroundColor: 'transparent'
      }
    },
    hoverable: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.color.grey[200]
      },
      '&:active': {
        backgroundColor: theme.color.grey[100]
      }
    },
    selected: {
      backgroundColor: theme.color.grey[400]
    }
  }
}

const ListItem = props => {
  const {
    classes,
    className,
    children,
    hoverable,
    onSelect,
    selected,
    /* eslint-disable */
    //Just to catch ...others properly, theme prop is extracted.
    theme,
    itemId,
    /* eslint-enable */
    ...others
  } = props

  const rootClasses = classNames({
    [classes.root]: true,
    [classes.hoverable]: hoverable,
    [classes.selected]: selected,
    [className]: true
  })
  return (
    <li {...others} className={rootClasses} onClick={onSelect}>{children}</li>
  )
}

ListItem.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  data: PropTypes.object,
}

ListItem.defaultProps = {
  className: '',
  hoverable: true,
  onSelect: undefined,
  selected: false,
}

const styledListItem = withStyles(styles)(ListItem)

styledListItem.displayName = 'ListItem'

module.exports = styledListItem
