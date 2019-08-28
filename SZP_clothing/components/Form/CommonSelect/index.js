/**
 * allowClear                       boolean                 false               清除所有
 * className                        string                  null                formItem样式
 * decorator                        string                  'label'             表单注册标识符
 * disabled                         boolean                 false               禁用
 * filterOption                     boolean|function        参考antd            筛选配置
 * getFieldDecorator                function                必选                Form表单注册
 * hasPaste                         boolean                 false               是否粘贴添加
 * message                          string                  参考antd            校验失败提示信息
 * mode                             string                  参考antd            模式
 * onBlur                           function                null                失去焦点回调
 * onFocus                          function                null                获得焦点回调
 * onSearch                         function（              null                查询回调（节流300ms）
 *                                    value,                                    查询结果
 *                                    time                                      当前查询时间戳
 *                                  ）
 * placeholder                      string                  ''                  占位符
 * initialValue                     array|string            null                初始值
 * isHideRequireIcon                boolean                 false               必填项icon是否显示
 * list                             array                   []                  数据（优先级高于children）
 * listConfig                       object                  null                异步加载数据
 * listFilter                       function                null                数据筛选
 * listRender                       function                null                数据渲染函数（优先级高于listRenderGetKey与listRenderGetValue）
 * listRenderGetKey                 function                null                数据key渲染函数
 * listRenderGetValue               function                null                数据显示值渲染函数
 * required                         boolean                 false               必填项
 * size                             string                  'default'           规格（参考antd）
 * style                            object                  {                   样式
 *                                                            width: '100%',
 *                                                            height: '30px'
 *                                                          }
 * tokenSeparators                  string                  null                间隔符
 * type                             string                  参考antd            校验类别
 * validateFirst                    boolean                 参考antd            校验是否中断
 */
import React, {Component} from 'react'
import {Form, Select} from 'antd'
import {connect} from 'react-redux'
import {getData} from 'util'
import _ from 'lodash'
const FormItem = Form.Item
const Option = Select.Option
const defaultStyle = {width: '100%', height: '30px'}
const selectAllKey = '999999999' // 全选key值
const fetchControlTime = 300 // 节流时间间隔

@connect(
  () => ({}),
)

export default class CommonSelect extends Component {
  constructor(props) {
    super(props)
    this._loadStyle = this._loadStyle().bind(this)
    this._fetchData = this._fetchData().bind(this)
    this.onSearch = this.onSearch().bind(this)
    // 初始化选中值
    this._initSelect(props)
    // 下拉数据（不包括内部定义的全选）
    this.list = []
    this.state = {children: this._initChildren(props), hasFetch: true}
    this.state.initialValue = this._initInitialValue(props)
    // 是否已经发送请求
    this.hasFetch = false
    // 是否已经粘贴
    this.hasPaster = false
    // 正在输入的value
    this.searchValue = null
    this.onChangeInit = false
    this.validateTrigger = ['onChange', 'onBlur']
  }
  componentWillMount() {
    this._init(this.props)
  }
  componentDidMount() {
    let {hasPaste, onChange, isSelectAll, hasSelectAll, listConfig} = this.props

    if (listConfig === null) {
      listConfig = true
    }
    if (!listConfig && isSelectAll && hasSelectAll) {
      onChange && onChange(this.listValues, selectAllKey, true)
      this.onChangeInit = true
    } else if (!listConfig && isSelectAll) {
      let arr = this.state.children.map(item => item.key)
      if (arr.includes(selectAllKey)) {
        onChange && onChange(this.listValues, selectAllKey, true)
      } else {
        onChange && onChange(this.listValues, this.listValues, true)
      }
      this.onChangeInit = true
    }/* else if (!isSelectAll) {
     onChange && onChange(this.state.initialValue, false, true)
     this.onChangeInit = true
     }*/
    hasPaste && (this.refs.topDom.onpaste = this._handleOnPaste)
  }
  componentWillReceiveProps(props) {
    this._init(props)
  }
  componentWillUnmount() {
    const {hasPaste} = this.props

    this.unMount = true
    hasPaste && (this.refs.topDom.onpaste = null)
  }

  _validObject = value => {
    if (typeof value == 'object' && value) {
      return value
    } else {
      return {}
    }
  }
  // 粘贴事件
  _handleOnPaste = e => {
    if (window.clipboardData && window.clipboardData.getData) { // IE
      this.pasteData = window.clipboardData.getData('Text').replace(/\s+/g, ' ').trim()
    } else {
      this.pasteData = e.clipboardData.getData('text/plain').replace(/\s+/g, ' ').trim()
    }
  }
  // 去重
  _filterData = data => (data || this.list).filter(item => !this.selectKeys.has(this._listRenderGetKey(item)))

  // user xinchenyang
  _filterSearchData = data => (data || this.list).filter(item => !this.selectSearchKeys.has(this._listRenderGetKey(item)))
  // 异步数据
  _fetchData = () => {
    let lastFetch

    return props => {
      let {
        listConfig = {},
        isSelectAll,
        hasSelectAll,
        isSeachSelect = true,
        onChange,
        initialValue,
        mode
      } = props

      lastFetch = +new Date()
      let now = lastFetch
      this.setState({hasFetch: false})
      this.hasFetch = false
      getData(listConfig).then(data => {
        data = this._validObject(data)
        if (listConfig.preAfterFetch) {
          data = listConfig.preAfterFetch(data)
        }
        if (!data || (!data.result && !data.response) || this.unMount || now !== lastFetch) {
          this.setState({hasFetch: true})
          listConfig.afterFetch && listConfig.afterFetch(data)
          return
        }
        this.hasFetch = true
        // let singleData = this.selectData.concat(this._filterData(data.result))
        let singleData = data.result || data.response

        if (isSelectAll) {
          initialValue = singleData.map(this._listRenderGetKey)
          if (initialValue.includes(selectAllKey) || hasSelectAll) {
            initialValue = initialValue.filter(item => item !== selectAllKey)
            if (this.value) {
              this.value.splice(0, this.value.length, selectAllKey)
              this.setState({hasFetch: true, children: this._render(singleData)})
            } else {
              // initialValue = [selectAllKey]
              this.setState({hasFetch: true, initialValue: [selectAllKey], children: this._render(singleData)})
            }
          } else {
            if (this.value) {
              this.value.splice(0, this.value.length, ...initialValue)
              this.setState({hasFetch: true, children: this._render(singleData)})
            } else {
              this.setState({hasFetch: true, initialValue, children: this._render(singleData)})
            }
          }
          if (!this.onChangeInit) {
            onChange && onChange(initialValue, selectAllKey, true)
            this.onChangeInit = false
          }
        } else {
          this.setState({hasFetch: true, children: this._render(singleData)})
          if (!this.onChangeInit) {
            if (initialValue) {
              onChange && onChange(initialValue, initialValue, true)
            }
            this.onChangeInit = false
          }
        }
        if (mode == 'multiple' && ((data.result && data.result.length > 0) || (data.response && data.response.length > 0)) && isSeachSelect) {
          this.searchValue !== null && this._fetchContinueInput(data.result || data.response)
        }
        listConfig.afterFetch && listConfig.afterFetch(data)
      })
    }
  }

  // 自动选中
  _fetchContinueInput = list => {
    const type = this.searchValue.includes(',')
    const arr = type ? this.searchValue.split(',') : null
    const newValue = arr ? arr[arr.length - 1] : this.searchValue
    const l = this.searchValue.match(/,/ig) ? this.searchValue.match(/,/ig).length : 0
    let changeValue = this.value || this.state.initialValue
    let key = list[0] ? this._listRenderGetKey(list[0], 0) : undefined
    let isKey = typeof list[0] == 'string' ? list[0] : Object.values(list[0]).find(item => item == newValue)

    if (this.searchFlagLength == l) {
      this.searchFlagLength--
      changeValue.pop()
      this.selectSearchKeys = new Set([...this.selectSearchKeys].pop()) // Set类型 转换为数组删除后重新转换为Set类型
      this.selectSearchData.pop()

      if (!this.value) {
        this.state.initialValue = [...changeValue]
      }
    }
    if (isKey == newValue) {
      // 重复内容pass
      if (changeValue) {
        for (let i = 0; i < changeValue.length; i++) {
          if (changeValue[i] == (key || newValue)) {
            console.error('repeat!')
            return
          }
        }
      }
      if (!this.value) {
        if (!Array.isArray(changeValue)) {
          this.state.initialValue = Array(1).fill(key || this.searchValue)
        } else {
          this.state.initialValue = this.state.initialValue.concat(key || newValue)
        }
        this.selectSearchKeys.add(key || newValue)
        this.selectSearchData.push(key || newValue)
        this.hasSearch = true
      } else {
        this.value.push(key || newValue)
        this.selectSearchKeys.add(key || newValue)
        this.selectSearchData.push(key || newValue)
      }
      for (let i = 0; i < this.selectSearchData.length; i++) {
        if (typeof this.selectSearchData[i] == 'string') {
          this.selectSearchData[i] = list.find(item => typeof item == 'string' ? item : Object.values(item).includes(this.selectSearchData[i]))
        }
      }
      this.searchFlagLength = l
    }
    this.setState({children: this._render([...new Set(this.selectSearchData.concat(this._filterSearchData()))])})
  }
  searchFlagLength = undefined
  /*
   * 非异步数据自动选中
   */
  continueInput = list => {
    if (list.length > 0) {
      let index = this.listValues.findIndex(item => item == this.searchValue)
      if (index !== -1) {
        this.fetchContinueInput(Array(1).fill(list[index]))
      }
    } else {
      this.fetchContinueInput(Array(1).fill(list[0]))
    }
  }
  // 失去焦点
  onBlur = () => {
    const {onBlur} = this.props

    this.searchFlagLength = undefined
    this.forceUpdate()
    onBlur && onBlur()
  }
  // 过滤获取key
  _listRenderGetKey = (value, index) => {
    const {listRenderGetKey = this._getKey} = this.props
    if (typeof value == 'string') {
      return value
    } else {
      return listRenderGetKey(value, index)
    }
  }
  // 过滤获取value
  _listRenderGetValue = (value, index) => {
    const {listRenderGetValue = this._getValue} = this.props

    if (typeof value == 'string') {
      return value
    } else {
      return listRenderGetValue(value, index)
    }
  }
  // 过滤获取data
  _listRenderGetData = (value, index) => {
    const {listRenderGetData = this._getValue} = this.props

    if (typeof value == 'string') {
      return value
    } else {
      return listRenderGetData(value, index)
    }
  }
  _listRenderGetSelect = (value, index) => {
    const {listRenderGetSelect = this._listRenderGetKey} = this.props

    if (typeof value == 'string') {
      return value
    } else {
      return listRenderGetSelect(value, index)
    }
  }
  // 设置初始默认值
  _initInitialValue = props => {
    const {isSelectAll, hasSelectAll, initialValue, mode, listConfig} = props

    if (mode == 'multiple') {
      if (isSelectAll && hasSelectAll) {
        this.selectKeys.add(selectAllKey)
        this.selectData.push(selectAllKey)
        return [selectAllKey]
      } else if (isSelectAll && (!listConfig || listConfig && this.hasFetch)) {
        let arr = this.state.children.map(item => item.key)
        if (arr.includes(selectAllKey)) {
          this.selectKeys.add(selectAllKey)
          this.selectData.push(selectAllKey)
          return [selectAllKey]
        }
        arr.forEach(item => {
          this.selectKeys.add(item)
        })
        this.selectData = [...arr]
        return arr
      } else {
        if (initialValue == selectAllKey || Array.isArray(initialValue) && initialValue.includes(selectAllKey)) {
          console.error(`${initialValue} is not allowed, please use isSelectAll instead`)
        }
        if (Array.isArray(initialValue)) {
          initialValue.map(item => {
            this.selectKeys.add(item)
            this.selectData.push(item)
          })
          return initialValue
        } else if (typeof initialValue == 'string') {
          this.selectKeys.add(initialValue)
          this.selectData.push(initialValue)
          return [initialValue]
        }
        return initialValue
      }
    } else {
      if (isSelectAll) {
        return [selectAllKey]
      } else {
        return initialValue
      }
    }
  }
  _initSelect = () => {
    // user wangjun

    this.selectData = []
    this.selectKeys = new Set()

    // user xinchenyang

    this.selectSearchData = []
    this.selectSearchKeys = new Set()
    this.value = undefined
  }
  _initSettings = props => {
    this._initSelect()
    this.state.initialValue = this._initInitialValue(props)
  }
  // 初始化
  _init = props => {
    const {
      listConfig,
      list,
      children
    } = props
    let isConstructor = false
    let update = false

    if (props === this.props) {
      isConstructor = true
    }
    if (listConfig && (isConstructor || listConfig !== this.props.listConfig)) {
      this._fetchData(props)
    } else if (!isConstructor && (list !== this.props.list || children !== this.props.children)) {
      this.state.children = this._initChildren(props)
      this._initSettings(props)
    } else {
      for (let key in props) {
        if (props.hasOwnProperty(key)) {
          if (props[key] !== this.props[key]) {
            update = true
          }
        }
      }
      update && this._initSettings(props)
    }
  }
  // 初始化子节点
  _initChildren = props => {
    const {
      list,
      children
    } = props

    if (list) {
      return this._render(list)
    } else if (children) {
      return children
    } else {
      return []
    }
  }
  // 筛选--钩子
  _filter = list => {
    const {listFilter} = this.props

    if (list && listFilter) {
      // 保存过滤后的数据
      this.list = list.filter(listFilter)
      this.listValues = this.list.map(item => this._listRenderGetSelect(item))
    } else {
      this.list = list || []
      this.listValues = this.list.map(item => this._listRenderGetSelect(item))
    }
    return [...this.list]
  }
  _getKey = item => item.code
  _getValue = item => item.value
  // 子节点渲染
  _render = list => {
    const {
      listRender,
      listRenderGetKey = this._getKey,
      listRenderGetValue = this._getValue,
      hasSelectAll,
      selectAllText = '全部'
    } = this.props

    // 渲染前调用过滤钩子
    list = this._filter(list)
    if (listRender) {
      list = list.map(listRender)
    } else if (listRenderGetKey && listRenderGetValue) {
      let arr = []
      let hasSelectCode = false

      list.forEach((item, index) => {
        let key, value, data, select
        if (typeof item == 'string') {
          key = item
          value = item
          data = item
          select = item
        } else {
          key = this._listRenderGetKey(item, index)
          value = this._listRenderGetValue(item, index)
          data = this._listRenderGetData(item, index)
          select = this._listRenderGetSelect(item, index)
        }
        if (hasSelectCode == selectAllKey) {
          hasSelectCode = true
        }
        if (key !== undefined && value !== undefined && key !== '' && value !== '') {
          arr.push(<Option key={key} title={value} data={data} value={select}>{value}</Option>)
        } else {
          if (!React.isValidElement(item)) {
            console.error(item, 'mast have key and value')
          } else {
            arr.push(item)
          }
        }
      })
      if (hasSelectAll && !hasSelectCode) {
        arr.unshift(<Option key={selectAllKey} title={selectAllText} data={selectAllText} value={selectAllKey}>{selectAllText}</Option>)
      }

      list = arr
    } else {
      list = []
    }
    return list
  }
  // 合并样式
  _loadStyle() {
    let props,
      result = defaultStyle

    return style => {
      if (style !== props) {
        props = style
        result = Object.assign({}, defaultStyle, style)
      }

      return result
    }
  }
  // 全选&&回调
  onChange = value => {
    const {onChange} = this.props
    const {children} = this.state
    this.value = value
    if (Array.isArray(value) && value.length && children.some(item => item.key == selectAllKey)) {
      if (value[value.length - 1] == selectAllKey) {
        value.splice(0, value.length, selectAllKey)
        onChange && onChange(this.listValues, selectAllKey)
      } else if (value.length == this.state.children.length) {
        value.splice(0, value.length, selectAllKey)
        onChange && onChange(this.listValues, selectAllKey)
      } else if (value.length + 1 == this.state.children.length && !value.includes(selectAllKey)) {
        value.splice(0, value.length, selectAllKey)
        onChange && onChange(this.listValues, selectAllKey)
      } else if (value.includes(selectAllKey)) {
        value.splice(value.findIndex(item => item == selectAllKey), 1)
        onChange && onChange(value, value)
      } else {
        onChange && onChange(value, value)
      }
    } else {
      onChange && onChange(value, value)
    }
    this.forceUpdate()
  }
  // 选中
  onSelect = value => {
    if (this.props.mode == 'multiple') {
      const {onSearch, listRenderGetKey = this._getKey} = this.props
      const {children} = this.state
      if (onSearch && listRenderGetKey) {
        for (let i = 0, j = children.length; i < j; i++) {
          if (children[i].key == value) {
            this.selectData.push(children[i].key)
            this.selectKeys.add(value)
            this.selectSearchData.push(children[i])
            this.selectSearchKeys.add(value)
            return
          }
        }
      }
      this.searchFlagLength = undefined
    } else {
      const {onSelect} = this.props
      const {children} = this.state
      if (onSelect) {
        for (let i = 0, j = children.length; i < j; i++) {
          if (children[i].key == value) {
            return onSelect(value, children[i].props)
          }
        }
      }
    }
  }
  // 取消选中
  onDeselect = value => {
    if (this.props.mode == 'multiple') {
      const {onSearch, listRenderGetKey = this._getKey} = this.props

      if (onSearch && listRenderGetKey) {
        for (let i = 0, j = this.selectData.length; i < j; i++) {
          if (this._listRenderGetKey(this.selectData[i]) == value) {
            this.selectData.splice(i, 1)
            this.selectKeys.delete(value)
            return
          }
        }

        for (let i = 0, j = this.selectSearchData.length; i < j; i++) {
          if (this._listRenderGetKey(this.selectSearchData[i]) == value) {
            this.selectSearchData.splice(i, 1)
            this.selectSearchKeys.delete(value)
            return
          }
        }
      }
    }
  }
  // 粘贴
  _onPaste = value => {
    const {decorator, setFieldsValue, getFieldValue} = this.props
    if (this.props.mode == 'multiple') {
      let re = /\s+/
      let list = value.trim().split(re)
      const data = getFieldValue(decorator) || []
      const handledata = _.concat(data, list)
      setFieldsValue({
        [decorator]: _.uniq(handledata)
      })
    }
  }
  // 节流&&回调
  onSearch = () => {
    let preTime = 0,
      lastFetch

    return value => {
      const {onSearch, hasPaste} = this.props
      value = value.replace(/\s+/g, ' ').trim()

      this.searchValue = value
      if (hasPaste) {
        if (this.pasteData !== undefined && this.pasteData == value) {
          this._onPaste(this.pasteData)
          this.pasteData = undefined

          return
        }
      }
      if (!onSearch) {
        // this.continueInput(this.list)
        return
      }
      let now = +new Date()

      if (now - preTime < fetchControlTime) {
        clearTimeout(lastFetch)
      }
      preTime = now
      value = value.includes(',') ? value.split(',')[value.split(',').length - 1] : value
      value && (lastFetch = setTimeout(() => {
        !this.unMount && onSearch(value)
      }, fetchControlTime))
    }
  }
  render() {
    const {children, hasFetch} = this.state

    let {
      getFieldDecorator,
      style,
      required,
      disabled,
      className = '',
      isHideRequireIcon,
      decorator,
      label = 'label',
      size = 'default',
      message,
      type,
      validateFirst,
      allowClear = true,
      listConfig,
      labelCol,
      wrapperCol,
      hasPaste,
      colon = false,
      mode,
      validator,
      ...props
    } = this.props
    let value = this.state.initialValue
    // 必选前的星星icon
    let formItemClass = `YH-form-item ${className} ${isHideRequireIcon ? 'no-required-icon' : ''}`
    let settings = {}
    // 表单配置
    if (validateFirst !== undefined) {
      settings.validateFirst = validateFirst
    }
    // 粘贴选中 或者 tag模式 否则无子节点不设置值
    if (children && children.length || hasPaste || mode == 'tags') {
      if (this.lastInitialValue == value) {
        settings.initialValue = this.lastInitialValue
      } else if (!listConfig) {
        settings.initialValue = value
        this.lastInitialValue = settings.initialValue
      } else if (this.hasSearch) {
        settings.initialValue = value
        this.lastInitialValue = settings.initialValue
        this.hasSearch = false
      } else if (this.hasFetch) {
        settings.initialValue = value
        this.lastInitialValue = settings.initialValue
        this.hasFetch = false
      } else if (this.hasPaster) {
        settings.initialValue = value
        this.lastInitialValue = settings.initialValue
        this.hasPaster = false
      }
    } else {
      settings.initialValue = undefined
    }
    if (hasFetch && listConfig || !listConfig) {
      props.notFoundContent = props.notFoundContent ? props.notFoundContent : ''
    }
    // settings.initialValue = value
    // 校验规则
    if (!disabled) {
      let rules = {}
      let rulesFlag = false

      if (required) {
        rules.required = required
        rulesFlag = true
      }
      if (type !== undefined) {
        rules.type = type
        rulesFlag = true
      }
      if (message !== undefined) {
        rules.message = message
      }
      if (validator !== undefined) {
        rules.validator = validator
        rulesFlag = true
      }
      rulesFlag && (settings.rules = [rules])
    }
    let formItem = <FormItem label={label} className={formItemClass} labelCol={labelCol} wrapperCol={wrapperCol} colon={colon}>
      {
        getFieldDecorator(decorator || 'decorator', settings)(
          <Select
            getPopupContainer={() => window.document.querySelector('.layout') ? window.document.querySelector('.layout') : document.body}
            {...props}
            mode={mode}
            validateTrigger={this.validateTrigger}
            defaultActiveFirstOption={false}
            size={size}
            style={this._loadStyle(style)}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
            onBlur={this.onBlur}
            disabled={disabled}
            allowClear={allowClear}
          >
            {children}
          </Select>
        )
      }
    </FormItem>

    return hasPaste ? <span ref="topDom">{formItem}</span> : formItem
  }
}
