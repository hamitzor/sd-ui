const { createStore, applyMiddleware, compose } = require('redux')
const thunk = require('redux-thunk').default
const { createLogger } = require('redux-logger')
const rootReducer = require('../reducers')
const DevTools = require('../containers/DevTools')

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk,  createLogger()),
      DevTools.instrument()
    )
  )
  return store
}

module.exports = configureStore
