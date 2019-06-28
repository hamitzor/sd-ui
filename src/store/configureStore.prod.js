const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk')
const rootReducer = require('../reducers')

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

module.exports = configureStore
