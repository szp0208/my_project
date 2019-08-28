import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import Loadable from 'react-loadable'
import { createBrowserHistory } from 'history'
import CoreLayout from '../page/global'
import { Loading } from 'HOC'
import title from 'Title'
import { bundleComponent } from './Bundles'

export const history = createBrowserHistory()
// processApproval

const login = Loadable({ loader: () => import('../page/login'), loading: Loading, render: bundleComponent('登录') })
const home = Loadable({ loader: () => import('../page/home'), loading: Loading, render: bundleComponent('主页') })
const notFound404 = Loadable({ loader: () => import('../page/notFound404'), loading: Loading, render: bundleComponent("你迷路了") })

const staffCenter = Loadable({  //员工管理中心
  loader: () => import('../page/staffCenter'),
  loading: Loading,
  render: bundleComponent('员工中心')
})

/**
 *  TODO:
 * 路由 以/gss//开头
 */
const mainLayout = () =>
  <CoreLayout location={history.location}>
    <Router history={history}>
      <CacheSwitch>
        <CacheRoute exact path='/gss/home' cacheKey='/gss/home' component={home} />
        {/*---------- 系统设置 system ----------*/}
        <CacheRoute exact
          path='/gss/staffMag/staffCenter'
          cacheKey='/gss/staffMag/staffCenter'
          component={staffCenter} title='员工中心'
        />
        {/*----------- 404  -------------------*/}
        <CacheRoute path="/gss/404" component={notFound404} />
        <Redirect from='*' to="/gss/404" />
      </CacheSwitch>
    </Router>
  </CoreLayout>
export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={login} />
      <Route exact path="/gss/login" component={login} />
      <Route component={mainLayout} />
    </Switch>
  </Router>
)
