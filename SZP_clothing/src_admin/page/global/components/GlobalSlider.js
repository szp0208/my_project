import React, {PureComponent} from 'react'
import {Layout, Menu, Icon} from 'antd'
import {getMenuData, menuData} from './menuData'
import {NavLink, Link} from 'react-router-dom'
import Debounce from 'lodash-decorators/debounce'
import {Popup} from 'HOC'
import {API_LOGOUT} from 'api'
import {getData} from 'util'
import styles from '../style/globalSlider.scss'

const {Sider} = Layout
const {SubMenu} = Menu

export default class GlobalSlider extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      menus: getMenuData(),
      visible: false, // 是否显示弹出框
      type: '0', // 弹框类型
      openKeys: [],
      props
    }
  }

  componentDidMount() {
    this.setState({
      openKeys: this.getDefaultCollapsedSubMenus(this.state.props)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps)
      })
    }
  }

  handleNavEvent = item => {
    const {onLinkChange} = this.props
    onLinkChange && onLinkChange(item)
  }

  getDefaultCollapsedSubMenus = (props) => {
    const {location: {pathname}} = props || this.props
    const snippets = pathname.split('/').slice(1, -1)
    const currentPathSnippets = snippets.map((item, index) => {
      const arr = snippets.filter((_, i) => i <= index)
      return arr.join('/')
    })
    return currentPathSnippets
  }

  getFlatMenuKeys = (menus) => {
    let keys = []
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path)
        keys = keys.concat(this.getFlatMenuKeys(item.children))
      } else {
        keys.push(item.path)
      }
    })
    return keys
  }
  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.state.menus)
    return flatMenuKeys.filter((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`
      const itemRegExp = new RegExp(itemRegExpStr)
      return itemRegExp.test(path.replace(/^\//, '').replace(/\/$/, ''))
    })
  }
  getNavMenuItems = (menusData) => {
    if (!menusData) return []
    return menusData.map((item) => {
      if (!item.name) return null
      let itemPath
      if (item.path && item.path.indexOf('http') === 0) {
        itemPath = item.path
      } else {
        itemPath = `/${item.path || ''}`.replace(/\/+/g, '/')
      }
      if (item.children && item.children.some(child => child.name)) {
        return item.hideInMenu ? null :
          (
            <SubMenu
              title={
                item.icon ? (
                  <span>
                    <Icon type={item.icon} className={styles.icon}/>
                    <span>{item.name}</span>
                  </span>
                ) : item.name
              }
              key={item.key || item.path}
            >
              {this.getNavMenuItems(item.children)}
            </SubMenu>
          )
      }
      const icon = item.icon && <Icon type={item.icon}/>
      return item.hideInMenu ? null :
        (
          <Menu.Item key={item.key || item.path}>
            {
              <a onClick={this.handleNavEvent.bind(this, item)} >
                {icon}<span>{item.name}</span>
              </a>
            }
          </Menu.Item>
        )
    })
  }

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const isMainMenu = this.state.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    )
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys]
    })
  }

  /* 开关切换 */
  toggle = () => {
    const {collapsed, onCollapse} = this.props
    onCollapse(!collapsed)
    this.triggerResizeEvent()
  }

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  }

  /* 退出 */
  _logOut = () => this.setState({visible: true, type: '0'})

  /*--------- 弹出框 ---------- */

  /* 退出 确定按钮 */
  handleLogputOk = () => logOut(() => this.setState({visible: false}))

  /* 取消按钮 */
  handleCancel = () => this.setState({visible: false})

  /* 提示框类型选择 */
  switchType = value => {
    if (value === '0') {
      return (
        <Popup
          visible={this.state.visible}
          onOk={this.handleLogputOk}
          onCancel={this.handleCancel}
          content={<p style={{textIndent: '40px'}}>确认退出登录？</p>}
        />
      )
    }
  }

  /*--------- 弹出框 ---------- */

  render() {
    const {collapsed, location: {pathname}, onCollapse, userInfos} = this.props
    const {openKeys} = this.state
    const menuProps = collapsed ? {} : {openKeys}
    let selectedKeys = this.getSelectedMenuKeys(pathname)
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onCollapse={onCollapse}
        width={200}
        className={styles.sider}
      >
        <div className={styles.logoGroup}>
          <Link to="/gss/home" className={styles.logo}>
            <img className={styles.logoImg} src={collapsed ? '/image/logoSmall.svg' : '/image/logo.svg'} alt="logo" />
          </Link>
        </div>
        <div className={styles.userGroiup}>
          <div className={styles.userBox}>
            <div className={styles.userPhotoGroup}>
              <img className={styles.userPhotoImg} src="/image/userPhoto.svg" alt="头像"/>
              <div className={styles.logoOut} title="退出" onClick={this._logOut}><img src="/image/logout.png" alt="退出"/></div>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.phone} style={{display: collapsed ? 'none' : 'inline-block'}}>{userInfos.telephone}</span>
              <span className={styles.trigger} onClick={this.toggle} title={collapsed ? '展开' : '收起'}><Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} /></span>
            </div>
          </div>
        </div>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{padding: '10px 0', width: '100%'}}
        >
          {this.getNavMenuItems(this.state.menus)}
        </Menu>
        {this.state.visible && this.state.type && this.switchType(this.state.type)}
      </Sider>
    )
  }
}

export function logOut(callback) {
  getData({api: API_LOGOUT}) // 退出
  callback && typeof callback == 'function' && callback()
  window.localStorage.clear()
  window.sessionStorage.clear()
  window.location.href = '/'
}
