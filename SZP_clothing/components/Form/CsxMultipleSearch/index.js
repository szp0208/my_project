import React, {PureComponent} from 'react'
import {
  Select, Spin, Icon
} from 'antd'
import {getData} from 'util'
import Debounce from 'lodash-decorators/debounce'

const Option = Select.Option
class CsxMultipleSearch extends PureComponent {
  constructor() {
    super()
    this.state = {
      fetching: false,
      menu: '' // 下拉菜单
    }
  }
  componentDidMount() {
  }
  @Debounce(600)
  getAsyncDate(key) {
    if (!key) return
    const {dateApi} = this.props
    const {searchParamsKey} = this.props
    let reqData = searchParamsKey ? {[searchParamsKey]: key} : {key, size: 10}
    this.setState({fetching: true})
    dateApi && getData({api: dateApi, searchParams: reqData}).then(data => {
      let menu = this.getMenu(data.result || [])
      this.setState({menu, fetching: false})
    })
  }
  // 组合menu菜单
  getMenu(data) {
    const {selectItem} = this.props
    let menu = data.map((o, i) => <Option key={o[selectItem.key]} value={o[selectItem.key]}>{Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => o[x]).join('') : o[selectItem.valueKey]}</Option>)
    return menu
  }
  // 选中下拉框的回调
  onMenuItemClick(key) {
    // valueObj.value = valueObj.eventKey
    this.props.onChangeSelect({value: key.toString(), children: key})
  }
  render() {
    const {
      label,
      selectItem,
      style
    } = this.props
    const {
      menu,
      fetching
    } = this.state
    return (
      <div className='commonInput'>
          <label>{label}：</label>
          <div className='box' ref={r => this.node = r}>
            <Select
              allowClear={true}
              mode="multiple"
              optionLabelProp={'value'}
              dropdownMatchSelectWidth={false}
              value={selectItem && selectItem.data && selectItem.data.children}
              placeholder="请输入"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onChange={(key) => {
                this.onMenuItemClick(key)
              }}
              onSearch={(key) => {
                this.getAsyncDate(key)
              }}
              style={style}
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
            >
              {menu}
            </Select>
            <Icon type="search" className="icon-box" />
          </div>
      </div>
    )
  }
}
export default CsxMultipleSearch
