/*
 * author: wxq
 * createdTime: 2019/04/11
 * szp：2019-08-12 更改第69行onMenuItemClick方法，添加匹配字符串，把children里的key去除
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
  Select, Icon, Spin
} from 'antd'
import {getData, stripscript} from 'util'
import styles from '../style.scss'
const Option = Select.Option
class CsxSelect extends PureComponent {
  constructor() {
    super()
    this.state = {
      menu: '', // 下拉菜单
      fetching: false
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(newProps, newStates) {
    const {data} = this.props
    if ( data && JSON.stringify(data) != JSON.stringify(newProps.data) ) {
      let menuObj
      menuObj = this.getMenu(data)
      this.setState({
        ...menuObj
      })
    }
  }
  getAsyncDate(dateApi) {
    const {searchParams, errMessage} = this.props
    let reqData = {api: dateApi, errMessage}
    if (searchParams) {
      reqData.searchParams = searchParams
    }
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
    let jud = this.props.selectItem&&Array.isArray(this.props.selectItem.valueKey)&&this.props.selectItem.valueKey.length > 1?true:false;
    this.props.onChangeSelect({
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
  };
  //  清空按钮事件
  onChange=(key)=>{
    if (!key){
      this.props.onChangeSelect({})
    }
  };
  render() {
    const {
      label,
      type,
      selectItem,
      placeholder,
      style,
      antd,
      showBoth,
      defaultValue,
      require,
      boxWidth
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
          label ? <label className={require ? 'show_required' : ''}>{label}：</label> : null
        }
        <div className='box' style={{'maxWidth': boxWidth?boxWidth:'70%'}}>
          {
            type ? <div className='icon-box'>
              <Icon type={type} />
            </div> : null
          }
          <Select
            defaultValue={defaultValue||''}
            showSearch
            {...antd}
            allowClear={true}
            style={style}
            showArrow={type ? false : true}
            dropdownMatchSelectWidth={false}
            placeholder={placeholder || '请选择'}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            value={ showBoth ? `${selectItem.data.value}${selectItem.data.children}` : selectItem.data.children}
            optionFilterProp="children"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            onSelect={(key, valueObj) => {
              this.onMenuItemClick(key, valueObj)
            }}
            onChange={( key )=>{
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
export default CsxSelect
