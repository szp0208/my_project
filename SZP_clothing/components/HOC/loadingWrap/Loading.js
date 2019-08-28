/**
 * Created by wangjun on 2018/1/25.
 */
import React from 'react'
import {Spin} from 'antd'
import './index.css'

export default class Loading extends React.Component {
  render() {
    return <div className={this.props.visible ? 'mask' : 'hiden'}>
      <span className="center">
        { /* <span className="point5Loading">
          <span className="point5"></span>
        </span>
        <span className="point4Loading">
          <span className="point4"></span>
        </span>
        <span className="point3Loading">
          <span className="point3"></span>
        </span>
        <span className="point2Loading">
          <span className="point2"></span>
        </span>
        <span className="point1Loading">
          <span className="point1"></span>
        </span>*/}
        <Spin/>
      </span>
    </div>
  }
}
