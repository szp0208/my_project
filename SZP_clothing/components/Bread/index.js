import React, {Component} from 'react'
import {Breadcrumb} from 'antd'
import style from './index.scss'

export default class Bread extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {route} = this.props
    return (
      <div className={style.overHidden}>
        <div className={style.iconStyle}></div>
        <Breadcrumb className={style.breadcrumb}>
          {
            route && route.map((item, index) =>
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            )
          }
        </Breadcrumb>
      </div>
    )
  }
}
