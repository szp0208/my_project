/**
 * Created by wangjun on 2018/1/22.
 */
import React, {Component} from 'react'
import {Spin} from 'antd'
import Trigger from 'rc-trigger'
import 'rc-trigger/assets/index.css'
import style from './CascaderTreeSelect.scss'
import CommonSelect from '../CommonSelect/'
import CommonFormItem from '../CommonFormItem/'
import {removeUndefined} from 'util'
import PropTypes from 'prop-types'

function getValue(item) {
  return item.code
}

function getLabel(item) {
  return item.value
}

class TreeSelectLoadingItem extends Component {
  handleUlClick(e) {
    e.stopPropagation()
  }
  render() {
    return <ul className={style.list} onClick={this.handleUlClick}>
      <li className={style.loading}><Spin/></li>
    </ul>
  }
}

class TreeSelectNoContent extends Component {
  handleUlClick(e) {
    e.stopPropagation()
  }
  render() {
    return <ul className={style.list} onClick={this.handleUlClick}>
      <li className={style.noContent}>无匹配结果</li>
    </ul>
  }
}

class TreeSelect extends Component {
  static propTypes = {
    // 自定义属性
    childrenTrigger: PropTypes.string,
    onChange: PropTypes.func,
    onDefaultValue: PropTypes.func,
    selectType: PropTypes.oneOf(['parent', 'child']),
    filterTreeNode: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  }
  static defaultProps = {
    filterTreeNode: true,
    data: [],
    childrenTrigger: 'onMouseOver',
    selectType: 'parent'
  }
  constructor(props) {
    super(props)
    this.tree = this._initTree(props.data, props.value, props.inputValue, {children: [], root: true}, props.listRenderGetValue, this._getFilterTreeNode(props))
    this._handleDefaultValue()
    this.handleToggleSelect = this.handleToggleSelect.bind(this)
    this.handleLoadData = this.handleLoadData().bind(this)
  }
  componentWillReceiveProps(props) {
    if (props.data !== this.props.data) {
      this.tree = this._initTree(props.data, props.value, props.inputValue, {children: [], root: true}, props.listRenderGetValue, this._getFilterTreeNode(props))
    } else if (props.inputValue !== this.props.inputValue || props.value !== this.value && props.value !== this.props.value) {
      this.tree = this._updateTree(props.value, props.inputValue, this.tree, props.listRenderGetValue, this._getFilterTreeNode(props))
    }
  }

  _initChildren(data, inputValue, map, listRenderGetValue, filterTreeNode, valueMap, level) {
    let selected = false,
      visible = false
    for (let i = 0, l = data.length; i < l; i++) {
      map.children[i] = {
        data: Object.assign({}, data[i], {level}),
        selected: map.selected || valueMap[listRenderGetValue(data[i])] || false,
        visible: filterTreeNode(inputValue, data[i]),
        parent: map
      }
      if (i > 0) {
        map.children[i].next = map.children[i - 1]
      }
      if (data[i].children) {
        map.children[i].children = []
        this._initChildren(data[i].children, inputValue, map.children[i], listRenderGetValue, filterTreeNode, valueMap, level + 1)
        // this._initChildren(data[i].children, map.children[i], level + 1, valueMap, listRenderGetValue, filterTreeNode)
      }
      visible = map.children[i].visible ? true : visible
      selected = this._getSelected(map.children[i], selected)
    }
    if (map.children.length) {
      map.children[0].next = map.children[map.children.length - 1]
      this._updateByParent(map, selected, visible)
    }
  }
  _initTree(data, value, inputValue, map, listRenderGetValue, filterTreeNode, level = 0) {
    this.value = value
    let valueMap = {}
    value && value.forEach(item => valueMap[item] = true)
    this._initChildren(data, inputValue, map, listRenderGetValue, filterTreeNode, valueMap, level)
    return map
  }

  _updateByParent(map, selected, visible) {
    if (map.selected === selected && map.visible === visible || map.root) {
      return
    }
    map.selected = selected
    map.visible = visible
  }
  _updateTree(value, inputValue, map, listRenderGetValue, filterTreeNode) {
    this.value = value
    let valueMap = {}
    value.forEach(item => valueMap[item] = true)
    let deep = map => {
      let selected = false,
        visible = false
      map.children.forEach(item => {
        item.selected = map.selected || valueMap[listRenderGetValue(item.data)] || false
        item.visible = filterTreeNode(inputValue, item.data)
        if (item.children) {
          deep(item)
        }
        visible = item.visible ? true : visible
        selected = this._getSelected(item, selected)
      })
      map.children.length && this._updateByParent(map, selected, visible)
    }
    deep(map)
    return map
  }
  _updateSelectedByParent(tree) {
    if (tree.parent.root) {
      return
    }
    if (tree.selected) {
      let next = tree.next

      // while (true) {
      for (;;) {
        if (next === tree) {
          tree.parent.selected = true
          return this._updateSelectedByParent(tree.parent)
        }
        if (!next.selected) {
          if (!tree.parent.selected) {
            let p = tree.parent
            while (!p.root) {
              p.selected = 'half'
              p = p.parent
            }
          }
          return
        }
        next = next.next
      }
    } else {
      let next = tree.next

      // while (true) {
      for (;;) {
        if (next === tree) {
          tree.parent.selected = false
          return this._updateSelectedByParent(tree.parent)
        }
        if (next.selected === true) {
          if (tree.parent.selected === true) {
            let p = tree.parent
            while (!p.root) {
              p.selected = 'half'
              p = p.parent
            }
          }
          return
        }
        next = next.next
      }
    }
  }
  _updateSelectedByChild(tree) {
    if (tree.children) {
      tree.children.forEach(item => {
        item.selected = tree.selected
        this._updateSelectedByChild(item)
      })
    }
  }

  _handleDefaultValue() {
    let selects = this._getSelects()
    if (selects.length) {
      this.props.onDefaultValue(selects)
    }
  }

  _getSelected(item, selected) {
    if (item.selected === true) {
      if (!selected) {
        return true
      }
    } else if (item.selected) {
      return 'half'
    } else {
      if (selected) {
        return 'half'
      }
    }
    return selected
  }
  _getFilterTreeNode({filterTreeNode, listRenderGetLabel}) {
    if (typeof filterTreeNode === 'function') {
      return filterTreeNode
    } else {
      return filterTreeNode ? (inputValue, data) => listRenderGetLabel(data).includes(inputValue) : () => true
    }
  }
  _getSelects() {
    if (this.props.selectType === 'child') {
      return this._getSelectByChild(this.tree.children)
    } else {
      return this._getSelectByParent(this.tree.children)
    }
  }
  _getSelectByParent(tree) {
    let result = []
    tree.forEach(item => {
      if (item.selected === true) {
        if (!item.data.disableCheckbox) {
          result.push(item)
        } else {
          result = result.concat(this._getSelectByParent((item.children)))
        }
      } else if (item.selected === 'half') {
        result = result.concat(this._getSelectByParent((item.children)))
      }
    })
    return result
  }
  _getSelectByChild(tree) {
    let result = []
    tree.forEach(item => {
      if (item.selected) {
        if (item.children) {
          result = result.concat(this._getSelectByChild((item.children)))
        } else {
          result.push(item)
        }
      }
    })
    return result
  }

  handleToggleSelect(item) {
    return (e) => {
      (e || event).stopPropagation()
      if (item.data.disableCheckbox) {
        return
      }
      item.selected = !item.selected
      this._updateSelectedByParent(item)
      this._updateSelectedByChild(item)
      let selects = this._getSelects()
      const {onChange, listRenderGetValue} = this.props
      this.value = selects.map(item => listRenderGetValue(item.data))
      onChange && onChange(this.value, selects)
    }
  }
  handleLoadData() {
    let activeParent = null
    return (item, active) => {
      activeParent = active
      const {loadData, filterTreeNode, inputValue, value, toggleActive, listRenderGetValue} = this.props
      loadData && loadData(item.data).then((data = []) => {
        item.children = []
        this._initTree(data, value, inputValue, item, listRenderGetValue, this._getFilterTreeNode(filterTreeNode), item.data.level + 1)
        if (activeParent && item && listRenderGetValue(activeParent.data) === listRenderGetValue(item.data)) {
          toggleActive()
        }
      })
    }
  }

  render() {
    const {listRenderGetValue, listRenderGetLabel, toggleActive, childrenTrigger, onMaskClick} = this.props
    return <div className={style.container} onClick={onMaskClick}>
      <TreeSelectItem
        data={this.tree.children}
        toggleSelect={this.handleToggleSelect}
        toggleActive={toggleActive}
        childrenTrigger={childrenTrigger}
        loadData={this.handleLoadData}
        root="root"
        listRenderGetValue={listRenderGetValue}
        listRenderGetLabel={listRenderGetLabel}
        />
    </div>
  }
}

class TreeSelectItem extends Component {
  static propTypes = {
    // 自定义属性
    data: PropTypes.array,
    root: PropTypes.string,
    toggleSelect: PropTypes.func,
    toggleActive: PropTypes.func
  }
  static defaultProps = {
    data: []
  }
  constructor(props) {
    super(props)
    this.state = {
      activeParent: undefined
    }
    this._getClassName = this._getClassName.bind(this)
    this.handleShowNext = this.handleShowNext.bind(this)
  }
  componentWillUnmount() {
    this.unMount = true
  }

  _getClassName(item) {
    const {activeParent} = this.state
    const {listRenderGetValue, loadData} = this.props
    let result = [style.listItem]
    if (item.data.children || (!item.data.isLeaf && loadData)) {
      result.push(style.next)
    }
    /* if (item.data.disableCheckbox) {
      result.push(style.disableCheckbox)
    } else {
      if (item.selected === 'half') {
        result.push(style.selectHalf)
      } else if (item.selected) {
        result.push(style.select)
      }
    }*/
    if (activeParent && item && listRenderGetValue(activeParent.data) === listRenderGetValue(item.data)) {
      result.push(style.active)
    }
    return result.join(' ')
  }
  _getCheckboxClassName(item) {
    let result = [style.selectIcon]
    if (item.selected === true) {
      result.push(style.select)
    } else if (item.selected) {
      result.push(style.selectHalf)
    }
    if (item.data.disableCheckbox) {
      result.push(style.disableCheckbox)
    }
    return result.join(' ')
  }

  handleShowNext(item) {
    return () => {
      if (this.state.activeParent === item) {
        return
      }
      const {toggleActive} = this.props
      toggleActive && toggleActive(item)
      this.setState({activeParent: item})
    }
  }
  handleUlClick(e) {
    e.stopPropagation()
  }

  render() {
    const {data, root, toggleSelect, listRenderGetValue, listRenderGetLabel, toggleActive, loadData, childrenTrigger} = this.props
    const {activeParent} = this.state
    let childList = null
    let list = data.filter(item => item.visible).map(item => {
      let settings = {[childrenTrigger]: this.handleShowNext(item)}
      let label = listRenderGetLabel(item.data)
      if (activeParent && item && listRenderGetValue(activeParent.data) === listRenderGetValue(item.data)) {
        if (item.children) {
          if (item.children.length) {
            childList = <TreeSelectItem
              data={item.children}
              toggleSelect={toggleSelect}
              toggleActive={toggleActive}
              loadData={loadData}
              childrenTrigger={childrenTrigger}
              key={item.data.value}
              root={item.data.value}
              listRenderGetValue={listRenderGetValue}
              listRenderGetLabel={listRenderGetLabel}
              />
          } else {
            childList = <TreeSelectNoContent key={`${root}-noContent`}/>
          }
        } else if (loadData && !item.data.isLeaf) {
          childList = <TreeSelectLoadingItem key={`${root}-loading`}/>
          loadData(item, activeParent)
        }
      }
      return <li
        className={this._getClassName(item)}
        key={listRenderGetValue(item.data)}
        // onClick={toggleSelect(item)}
        {...settings}
      >
        <span onClick={toggleSelect(item)} className={this._getCheckboxClassName(item)}></span>
        <span title={label}>{label}</span>
      </li>
    })
    if (!list.length) {
      list.push(<TreeSelectNoContent key={root}/>)
    }
    return [<ul className={style.list} key={root} onClick={this.handleUlClick}>
      {list}
    </ul>, childList]
  }
}

class CascaderTreeSelectContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this._initValue(props),
      visible: false
    }
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleChildrenClick = this.handleChildrenClick.bind(this)
    this.handleMaskClick = this.handleMaskClick.bind(this)
  }
  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.setState({value: this._initValue(props)})
    }
  }

  _initValue(props) {
    const {labelInValue, value = []} = props
    if (labelInValue) {
      return value.map(item => item.key)
    } else {
      return value
    }
  }

  handleVisibleChange(visible) {
    this.setState(() => ({visible}))
    const {onPopupVisibleChange} = this.props
    onPopupVisibleChange && onPopupVisibleChange(visible)
  }
  handleChildrenClick(e) {
    if (this.state.visible) {
      e.stopPropagation()
    }
  }
  handleMaskClick() {
    this.setState({visible: false})
  }

  render() {
    const {value, visible} = this.state
    const {
      onChange,
      getPopupContainer,
      toggleActive,
      data,
      inputValue,
      onDefaultValue,
      listRenderGetValue,
      listRenderGetLabel,
      loadData,
      childrenTrigger,
      filterTreeNode,
      children
    } = this.props
    return (
      <Trigger
        action={['click']}
        popup={<TreeSelect
          value={value}
          data={data}
          inputValue={inputValue}
          loadData={loadData}
          onChange={onChange}
          onMaskClick={this.handleMaskClick}
          childrenTrigger={childrenTrigger}
          onDefaultValue={onDefaultValue}
          listRenderGetValue={listRenderGetValue}
          listRenderGetLabel={listRenderGetLabel}
          toggleActive={toggleActive}
          filterTreeNode={filterTreeNode}
        />}
        popupAlign={{
          points: ['tl', 'bl'],
          offset: [0, 3],
          overflow: {
            adjustX: true,
            adjustY: true
          }
        }}
        onPopupVisibleChange={this.handleVisibleChange}
        getPopupContainer={getPopupContainer}
        popupVisible={visible}
        >
        <div>
          <div onClick={this.handleChildrenClick}>
            {children}
          </div>
        </div>
      </Trigger>
    )
  }
}

class NativeCascaderTreeSelect extends Component {
  static propTypes = {
    // 自定义属性
    listRenderGetValue: PropTypes.func, // 列表获取值
    listRenderGetLabel: PropTypes.func, // 列表显示值
    mode: PropTypes.oneOf(['default', 'multiple', 'tags'])
  }
  static defaultProps = {
    listRenderGetValue: getValue,
    listRenderGetLabel: getLabel,
    mode: 'multiple'
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || [],
      selectValue: [],
      inputValue: ''
    }
    this.selected = []
    this.handleToggleActive = this.handleToggleActive.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCommonSelectChange = this.handleCommonSelectChange.bind(this)
    this.handleDefaultValue = this.handleDefaultValue.bind(this)
    this.handleCommonSelectSearch = this.handleCommonSelectSearch.bind(this)
    this.handlePopupVisibleChange = this.handlePopupVisibleChange.bind(this)
    this.handleCommonDeSelect = this.handleCommonDeSelect.bind(this)
    // this.handleCommonSelectBlur = this.handleCommonSelectBlur.bind(this)
  }
  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.setState({value: props.value})
    }
  }

  handleSelectChange(value, selected) {
    this.selected = selected
    const {listRenderGetValue, labelInValue, onChange} = this.prop
    if (labelInValue) {
      onChange && onChange(selected.map(item => item.data))
      this.selected = selected.map(item => Object.assign({}, item.data, {key: listRenderGetValue(item.data)}))
    } else {
      onChange && onChange(value)
      this.selected = selected.map(item => listRenderGetValue(item.data))
    }
    this.setState({selectValue: this.selected})
    this.select.focus()
  }
  handleCommonSelectChange(value) {
    this.setState({value: value || [], selectValue: value || []})
    if (!value || !value.length) {
      const {onChange} = this.props
      onChange && onChange(value)
    }
  }
  handleCommonDeSelect(value) {
    const {labelInValue} = this.props
    if (labelInValue) {
      this.selected = this.selected.filter(item => item.key !== value.key)
    } else {
      this.selected = this.selected.filter(item => item !== value)
    }
    setTimeout(() => {
      this.setState({selectValue: this.selected})
    }, 0)
  }
  handleToggleActive() {
    this.forceUpdate()
    this.select.focus()
  }
  handleDefaultValue(selected) {
    const {listRenderGetValue, labelInValue} = this.props
    if (labelInValue) {
      this.selected = selected.map(item => Object.assign({}, item.data, {key: listRenderGetValue(item.data)}))
    } else {
      this.selected = selected.map(item => listRenderGetValue(item.data))
    }
    this.setState({selectValue: this.selected})
  }
  handleCommonSelectSearch(inputValue) {
    this.setState({inputValue})
    const {onSearch} = this.props
    onSearch && onSearch(inputValue)
  }
  handlePopupVisibleChange(visible) {
    if (!visible) {
      this.setState({inputValue: ''})
      const {onPopupVisibleChange} = this.props
      onPopupVisibleChange && onPopupVisibleChange(visible)
    }
  }
  /* handleCommonSelectBlur() {
    this.setState({inputValue: ''})
    const {onBlur} = this.props
    onBlur && onBlur(value)
  }*/

  render() {
    const {value, selectValue, inputValue} = this.state
    const {data, labelInValue, listRenderGetValue, listRenderGetLabel, loadData, selectType, getPopupContainer, childrenTrigger, filterTreeNode, ...props} = this.props
    return (
      <CascaderTreeSelectContainer
        value={value}
        data={data}
        inputValue={inputValue}
        childrenTrigger={childrenTrigger}
        labelInValue={labelInValue}
        loadData={loadData}
        selectType={selectType}
        getPopupContainer={getPopupContainer}
        onChange={this.handleSelectChange}
        onDefaultValue={this.handleDefaultValue}
        toggleActive={this.handleToggleActive}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        listRenderGetValue={listRenderGetValue}
        listRenderGetLabel={listRenderGetLabel}
        filterTreeNode={filterTreeNode}
      >
        <CommonSelect.Select
          {...props}
          labelInValue={labelInValue}
          data={[]}
          notFoundContent={null}
          value={selectValue}
          inputValue={inputValue}
          // onBlur={this.handleCommonSelectBlur}
          onSearch={this.handleCommonSelectSearch}
          onChange={this.handleCommonSelectChange}
          onDeselect={this.handleCommonDeSelect}
          ref={node => this.select = node}
          />
      </CascaderTreeSelectContainer>
    )
  }
}

export default class CascaderTreeSelect extends Component {
  static CascaderTreeSelect = NativeCascaderTreeSelect
  static propTypes = {
    // 自定义属性
    listRenderGetValue: PropTypes.func, // 列表获取值
    listRenderGetLabel: PropTypes.func, // 列表显示值
    mode: PropTypes.oneOf(['default', 'multiple', 'tags'])
  }
  static defaultProps = {
    listRenderGetValue: getValue,
    listRenderGetLabel: getLabel,
    mode: 'multiple'
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue || [],
      inputValue: ''
    }
    this.selected = []
    this.handleToggleActive = this.handleToggleActive.bind(this)
    this.handleCommonDeSelect = this.handleCommonDeSelect.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCommonSelectChange = this.handleCommonSelectChange.bind(this)
    this.handleDefaultValue = this.handleDefaultValue.bind(this)
    this.handleCommonSelectSearch = this.handleCommonSelectSearch.bind(this)
    this.handlePopupVisibleChange = this.handlePopupVisibleChange.bind(this)
    // this.handleCommonSelectBlur = this.handleCommonSelectBlur.bind(this)
  }
  componentWillReceiveProps(props) {
    if (props.initialValue !== this.props.initialValue) {
      this.setState({value: props.initialValue})
    }
  }

  handleSelectChange(value, selected) {
    // this.setState({value})
    // this.forceUpdate()
    this.selected = selected
    const {onChange, setFieldsValue, decorator, listRenderGetValue, labelInValue} = this.props
    // onChange && onChange(labelInValue ? selected.map(item => item.data) : value)
    if (labelInValue) {
      onChange && onChange(selected.map(item => item.data))
      this.selected = selected.map(item => Object.assign({}, item.data, {key: listRenderGetValue(item.data)}))
    } else {
      onChange && onChange(value)
      this.selected = selected.map(item => listRenderGetValue(item.data))
    }
    setFieldsValue({[decorator]: this.selected})
    this.select.focus()
  }
  handleCommonSelectChange(value) {
    this.setState({value: value || []})
    if (!value || !value.length) {
      const {onChange} = this.props
      onChange && onChange(value)
    }
  }
  handleCommonDeSelect(value) {
    const {setFieldsValue, decorator, labelInValue} = this.props
    if (labelInValue) {
      this.selected = this.selected.filter(item => item.key !== value.key)
    } else {
      this.selected = this.selected.filter(item => item !== value)
    }
    setTimeout(() => {
      setFieldsValue({[decorator]: this.selected})
    }, 0)
  }
  handleToggleActive() {
    this.forceUpdate()
    this.select.focus()
  }
  handleDefaultValue(selected) {
    const {setFieldsValue, decorator, listRenderGetValue, labelInValue} = this.props
    if (labelInValue) {
      this.selected = selected.map(item => Object.assign({}, item.data, {key: listRenderGetValue(item.data)}))
    } else {
      this.selected = selected.map(item => listRenderGetValue(item.data))
    }
    setFieldsValue({[decorator]: this.selected})
  }
  handleCommonSelectSearch(inputValue) {
    this.setState({inputValue})
    const {onSearch} = this.props
    onSearch && onSearch(inputValue)
  }
  handlePopupVisibleChange(visible) {
    if (!visible) {
      this.setState({inputValue: ''})
      const {onPopupVisibleChange} = this.props
      onPopupVisibleChange && onPopupVisibleChange(visible)
    }
  }
  /* handleCommonSelectBlur() {
    this.setState({inputValue: ''})
    const {onBlur} = this.props
    onBlur && onBlur()
  }*/

  render() {
    const {value, inputValue} = this.state
    const {
      formItemPrefixCls,
      formItemClass,
      formItemId,
      label,
      labelCol,
      wrapperCol,
      help,
      extra,
      validateStatus,
      hasFeedback,
      required,
      style,
      colon,

      valuePropName,
      initialValue,
      trigger,
      getValueFromEvent,
      validateTrigger,
      rules,
      exclusive,
      normalize,
      validateFirst,
      decorator,
      getFieldDecorator,

      data,
      labelInValue,
      listRenderGetValue,
      listRenderGetLabel,
      loadData,
      childrenTrigger,
      filterTreeNode,
      selectType,

      getPopupContainer,

      ...props
      } = this.props
    const formItemSettings = {
      prefixCls: formItemPrefixCls,
      className: formItemClass,
      id: formItemId,
      label,
      labelCol,
      wrapperCol,
      help,
      extra,
      validateStatus,
      hasFeedback,
      required,
      style,
      colon
    }
    const settings = removeUndefined({
      valuePropName,
      initialValue,
      trigger,
      getValueFromEvent,
      validateTrigger,
      rules,
      exclusive,
      normalize,
      validateFirst
    })
    return (
      <CommonFormItem.Item {...formItemSettings}>
        <CascaderTreeSelectContainer
          value={value}
          data={data}
          inputValue={inputValue}
          childrenTrigger={childrenTrigger}
          labelInValue={labelInValue}
          loadData={loadData}
          selectType={selectType}
          getPopupContainer={getPopupContainer}
          onChange={this.handleSelectChange}
          onDefaultValue={this.handleDefaultValue}
          toggleActive={this.handleToggleActive}
          onPopupVisibleChange={this.handlePopupVisibleChange}
          listRenderGetValue={listRenderGetValue}
          listRenderGetLabel={listRenderGetLabel}
          filterTreeNode={filterTreeNode}
          >
          {
            getFieldDecorator(decorator, settings)(
              <CommonSelect.Select
                labelInValue={labelInValue}
                {...props}
                data={[]}
                notFoundContent={null}
                onSearch={this.handleCommonSelectSearch}
                inputValue={inputValue}
                // onBlur={this.handleCommonSelectBlur}
                onChange={this.handleCommonSelectChange}
                onDeselect={this.handleCommonDeSelect}
                ref={node => this.select = node}
              />
            )
          }
        </CascaderTreeSelectContainer>
      </CommonFormItem.Item>
    )
  }
}
