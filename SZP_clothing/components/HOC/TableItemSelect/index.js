/*
 * author: zero
 * createdTime: 2018/04/09
 * */

import React, {PureComponent} from 'react'
import {
  Select,
  Form
} from 'antd'
import {getData} from 'util'
import {SUCCESSCODE} from 'enum'
import PropTypes from 'prop-types'

const fetchControlTime = 500 // 节流时间间隔
const defaultStyle = {width: '100%'}

class NativeSelect extends React.Component {
  static propTypes = {
    allowClear: PropTypes.bool,
    dropdownMatchSelectWidth: PropTypes.bool,
    filterOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  }
  static defaultProps = {
    allowClear: true,
    dropdownMatchSelectWidth: false,
    filterOption: true
  }
  constructor(props) {
    super(props)
    this.state = {
      children: this.initChildren(props)
    }
    this.handleSearch = this.handleSearch().bind(this)
  }
  componentWillMount() {
    if (this.props.listConfig) {
      this.handleFetchList(this.props.listConfig)
    }
  }
  componentWillReceiveProps(props) {
    if (this.props.listConfig !== props.listConfig) {
      props.listConfig && this.handleFetchList(props.listConfig)
    }
    if (this.props.list !== props.list) {
      this.setState({children: this.initChildren(props)})
    }
  }
  componentDidMount() {
    // this.props.isAutoFocus && this.focus()
  }
  componentWillUnmount() {
    this.unMount = true
  }
  handleFetchList(listConfig) {
    getData(listConfig).then(data => {
      if (this.unMount || !data) {
        return
      }
      if (data.code === SUCCESSCODE) {
        this.setState({children: this.renderChildren(data.result, this.props)})
      }
    })
  }
  handleSearch() {
    let preTime = 0,
      lastFetch
    return value => {
      const {onSearch} = this.props

      if (!onSearch) {
        return
      }
      let now = +new Date()

      if (now - preTime < fetchControlTime) {
        clearTimeout(lastFetch)
      }
      preTime = now
      lastFetch = setTimeout(() => {
        !this.unMount && onSearch(value)
      }, fetchControlTime)
    }
  }
  initChildren(props) {
    const {list, children} = props
    if (list) {
      return this.renderChildren(list, props)
    } else {
      return children
    }
  }
  renderChildren(list, props) {
    const {
      listRenderGetLabel = this.getLabel,
      listRenderGetValue = this.getValue,
      beforeListRender
    } = props
    const {listRenderGetShow = listRenderGetLabel} = props
    if (beforeListRender) {
      list = beforeListRender(list)
    }
    return list.map(item => {
      let value = listRenderGetValue(item)
      let key = value
      let show = listRenderGetShow(item)
      let label = listRenderGetLabel(item)
      return <Select.Option key={key} value={value} show={show}>{label}</Select.Option>
    })
  }
  getValue(item) {
    return item.code
  }
  getLabel(item) {
    return item.value
  }
  loadStyle(style) {
    return Object.assign({}, defaultStyle, style)
  }
  focus() {
    this.select.focus()
  }
  blur() {
    this.select.blur()
  }
  render() {
    const {
      style,
      ...props
    } = this.props
    const {children} = this.state
    const selectProps = {
      ...props,
      style: this.loadStyle(style),
      onSearch: this.handleSearch,
      optionLabelProp: 'show',
      children
    }
    return (
      <Select {...selectProps} ref={node => this.select = node}/>
    )
  }
}

const FormItem = Form.Item

export default class TableItemSelect extends PureComponent {
  render() {
    const {
      formItemClass,
      formItemId,
      validateStatus,
      help,
      initialValue,
      ...props
    } = this.props

    const FormItemSettings = {
      initialValue,
      className: formItemClass,
      id: formItemId,
      validateStatus: validateStatus || 'success',
      help: help || ''
    }

    const selectSettings = {
      defaultValue: initialValue,
      // 影响输入，出现输入不完整
      value: initialValue,
      ...props
    }

    return (
      <FormItem {...FormItemSettings}>
        <NativeSelect {...selectSettings} ref={node => this.select = node}/>
      </FormItem>
    )
  }
}
