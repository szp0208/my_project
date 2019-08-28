/*
 * author: zero
 * createdTime: 2018/06/27
 *
 * 仿 commonSelect
 * */

import React from 'react'
import {TreeSelect} from 'antd'
import CommonFormItem from '../CommonFormItem/'
import {getData} from 'util'
import {SUCCESSCODE} from 'enum'

const defaultStyle = {width: '100%'}

class NativeTree extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      treeData: this.initChildren(props)
    }
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
      this.setState({treeData: this.initChildren(props)})
    }
    if (this.props.resetTreeData !== props.resetTreeData) {
      this.setState({treeData: []})
    }
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
        this.setState({treeData: this.renderChildren(data.result, this.props)})
      }
    })
  }

  /* 初始化 子数据 */
  initChildren(props) {
    const {list, treeData} = props
    if (list) {
      return this.renderChildren(list, props)
    } else {
      return treeData
    }
  }

  /* 渲染 子元素 */
  renderChildren(list, props) {
    const {
      listRenderGetLabel = this.getLabel,
      listRenderGetValue = this.getValue,
      listRenderGetChildren = this.getChildren,
      listRenderGetId = this.getId,
      beforeListRender
    } = props
    const {listRenderGetShow = listRenderGetLabel} = props
    if (beforeListRender) {
      list = beforeListRender(list)
    }

    let trees = [].concat(list)
    const generateList = (data, parentId = 0) => {
      try {
        for (let i = 0, l = data.length; i < l; i++) {
          let item = data[i]
          item.value = listRenderGetValue(item)
          item.key = item.value
          item.title = listRenderGetShow(item)
          item.label = listRenderGetLabel(item)
          item.children = listRenderGetChildren(item)
          item.id = listRenderGetId(item)
          item.parentId = parentId // 记录父级 ID

          if (item.children) {
            if (item.children.length) {
              generateList(item.children, item.id)
            } else {
              delete item.children
            }
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    generateList(trees)
    return trees

    /*return list.map(item => {
      let value = listRenderGetValue(item)
      let key = value
      let title = listRenderGetShow(item)
      let label = listRenderGetLabel(item)
      return <TreeSelect.TreeNode key={key} value={value} title={title}>{label}</TreeSelect.TreeNode>
    })*/
  }
  getId(item) {
    return item.id
  }
  getValue(item) {
    return item.code
  }
  getLabel(item) {
    return item.value
  }
  getChildren(item) {
    return item.children
  }
  loadStyle(style) {
    return Object.assign({}, defaultStyle, style)
  }
  render() {
    const {
      style,
      ...props
    } = this.props
    const {treeData} = this.state
    const treeSelectProps = {
      ...props,
      style: this.loadStyle(style),
      treeData
    }
    return (
      <TreeSelect {...treeSelectProps}/>
    )
  }
}

export default class CommonTree extends React.Component {
  render() {
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

      treeNodeStyle,
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
      getFieldDecorator
    }
    const treeSelectSettings = {
      style: treeNodeStyle,
      ...props
    }
    return (
      <CommonFormItem
        {...formItemSettings}
      >
        <NativeTree {...treeSelectSettings} />
      </CommonFormItem>
    )
  }
}
