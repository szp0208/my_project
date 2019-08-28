/*
 * author: wxq
 * createdTime: 2019/04/11
 * */

/**
 * label                       string                 false               label文字
 * dateApi                     api
 * date                        [{key：'', value: ''}]
 * type                        string[search,arrow]   arrow               下拉需不需要下拉的箭头
 * selectItem                  [{key：'', value: ''}]
 * searchParams
 */
import React, {PureComponent} from 'react'
import {
  Icon,
  Select,
  Spin
} from 'antd'
import {getData} from 'util'
import styles from "../style.scss";
const Option = Select.Option
class CsxFormSelect extends PureComponent {
  constructor() {
    super()
    this.state = {
      menu: '', // 下拉菜单
      fetching: false
    }
  }
  componentDidMount() {

  }
  getAsyncDate(dateApi) {
    const {searchParams, errMessage} = this.props
    let reqData = {api: dateApi, errMessage}
    if (searchParams) {
      reqData.searchParams = searchParams
    }
    this.setState({fetching: true})
    getData(reqData).then(data => {
      if (data.result) {
        let menuObj = this.getMenu(data.result)
        this.setState({...menuObj, fetching: false})
      }
    })
  }

  // 组合menu菜单
  getMenu(data) {
    const {selectItem} = this.props;
    let menu;
    if (selectItem.disabledOption){
      const disabledOption = selectItem.disabledOption;
      menu = data.map( (o,i)=> {
        return <Option
          disabled={ Object.values(disabledOption)[0].indexOf( o[ Object.keys( disabledOption )[0] ]) >=0 }
          key={o[selectItem.key]} value={o[selectItem.key]}>{Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => o[x]).join('') : o[selectItem.valueKey]}</Option>
      } )
    } else{
      menu = data.map((o, i) => <Option
        key={o[selectItem.key]} value={o[selectItem.key]}>{Array.isArray(selectItem.valueKey) ? selectItem.valueKey.map((x, y) => o[x]).join('') : o[selectItem.valueKey]}</Option>)
    }
    return {
      menu
    }
  }
  // 选中下拉框的回调
  onMenuItemClick(key, valueObj) {
    const {onChange, handleSelectChange} = this.props
    let jud = this.props.selectItem&&Array.isArray(this.props.selectItem.valueKey)&&this.props.selectItem.valueKey.length > 1?true:false;
    onChange({
      value: valueObj.props.value,
      children: jud?valueObj.props.children.replace(valueObj.props.value, ''):valueObj.props.children
    })
    handleSelectChange && handleSelectChange({
      value: valueObj.props.value,
      children: jud?valueObj.props.children.replace(valueObj.props.value, ''):valueObj.props.children
    })
  }
  // 聚焦的回调
  handleFocus = () => {
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
  onChange=(key)=>{
    const {handleSelectChange} = this.props;
    if (!key) {
      handleSelectChange && handleSelectChange('')
    }
  }
  render() {
    const {
      type,
      value,
      style,
      antd,
      placeholder,
      showValue,
      selectItem,
      showBoth,
      label,
      maxWidth,
    } = this.props
    const {
      menu,
      fetching
    } = this.state
    if (!selectItem.data) {
      selectItem.data = {}
    }
    return (
      <div className='commonInput'>
        {
          label ? <label className={require ? styles.require : ''}>{label}：</label> : null
        }
        <div className='box' style={{'maxWidth': maxWidth?maxWidth: '100%', 'margin': '5px 0 0 0 '}}>
          {
            type ? <div className='icon-box'>
              <Icon type={type} />
            </div> : null
          }
          <Select
            allowClear={true}
            showSearch
            {...antd}
            style={{width: '100%', ...style}}
            showArrow={type ? false : true}
            dropdownMatchSelectWidth={false}
            placeholder={placeholder || "请选择"}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            value={ showBoth ? `${selectItem.data.value}${selectItem.data.children}` : selectItem.data.children}
            optionFilterProp="children"
            optionLabelProp={ showValue || 'children'}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            onSelect={(key, valueObj) => {
              this.onMenuItemClick(key, valueObj)
            }}
            onChange={(key)=>{
              this.onChange(key)
            }}
            onFocus={this.handleFocus}
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
export default CsxFormSelect
