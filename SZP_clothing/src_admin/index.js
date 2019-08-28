import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import {history} from 'RouterAdmin'
import stores from './redux/store'
import './base.less'
import routes from './router/router'
import {LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
// import {AppContainer} from 'react-hot-loader'

/* zero 添加 ant design pro 样式 */
import 'ant-design-pro/dist/ant-design-pro.css'

try {
  if (window.yh_trace) {
    window.yh_trace.initReact(history, 'yh-b2b-crm') // 参数为路由对象、项目标识
  }
} catch (e) {
  console.error('init trace failed!')
}

ReactDOM.render(
  <Provider store={stores}>
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Route path='/' component={routes}/>
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)
