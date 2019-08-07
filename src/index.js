require('core-js/stable')
require('regenerator-runtime/runtime')

const React = require('react')
const { render } = require('react-dom')
const { BrowserRouter: Router } = require('react-router-dom')
const Root = require('./containers/Root')
const configureStore = require('./store/configureStore')
const { ThemeProvider } = require('react-jss')
const theme = require('./theme')


const store = configureStore()

render(
  <ThemeProvider theme={theme}>
    <Router>
      <Root store={store} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)
