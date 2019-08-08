const React = require('react')
const PropTypes = require('prop-types')
const { connect } = require('react-redux')
const { Redirect, Route, Switch } = require('react-router-dom')


class Home extends React.Component {
  render() {
    const {
      userSession: { user, authanticated },
      match: { url },
      lang,
      location
    } = this.props

    if (!authanticated) {
      return <Redirect to={{
        pathname: `${url}/login`,
        state: { from: location }
      }} />
    }

    return (
      <Switch>
        <Route path={`${url}/dashboard`} component={() => <div>{lang === 'tr' ? 'Merhaba' : 'Hello'}, {user.name}</div>} />
        <Route path={url} component={() => <Redirect to={`${url}/dashboard`} />} />
      </Switch>
    )
  }
}

Home.propTypes = {
  match: PropTypes.object.isRequired,
  userSession: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
}

Home.defaultProps = {
  className: '',
  width: 'lg'
}

module.exports = connect(state => ({
  userSession: state.userSession,
  width: state.width,
  lang: state.lang
}))(Home)
