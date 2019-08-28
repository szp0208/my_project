import React, {PureComponent} from 'react'
import {
  Select, Spin, Icon, message
} from 'antd'
import {getData, stripscript} from 'util'
import Debounce from 'lodash-decorators/debounce'
import styles from "../style.scss";

const Option = Select.Option
class CsxSearch extends PureComponent {
  constructor() {
    super()
    this.state = {
      fetching: false,
      menu: '' // 下拉菜单
    }
  }
  componentDidMount() {
  }
  @Debounce(1000)
  getAsyncDate(key) {
    if (!key) return
    const {dateApi, errMessage, searchParamsKey, searchParams,keyWordsLength} = this.props
    if (keyWordsLength && key.length >= keyWordsLength  || !keyWordsLength) {
      let reqData = searchParamsKey ? {[searchParamsKey]: key} : {key, size: 10}
      reqData = {...searchParams, ...reqData}
      this.setState({fetching: true})
      //去除搜索的特殊字符串
      for (let n in reqData) {
        reqData[n] = stripscript(reqData[n])?stripscript(reqData[n]):'0';
      }
      dateApi && getData({api: dateApi, searchParams: reqData, errMessage}).then(data => {
        let menu = this.getMenu(data.result || [])
        this.setState({menu, fetching: false})
      })
    }else{
      message.warning('请输入至少4位数编码')
    }


  }
  // 组合menu菜单
  getMenu(data) {
    const {selectItem} = this.props
    let menu = data.map((o, i) => <Option key={o[selectItem.key]} value={o[selectItem.key]}>{Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => o[x]).join(' ') : o[selectItem.valueKey]}</Option>)
    return menu
  }
  // 选中下拉框的回调
  onMenuItemClick(key) {
    const {onChangeSelect, onSelect} = this.props;
    if (key) {
      onChangeSelect && onChangeSelect({
        value: key,
        children: key
      })
    } else {
      onChangeSelect && onChangeSelect('')
      onSelect && onSelect('')
    }
  }
  onSelect(value, option) {
    let jud = this.props.selectItem&&Array.isArray(this.props.selectItem.valueKey)&&this.props.selectItem.valueKey.length > 1?true:false;
    this.props.onSelect({
      value: option.props.eventKey,
      children: jud? option.props.children.replace(option.props.value, '') : option.props.children
    })
  }
  render() {
    const {
      label,
      antd,
      selectItem,
      style,
      require,
      boxWidth, //box的宽度设置
    } = this.props
    const {
      menu,
      fetching
    } = this.state
    return (
      <div className='commonInput'>
        {
          label ? <label className={require ? 'show_required' : ''}>{label}：</label> : null
        }
        <div className='box' ref={r => this.node = r} style={{'maxWidth': boxWidth?boxWidth:'70%'}}>
          <Select
            allowClear={true}
            showArrow={false}
            showSearch
            // mode="combobox"
            {...antd}
            // optionLabelProp={'value'}
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
            onSelect={(value, option) => {
              this.onSelect(value, option)
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
export default CsxSearch
