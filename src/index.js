require('core-js/stable')
require('regenerator-runtime/runtime')

const React = require('react')
const { render } = require('react-dom')
const App = require('./components/App')
const { ThemeProvider } = require('react-jss')
const theme = require('./theme/')
const { BrowserRouter: Router } = require('react-router-dom')



render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)