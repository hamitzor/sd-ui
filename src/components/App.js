const React = require('react')
const { Fragment } = require('react')
const { AppProvider } = require('../context/AppContext')
const { BrowserRouter: Router, Route, Switch } = require('react-router-dom')
const { getWidth } = require('../theme/getWidth')
const Test = require('./Test')
const StyleFixer = require('./StyleFixer')
const Admin = require('./Admin')
const config = require('../../app.config')


class App extends React.Component {

  state = {
    width: getWidth()
  }

  componentDidMount() {
    const component = this
    window.onresize = function () {
      component.setState({
        width: getWidth()
      })
    }
  }

  getContext = () => {
    return {
      appContext: {
        width: this.state.width,
        apiEndpoints: config.endpointUrl,
        domain: config.domain,
        port: config.port
      }
    }
  }

  render() {
    return (
      <AppProvider value={this.getContext()}>
        <StyleFixer />
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Test} />
              <Route path='/admin' component={Admin} />
            </Switch>
          </Fragment>
        </Router>
      </AppProvider>
    )
  }
}

module.exports = App