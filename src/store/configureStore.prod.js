const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk')
const api = require('../redux-middlewares/api')
const rootReducer = require('../reducers')

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api)
)

export default configureStore
