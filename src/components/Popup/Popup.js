import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { breakpointNames } from '../../theme/breakpoints'
import Panel from '../Panel'
import childrenTypeChecker from '../../../custom_modules/children-type-checker'
import { CSSTransition } from 'react-transition-group'

const width = breakpointNames.filter(x => x !== 'xs')

const widthStyles = theme => width.reduce((acc, val) => {
  acc = {
    ...acc,
    [`popup-width-${val}`]: {
      width: theme.breakpoints[val]
    }
  }
  return acc
}, {})

const bodyFixerStyles = {
  '@global': {
    'body': {
      overflow: 'hidden',
      paddingRight: 15
    }
  }
}

const BodyFixer = () => null
const BodyFixerWithStyles = withStyles(bodyFixerStyles)(BodyFixer)


const styles = theme => {

  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      overflow: 'auto',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: theme.zIndex.Popup,
    },
    'root-enter': {
      opacity: 0,
      transition: theme.transition('all')
    },
    'root-enter-active': {
      opacity: 1,
    },
    'root-exit': {
      opacity: 1,
      transition: theme.transition('all')
    },
    'root-exit-active': {
      opacity: 0,
    },
    ...widthStyles(theme),
    popup: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    },
    'popup-full-width': {
      width: '100%'
    },
    'popup-full-screen': {
      marginTop: 0,
      marginBottom: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    'popup-body': {
      paddingTop: theme.unit * 3,
      paddingBottom: theme.unit * 3
    },
    'popup-body-full-screen': {
      paddingRight: theme.unit * 4,
      paddingLeft: theme.unit * 4,
      flex: 1,
      overflow: 'auto'
    },
    'popup-footer-full-screen': {
      paddingTop: theme.unit * 2,
      paddingBottom: theme.unit * 2,
      paddingRight: theme.unit * 4,
      paddingLeft: theme.unit * 4
    }
  }
}

class Popup extends React.Component {
  rootRef = React.createRef()

  handleClick = (event) => {
    const didClickCover = event.target === this.rootRef.current
    if (didClickCover) {
      this.props.onClose(event)
    }
  }

  resolveChildren = (children) => {
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

  render() {
    const {
      children,
      classes,
      className,
      open,
      width,
      fullWidth,
      fullScreen,
      animate,
      /* eslint-disable */
      //Just to catch ...others properly, some props are extracted.
      onClose,
      theme,
      /* eslint-enable */
      ...others
    } = this.props

    const { PopupHeader, PopupBody, PopupFooter } = this.resolveChildren(children)


    const rootClasses = classNames({
      [classes.root]: true,
      [className]: true
    })

    const popupClasses = classNames({
      [classes.popup]: true,
      [classes[`popup-width-${width}`]]: true,
      [classes['popup-full-width']]: fullWidth,
      [classes['popup-full-screen']]: fullScreen,
    })

    const popupBodyClasses = classNames({
      [classes['popup-body']]: true,
      [classes['popup-body-full-screen']]: fullScreen,
    })

    const popupFooterClasses = classNames({
      [classes['popup-footer-full-screen']]: fullScreen,
    })

    const root = (
      <div {...others} className={rootClasses} onClick={this.handleClick} ref={this.rootRef}>
        <BodyFixerWithStyles />
        <Panel padding={fullScreen ? 0 : 1} border={fullScreen ? 0 : 1} radius={fullScreen ? 0 : 2} className={popupClasses}>
          <div>{PopupHeader && <PopupHeader.type {...PopupHeader.props} full={fullScreen} />}</div>
          <div className={popupBodyClasses}>{PopupBody}</div>
          <div className={popupFooterClasses}>{PopupFooter}</div>
        </Panel>
      </div>
    )

    return (
      animate ? <CSSTransition
        in={open}
        unmountOnExit
        timeout={200}
        classNames={{
          enter: classes['root-enter'],
          enterActive: classes['root-enter-active'],
          exit: classes['root-exit'],
          exitActive: classes['root-exit-active'],
        }}
      >
        {root}
      </CSSTransition> : open && root
    )
  }
}

Popup.propTypes = {
  children: childrenTypeChecker({
    'PopupBody': [true, 1],
    'PopupHeader': [false, 1],
    'PopupFooter': [false, 1],
  }),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.oneOf(width),
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  animate: PropTypes.bool,
}

Popup.defaultProps = {
  className: '',
  open: false,
  width: 'sm',
  fullWidth: false,
  fullScreen: false,
  animate: true
}

const styledPopup = withStyles(styles)(Popup)

styledPopup.displayName = 'Popup'

export default styledPopup
