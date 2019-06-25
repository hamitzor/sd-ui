import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

const styles = theme => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box',
      fontSize: 18
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      backgroundColor: theme.color.background.normal,
      fontFamily: `'Source Sans Pro', sans-serif`
    },
  },
})

const StyleFixer = () => <div id="style-fixer"></div>

StyleFixer.propTypes = {
  classes: PropTypes.object
}

const StyledStyleFixer = withStyles(styles)(StyleFixer)

StyledStyleFixer.displayName = 'StyleFixer'

export default StyledStyleFixer