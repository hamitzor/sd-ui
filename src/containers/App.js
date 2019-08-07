const React = require('react')
const { Fragment } = require('react')
const { Route, Switch } = require('react-router-dom')
const { getWidth } = require('../theme/get-width')
const StyleFixer = require('../components/StyleFixer')
const Admin = require('../components/Admin')
const { getSession } = require('../actions/auth')
const { connect } = require('react-redux')
const PropTypes = require('prop-types')
const {
  INITIAL_WIDTH_CALCULATED,
  WIDTH_CHANGED,
  LANGUAGE_CHANGED
} = require('../constants/action-types')

class App extends React.Component {

  state = {
    appInitialized: false
  }

  async componentDidMount() {
    const { dispatch } = this.props
    await dispatch(getSession())
    this.setState({
      appInitialized: true
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

  componentDidUpdate() {
    const { dispatch, match: { params: { lang } } } = this.props
    dispatch({
      type: LANGUAGE_CHANGED,
      lang
    })
  }

  render() {
    const { appInitialized } = this.state
    const { match: { url } } = this.props
    return (
      <Fragment>
        <StyleFixer />
        {appInitialized ?
          (<Fragment>
            <Switch>
              <Route path={`${url}/admin`} component={Admin} />
              <Route exact={true} path={`${url}`} component={() => <div>Home</div>} />
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </Fragment>) : <div>Loading...</div>}
      </Fragment>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

module.exports = connect()(App)