/*
 * author: zero
 * createdTime: 2018/04/09
 * */

import React, {PureComponent} from 'react'
import {
  Input,
  Form
} from 'antd'

const FormItem = Form.Item

class NativeInput extends React.Component {
  render() {
    return (
      <Input {...this.props}/>
    )
  }
}

export default class TableItemInput extends PureComponent {
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
      className: formItemClass,
      id: formItemId,
      validateStatus: validateStatus || 'success',
      help: help || ''
    }

    const inputSettings = {
      defaultValue: initialValue,
      ...props
    }

    return (
      <FormItem {...FormItemSettings}>
        <NativeInput {...inputSettings}/>
      </FormItem>
    )
  }
}
