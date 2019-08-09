const React = require('react')
const Test = require('./Test')
const StyleFixer = require('../components/StyleFixer')

class App extends React.Component {

  render() {
    return <React.Fragment>
      <StyleFixer />
      <Test />
    </React.Fragment>
  }
}

module.exports = App