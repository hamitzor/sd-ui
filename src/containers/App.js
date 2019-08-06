const React = require('react')
const { Fragment } = require('react')
const { BrowserRouter: Router, Route, Switch } = require('react-router-dom')
const { getWidth } = require('../theme/getWidth')
const StyleFixer = require('../components/StyleFixer')
const Admin = require('../components/Admin')
const { getSession } = require('../actions/auth')
const { connect } = require('react-redux')

class App extends React.Component {

  state = {
    initialAuthCheckDone: false
  }

  async componentDidMount() {
    const { dispatch } = this.props
    await dispatch(getSession())
    this.setState({
      initialAuthCheckDone: true
    })
  }

  render() {
    const { initialAuthCheckDone } = this.state

    return (
      <Fragment>
        <StyleFixer />
        {initialAuthCheckDone ? (<Router>
          <Fragment>
            <Switch>
              <Route path='/admin' component={Admin} />
            </Switch>
          </Fragment>
        </Router>) : <div>Loading...</div>}
      </Fragment>
    )
  }
}

module.exports = connect()(App)