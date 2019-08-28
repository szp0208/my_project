/*
 * author: wxq
 * createdTime: 2019/06/10
 * */

/**
 * dateApi                     api
 * searchParams
 */
import React, {PureComponent} from 'react'
import {
  Cascader
} from 'antd'
import {getData} from 'util'
class CsxFormCascader extends PureComponent {
  constructor() {
    super()
    this.state = {
      menu: '' // 下拉菜单
    }
  }
  componentDidMount() {
    const {
        dateApi,
        data
    } = this.props
    if (data) {
      let menu = this.getMenu(data)
      this.setState({
        menu
      })
    } else {
      dateApi && this.getAsyncDate(dateApi)
    }
  }
  getAsyncDate(dateApi) {
    let reqData = {api: dateApi}
    const {searchParams} = this.props
    if (searchParams) {
      reqData.searchParams = searchParams
    }
    getData(reqData).then(data => {
      if (data.result) {
        let menu = this.getMenu(data.result)

        this.setState({menu})
      }
    })
  }

  // 组合treeData数据，数据格式如下
  // [label: 'Node1',value: '001',children: []]
  getMenu(data) {
    // 以后要改 todo
    // const {selectItem} = this.props
    // let childrenBox = []
    // for (let i = 0; i < data.length; i++) {
    //   let box = {}
    //   box.title = Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => data[i][x]).join('') : data[i][selectItem.valueKey]
    //   box.value = data[i][selectItem.key]
    //   box.key = data[i][selectItem.key]
    //   if (data[i].children) {
    //     // box.isLeaf = true
    //     box.children = this.getMenu(data[i].children)
    //   }
    //   childrenBox.push(box)
    // }
    // return childrenBox
    return data
  }

  // 选中下拉框的回调
  onChange = (key, valueObj) => {
    let obj = key.length ? {
      value: valueObj,
      children: key
    } : undefined
    this.props.onChange(obj)
  }
  render() {
    const {
      value,
      style
    } = this.props
    const {menu} = this.state
    return (
      <Cascader
        style={style}
        placeholder="请选择"
        value={value && value.children}
        options={menu}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        onChange={this.onChange}
      />
    )
  }
}
export default CsxFormCascader
