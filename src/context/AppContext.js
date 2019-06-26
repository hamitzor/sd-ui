const React = require('react')
const { createContext } = require('react')
const { Provider: AppProvider, Consumer: AppConsumer } = createContext()



const withAppContext = (Component) => (
  props => (
    <AppConsumer>
      {value => <Component {...value} {...props}></Component>}
    </AppConsumer>
  )
)

withAppContext.displayName = 'withAppContext'


module.exports = { AppProvider, AppConsumer, withAppContext }