const React = require('react')
const PropTypes = require('prop-types')
const withStyles = require('react-jss').default

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
      backgroundColor: theme.color.background,
      fontFamily: "'Quicksand', sans-serif",
      fontStyle: 'normal'
    },
    'h1,h2,h3,h4,h5,h6': {
      fontWeight: 600
    }
  },
})

const StyleFixer = () => <div id='style-fixer'></div>

StyleFixer.propTypes = {
  classes: PropTypes.object
}

const StyledStyleFixer = withStyles(styles)(StyleFixer)

StyledStyleFixer.displayName = 'StyleFixer'

module.exports = StyledStyleFixer