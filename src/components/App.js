import React, { Fragment } from 'react'
import { AppProvider } from '../context/AppContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getWidth } from '../theme/getWidth'
import Test from './Test'
import StyleFixer from './StyleFixer'
import Admin from './Admin'
import config from '../../app.config'


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

export default App