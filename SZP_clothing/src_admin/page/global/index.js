import React, { PureComponent } from 'react'
import { Layout, Tabs } from 'antd'
import GlobalHeader from './components/GlobalHeader'
import GlobalSlider, { logOut } from './components/GlobalSlider'
import './style/reset.less'
import { getVariant } from 'Variant'
import { connect } from 'react-redux'
import { history } from 'RouterAdmin'
import { mapDispatchToProps } from '../../redux/map'
const TabPane = Tabs.TabPane
const homePath = '/gss/home'
let title
function getTitleNameFromPathMap(arr, pathname) {
  for (let i = 0; i < arr.length; i++) {
    if (`/${arr[i].path}` === pathname) {
      title = arr[i].name
      break
    } else if (Array.isArray(arr[i].children)) {
      getTitleNameFromPathMap(arr[i].children, pathname)
    }
  }
  return title
}

@connect(
  state => ({ userInfos: state.userInfos }),
  mapDispatchToProps
)
export default class CoreLayout extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      initflag: false,
      panes: [],
      activeKey: null,
      collapsed: false, // 默认：false
    }
  }

  componentDidMount() {
    let userInfos = JSON.parse(getVariant('userInfos'))
    if (!this.props.userInfos || !this.props.userInfos.id) {
      if (!userInfos) {
        logOut() // 返回登录页
        return
      }
    }
    this.props.updateUser({ previewData: '已登录', userInfos })
    const { location: { pathname } } = this.props
    console.log(pathname, homePath);
    if (pathname !== homePath || pathname == '/') this.initTab()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      if (!this.curPage) return
      if (Object.prototype.toString.call(this.curPage) === '[object String]') {
        // dropByCacheKey(`/${this.curPage}`)
        return
      }
      const { name, path } = this.curPage
      const { panes } = this.state
      if (panes.find(item => item.key === path)) return
      let panesArr = []
      let arr = panes.concat({ content: nextProps.children, title: name, key: path.replace(/^\//, '') })
      arr.map((item) => {
        item.title != undefined ? panesArr.push(item) : null
      })
      this.setState({
        activeKey: path.replace(/^\//, ''),
        panes: panesArr
      })
    }
  }

  initTab = () => {
    const { location: { pathname } } = this.props
    const pathMap = JSON.parse(localStorage.getItem('b2bGssMenu')) || []
    const title = getTitleNameFromPathMap(pathMap, pathname)
    this.setState({
      activeKey: pathname.replace(/^\//, ''),
      panes: [({ content: this.props.children, title, key: pathname.replace(/^\//, '') })]
    })
  }

  onLinkChange = ({ name, path }) => {
    this.curPage = { name, path }
    this.onTabChange(path)
  }

  onTabChange = (activeKey) => {
    const newKey = activeKey.replace(/^\//, '')  // 去除开头的斜线('/')
    history.replace(`/${newKey}`)
    this.setState({ activeKey })
  }

  onTabEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key
      } else {
        activeKey = panes[0].key
      }
    }
    this.setState({ panes, activeKey }, () => {
      this.curPage = targetKey
      history.replace(`/${activeKey}`)
    })
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    const { collapsed, panes, activeKey } = this.state
    const { location, userInfos } = this.props
    return (
      <Layout>
        <GlobalSlider
          onLinkChange={this.onLinkChange}
          onCollapse={this.onCollapse}
          collapsed={collapsed}
          location={location}
          userInfos={userInfos}
        />
        <Layout style={{ minWidth: '1100px' }}>
          <GlobalHeader
            onCollapse={this.onCollapse}
            collapsed={collapsed}
            location={location}
          />
          <Layout className="container" style={{ padding: '0px 20px', minWidth: '1090px' }}>
            {
              location.pathname !== homePath &&
              <Tabs
                hideAdd
                onChange={this.onTabChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={this.onTabEdit}
              >
                {panes.map(pane => <TabPane closable={panes.length !== 1} tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
              </Tabs>
            }
            {location.pathname === homePath && this.props.children}
            {/* {this.props.children} */}
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
