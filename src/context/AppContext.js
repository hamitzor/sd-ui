import React, { createContext } from 'react'
const { Provider: AppProvider, Consumer: AppConsumer } = createContext()



const withAppContext = (Component) => (
  props => (
    <AppConsumer>
      {value => <Component {...value} {...props}></Component>}
    </AppConsumer>
  )
)

withAppContext.displayName = 'withAppContext'


export { AppProvider, AppConsumer, withAppContext }