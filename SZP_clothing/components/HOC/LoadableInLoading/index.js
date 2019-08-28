/*
* outher: zero
* createdTime: 2018/01/22
* effect：避免加载组件时的闪烁。 有时组件加载非常快，小于 200ms，提示加载的组件会在界面上一闪而过。
*
* Loadable({
*  loader: () => import('./component'),
*  LoadableInLoading: LoadableInLoading,
*  delay: 300
* });
*
* delay 的默认值是 200ms，但你也可以使用第三个参数来设置 delay 时长 。
* */

import React, {Component} from 'react'
import style from './index.scss'

/* 组件加载出错显示 */
/*class Error extends Component {
  render() {
    return (<div>Error!</div>)
  }
}*/

/* loading 组件 */
class Loading extends Component {
  render() {
    return (<div className={style.loadingWrap}></div>)
  }
}

export default function LoadableInLoading({error, pastDelay}) {
  if (error) {
    console.error(`${error.code && error.code.split('_').join(' ').toLocaleLowerCase()} \n【components】to`, error)
    return <Loading/>
  } else if (pastDelay) {
    return <Loading/>
  } else {
    return null
  }
}
