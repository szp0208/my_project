import thunk from 'redux-thunk' // redux-thunk解决异步回调
// import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import {initState} from './models.js'
const middleware = [thunk]
if (process.env.NODE_ENV === 'development') { // dev环境显示打印log
                                              // middleware.push(createLogger())
}

const enhancer = compose(
  applyMiddleware(...middleware), // 中间件
  window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
)
const stores = createStore(rootReducer, initState, enhancer) // 创建 store

// if (module.hot) {
//   module.hot.accept('../reducers', () => {
//     const reducers = require('../reducers').default
//
//     stores.replaceReducer(reducers(stores.asyncReducers))
//   })
// }

export default stores
