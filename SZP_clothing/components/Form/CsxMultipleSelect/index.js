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
  Select, Icon
} from 'antd'
import {getData} from 'util'
const Option = Select.Option
class CsxMultipleSelect extends PureComponent {
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
      let menuObj
      menuObj = this.getMenu(data)
      this.setState({
        ...menuObj
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
        let menuObj = this.getMenu(data.result)
        this.setState({...menuObj})
      }
    })
  }

  // 组合menu菜单
  getMenu(data) {
    const {selectItem} = this.props
    let menu = data.map((o, i) => <Option key={o[selectItem.key]} value={o[selectItem.key]}>{Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => o[x]).join('') : o[selectItem.valueKey]}</Option>)
    return {
      menu
    }
  }
  // 选中下拉框的回调
  onMenuItemClick(key) {
    // valueObj.value = valueObj.eventKey
    this.props.onChangeSelect({value: key.toString(), children: key})
  }
  render() {
    const {
      label,
      type,
      selectItem,
      style
    } = this.props
    const {
      menu
    } = this.state
    if (!selectItem.data) {
      selectItem.data = {}
    }
    return (
      <div className='commonInput'>
          {
            label ? <label>{label}：</label> : null
          }
          <div className='box' ref={r => this.node = r}>
            {
              type ? <div className='icon-box'>
                  <Icon type={type} />
                </div> : null
            }
            <Select
              showSearch
              style={style}
              mode="tags"
              allowClear={true}
              tokenSeparators={[',']}
              showArrow={type ? false : true}
              optionLabelProp={'value'}
              dropdownMatchSelectWidth={false}
              placeholder="请选择"
              value={selectItem && selectItem.data.children}
              optionFilterProp="children"
              onChange={(key) => {
                this.onMenuItemClick(key)
              }}
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
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {menu}
            </Select>
          </div>
      </div>
    )
  }
}
export default CsxMultipleSelect
