import React, { Component } from 'react'
import {
  Layout,
  Icon,
  Modal,
  Button
} from 'antd'
import { history } from 'RouterAdmin'
import Debounce from 'lodash-decorators/debounce'
import {
  API_LOGOUT
} from 'api'
import {
  getData
} from 'util'
import styles from '../style/globalHeader.scss'
const { Header } = Layout

export default class GlobalHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false, // 弹出框 按钮loading
      visible: false, // 是否显示弹出框
      type: '0', // 弹框类型
      collapsed: false,
      navArr: [
        {id: 1, name: '操作中心', path: 'gss/home'}
      ]
    }
  }
  componentDidMount() {

  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props
    onCollapse(!collapsed)
    this.triggerResizeEvent()
  }

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  }

  _choosePath = item => {
    if (item && item.item) {
      let keyPath = `/${item.item.props.keyPath}`
      if (window.location.pathname == keyPath) return false
      history.replace(keyPath)
    }
  }

  _logOut = () => this.setState({ visible: true, type: '0' })

  /*--------- 弹出框 ---------- */

  /* 退出 确定按钮 */
  handleLogputOk = () => {
    this.setState({ confirmLoading: true })

    logOut(() => this.setState({ confirmLoading: false, visible: false }))
  }

  /* 取消按钮 */
  handleCancel = () => this.setState({ visible: false })

  /* 提示框类型选择 */
  switchType = value => {
    if (value === '0') {
      return (
        <LogoutPopUp
          wrapClassName=""
          visible={this.state.visible}
          onOk={this.handleLogputOk}
          onCancel={this.handleCancel}
          loading={this.state.confirmLoading}
        />
      )
    }
  }
  render() {
    const { navArr } = this.state
    const { collapsed } = this.props
    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div
          className={styles.headerMenu}
          onClick={this._choosePath}
          style={{ lineHeight: '60px', float: 'left' }}
        >
          {
            navArr && navArr.map((item, index) => <div key={index}>
              <div onClick={() => { window.location.href = `/${item.path}` }} style={item.id === 70 ? { color: '#4A91E8' } : {}}> {item.name}</div>
              <div style={item.id === 70 ? { backgroundColor: '#4A91E8', width: 70, height: 4, marginTop: -4 } : {}} />
            </div>
            )
          }
        </div>
        <div onClick={this._logOut} className={styles.logout}></div>
        {this.state.visible && this.state.type && this.switchType(this.state.type)}
      </Header>
    )
  }
}

/* 退出 弹出框 */
class LogoutPopUp extends Component {
  render() {
    const {
      wrapClassName,
      visible,
      onOk,
      onCancel,
      loading
    } = this.props

    return (
      <Modal
        wrapClassName={wrapClassName}
        visible={visible}
        title='系统提示'
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onOk}>
            确定
          </Button>
        ]}
      >
        <p style={{ textIndent: '40px' }}>确认退出登录？</p>
      </Modal>
    )
  }
}

export function logOut(callback) {
  getData({ api: API_LOGOUT })
  callback && typeof callback == 'function' && callback()
  window.localStorage.clear()
  window.sessionStorage.clear()
  history.replace('/')
}
