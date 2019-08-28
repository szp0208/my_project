/**
 * Created by wangjun on 2018/1/25.
 */
import * as React from 'react'
import {Form} from 'antd'
import {removeUndefined} from 'util'
import './index.css'

const FormItem = Form.Item

class NativeFormItem extends React.Component {
  render() {
    const {
      prefixCls,
      className,
      id,
      label,
      labelCol,
      wrapperCol,
      help,
      extra,
      validateStatus,
      hasFeedback,
      required,
      style,
      colon = false,
      children
    } = this.props
    const formItemSettings = removeUndefined({
      prefixCls,
      className,
      id,
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
    })
    return (
      <FormItem
        {...formItemSettings}
        >
        {children}
      </FormItem>
    )
  }
}

export default class CommonFormItem extends React.Component {
  static Item = NativeFormItem
  render() {
    const {
      prefixCls,
      className,
      id,
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

      children
    } = this.props
    const formItemSettings = {
      prefixCls,
      className,
      id,
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
      <NativeFormItem
        {...formItemSettings}
        >
        {
          getFieldDecorator(decorator, settings)(
            children
          )
        }
      </NativeFormItem>
    )
  }
}
