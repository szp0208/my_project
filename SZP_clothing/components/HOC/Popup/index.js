/*
 * author: zero
 * createdTime: 2018/04/27
 * */

import React, {PureComponent} from 'react'
import {
  Button,
  Modal
} from 'antd'
import lodash from 'lodash'

export default class Popup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      loading: false
    }
  }

  componentWillUnmount() {
    this.setState({
      visible: false,
      loading: false
    })
  }

  /* 弹出框 确认按钮 */
  handleOk = e => {
    const {
      onOk
    } = this.props

    this.setState({
      loading: true
    }, () => lodash.isFunction(onOk) && onOk())
  }

  /* 弹出框 取消按钮 */
  handleCancel = e => {
    const {
      onCancel
    } = this.props

    this.setState({
      visible: false
    }, () => lodash.isFunction(onCancel) && onCancel())
  }

  render() {
    const {
      visible,
      title,
      content,
      okType,
      footer,
      cancelText,
      okText,
      ...props
    } = this.props

    const settings = {
      ...props,
      visible: visible || this.state.visible,
      title: title || '系统提示',
      onOk: this.handleOk,
      footer: typeof footer != 'undefined' ? footer : (
        <div>
          <Button key="back" onClick={this.handleCancel}>{cancelText || '取消'}</Button>
          <Button key="submit" type={okType || 'primary'} loading={this.state.loading} onClick={this.handleOk}>
            {okText || '确定'}
          </Button>
        </div>
      )
    }

    return (
      <Modal {...settings}>
        {content}
      </Modal>
    )
  }
}
