const React = require('react')
const { Fragment } = require('react')
const { BrowserRouter: Router, Route, Switch } = require('react-router-dom')
const { getWidth } = require('../theme/get-width')
const StyleFixer = require('../components/StyleFixer')
const Admin = require('../components/Admin')
const { getSession } = require('../actions/auth')
const { connect } = require('react-redux')
const PropTypes = require('prop-types')
const {
  INITIAL_WIDTH_CALCULATED,
  WIDTH_CHANGED
} = require('../constants/action-types')

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

    dispatch({
      type: INITIAL_WIDTH_CALCULATED,
      value: getWidth()
    })

    window.onresize = function () {
      dispatch({
        type: WIDTH_CHANGED,
        value: getWidth()
      })
    }
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

module.exports = connect()(App)