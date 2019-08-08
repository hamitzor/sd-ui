const React = require('react')
const { Fragment } = require('react')
const { Route, Switch } = require('react-router-dom')
const { getWidth } = require('../theme/get-width')
const StyleFixer = require('../components/StyleFixer')
const Admin = require('./Admin')
const { getSession } = require('../actions/auth')
const { connect } = require('react-redux')
const PropTypes = require('prop-types')
const Login = require('./Login')
const Home = require('./Home')

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
    const { lang } = this.props

    return (
      <Fragment>
        <StyleFixer />
        {appInitialized ?
          (<Fragment>
            <Switch>
              <Route path={`/${lang}/admin`} component={Admin} />
              <Route path={`/${lang}/login`} component={Login} />
              <Route path={`/${lang}`} component={Home} />
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </Fragment>) : <div>Loading...</div>}
      </Fragment>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
}

module.exports = connect(state => ({
  lang: state.lang
}))(App)