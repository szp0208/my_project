/*
 * author: wxq
 * createdTime: 2019/04/11
 * */

/**
 * label                       string                 false               label文字
 * dateApi                     api
 * date                        [{key：'', value: ''}]
 * onChangeSelect              func                                       下拉框改变的回调
 * type                        string[search,arrow]   arrow               下拉需不需要下拉的箭头
 * selectItem                  [{key：'', value: ''}]
 * searchParams
 */
import React, {PureComponent} from 'react'
import {
  TreeSelect
} from 'antd'
import {getData} from 'util'
import Debounce from 'lodash-decorators/debounce'

class CsxSelect extends PureComponent {
  constructor() {
    super()
    this.state = {
      selectValue: '', // 选择的值
      menu: [] // 下拉菜单
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
  // [title: 'Node1',value: '0-0',key: '0-0',children: []]
  getMenu(data) {
    const {selectItem} = this.props
    let childrenBox = []
    for (let i = 0; i < data.length; i++) {
      let box = {}
      box.title = Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => data[i][x]).join('') : data[i][selectItem.valueKey]
      box.value = data[i][selectItem.key]
      box.key = data[i][selectItem.key]
      if (data[i].children) {
        // box.isLeaf = true
        box.children = this.getMenu(data[i].children)
      }
      childrenBox.push(box)
    }
    return childrenBox
  }

  // 选中下拉框的回调
  onMenuItemClick(value, label, extra) {
    if (value) {
      this.setState({
        selectValue: value.toString()
      })
      this.props.onChangeSelect({value: value.toString(), children: value})
    }
  }
  // 手动输入
  @Debounce(600)
  changeInput(value) {
    const {selectValue} = this.state
    const {selectItem} = this.props
    let res = selectValue ? `${selectValue},${value}` : value
    this.props.onChangeSelect({value: res, children: selectItem.data.children})
  }
  render() {
    const {
      label,
      selectItem
    } = this.props
    const {
      menu
    } = this.state
    return (
      <div className='commonInput'>
          <label>{label}：</label>
          <div className='box' ref={r => this.node = r}>
            <TreeSelect
              treeCheckable={true}
              allowClear={true}
              treeData={menu}
              dropdownMatchSelectWidth={false}
              // showCheckedStrategy={TreeSelect.SHOW_PARENT}
              treeNodeLabelProp={'value'}
              placeholder="请选择"
              value={selectItem && selectItem.data.children}
              onChange={(value, label, extra) => {
                this.onMenuItemClick(value, label, extra)
              }}
              onSearch={(value) => {
                this.changeInput(value)
              }}
              treeNodeFilterProp={'title'}
              onFocus={() => {
                let node = this.node.querySelector('.ant-select-selection--multiple')
                let node1 = this.node.firstChild
                node.style.height = 'auto'
                node1.style.height = 'auto'
              }}
              onBlur={() => {
                let node = this.node.querySelector('.ant-select-selection--multiple')
                let node1 = this.node.firstChild
                node.style.height = '32px'
                node1.style.height = '32px'
              }}
              // onFocus={handleFocus}
              // onBlur={handleBlur}
            >
            </TreeSelect>
          </div>
      </div>
    )
  }
}
export default CsxSelect
