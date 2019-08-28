/*
 * author: wxq
 * createdTime: 2019/04/11
 * */

/**
 * dateApi                     api
 * date                        ArraryString
 */
import React, {PureComponent} from 'react'
import {
  Icon,
  Menu,
  Dropdown
} from 'antd'
import {getData} from 'util'
import './index.less'

class CsxSelect extends PureComponent {
  constructor() {
    super()
    this.state = {
      menu: <Menu></Menu>, // 下拉菜单
      selectItem: {}, //当前选中的菜单
      iconType: 'down'
    }
  }
  componentDidMount() {
    const {
        dateApi,
        data,
        label
    } = this.props
    let menuObj
    if (data) {
      menuObj = this.getMenu(data)
    } else {
      dateApi && this.getAsyncDate(dateApi)
    }
    this.setState({
      label,
      ...menuObj
    })
  }
  getAsyncDate(dateApi) {
    let reqData = {api: dateApi}
    const {searchParams} = this.props
    if (searchParams) {
      reqData.searchParams = searchParams
    }
    getData(reqData).then(data => {
      if (data.result) {
        let menuObj = this.getMenu(data.result)
        this.setState({...menuObj})
      }
    })
  }

  // 组合menu菜单
  getMenu(data) {
    const {selectItem} = this.props
    let menu = <Menu onClick={ (item) => {
      this.onMenuItemClick(item)
    }}>
        {
        data.map((o, i) => <Menu.Item key={o[selectItem.key]}>{o[selectItem.valueKey]}</Menu.Item>)
        }
    </Menu>
    return {
      menu
    }
  }
  // 选中下拉框的回调
  onMenuItemClick(item) {
    let reqData = {
      value: item.item.props.eventKey,
      children: item.item.props.children
    }
    this.props.onChangeSelect(reqData)
    this.setState({
      iconType: 'down'
    })
  }

  // 菜单显示状态改变时
  onDropDownStateChange(nowState) {
    this.setState({
      iconType: nowState ? 'up' : 'down'
    })
  }
  render() {
    const {
      selectItem
    } = this.props
    const {
      menu,
      iconType
    } = this.state
    return (
        <Dropdown className="fos-allState" overlay={menu} trigger={['click']} onVisibleChange={(nowState) => {
          this.onDropDownStateChange(nowState)
        }}>
            <a className="ant-dropdown-link" href="#">
              {selectItem && selectItem.data.children || '全部状态'}<Icon type={iconType} />
            </a>
        </Dropdown>
    )
  }
}
export default CsxSelect
