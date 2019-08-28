/*
 * author: Jimmy
 * createdTime: 2018/04/09
 * */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <section>
        <div style={{fontSize: 14}}>
          对不起你迷路了
          <Link to="/gss/home">返回首页</Link>
        </div>
      </section>
    )
  }
}
