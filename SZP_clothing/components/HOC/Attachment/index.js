import React, {Component} from 'react'
import {Upload, message} from 'antd'
import {getVariantSession, LOGIN_TOKEN} from 'Variant'
import {generateUrl} from 'util'
import _ from 'lodash'

const fileToArray = arr => {
  if (arr && arr.length > 0) {
    return arr.map((item, index) => ({
      uid: `${item.fileName}-${index}`,
      name: item.fileName,
      status: 'done',
      url: item.fileUrl
    }))
  }
  return []
}

export default class Attachment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: fileToArray(props.value)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({fileList: fileToArray(nextProps.value)})
    }
  }

  handleBeforeUpload = () => {
    const {fileList} = this.state
    if (fileList && fileList.length >= 10) {
      message.error('文件上传数量不能大于10')
      return false
    }
  }

  handleRemove = file => {
    const {name} = file
    const {fileList} = this.state
    const newFileList = fileList.filter(i => i.name !== name).map(i => ({
      fileName: i.name,
      fileUrl: i.url
    }))
    this.props.onChange(newFileList)
  };

  handleFileSuccess = (file) => {
    const {data, code} = file
    if (code == 200000) {
      const {fileList} = this.state
      const newFileList = fileList.map(i => ({
        fileName: i.name,
        fileUrl: i.url
      }))
      newFileList.push({...data})
      this.props.onChange(newFileList)
    } else {
      message.error(file.message)
    }
  };

  render() {
    const {action, maxSize, showUploadList, multiple, disabled} = this.props
    const {fileList} = this.state
    const {data, searchParams, urlParams, replaceParams, api} = action
    const url = _.isObject(action)
      ? generateUrl(api, searchParams, urlParams, replaceParams)
      : action
    const updateProps = {
      data,
      action: url,
      accept: 'image/*,.pdf',
      headers: {
        'login-token': getVariantSession(LOGIN_TOKEN),
        'X-Requested-With': null
      },
      // customRequest: this.handleCustomRequest,
      onSuccess: this.handleFileSuccess,
      onRemove: this.handleRemove,
      maxSize,
      multiple,
      disabled,
      showUploadList,
      beforeUpload: this.handleBeforeUpload
    }
    return (
      <Upload {...updateProps} fileList={fileList}>
        {this.props.children}
      </Upload>
    )
  }
}
