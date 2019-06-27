const { createStore, applyMiddleware, compose } = require('redux')
const thunk = require('redux-thunk')
const { createLogger } = require('redux-logger')
const api = require('../redux-middlewares/api')
const rootReducer = require('../reducers')
const DevTools = require('../containers/DevTools')

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  )
  return store
}

export default configureStore
