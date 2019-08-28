import * as React from 'react'
import {Input} from 'antd'
import CommonFormItem from '../CommonFormItem/'

class NativeInput extends React.Component {
  render() {
    return (
      <Input {...this.props}/>
    )
  }
}

export default class CommonInput extends React.Component {
  static Input = NativeInput;
  render() {
    const {
      prefixCls,
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

      ...props
      } = this.props
    const formItemSettings = {
      prefixCls,
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
    const inputSettings = {
      ...props
    }
    return (
      <CommonFormItem
        {...formItemSettings}
        >
        <NativeInput {...inputSettings}/>
      </CommonFormItem>
    )
  }
}
