/*
 * author: zero
 * createdTime: 2018/04/17
 * */

import React, {PureComponent} from 'react'
import {Modal, message, Upload} from 'antd'
import {getVariantSession, LOGIN_TOKEN} from 'Variant'
import {generateUrl} from 'util'
import _ from 'lodash'
const confirm = Modal.confirm
const info = Modal.info

export default class Import extends PureComponent {
  constructor(props) {
    super(props)
  }

  /* 报错导出 */
  handleExportError = res => {
    const {onExprotErrorCancel,onExprotError} = this.props
    let _this = this

    if (res.code != 200) {
      info({
        title: '温馨提示',
        content: `${res && res.message}`,
        okText: '我知道了',
        // cancelText: '我知道了',
        onOk() {
          typeof onExprotError === 'function' && onExprotError()
          // res.result && res.result.downloadUrl ? _this.downloadError(res) : message.error('系统异常')
        },
        onCancel() {
          typeof onExprotErrorCancel === 'function' && onExprotErrorCancel()
        }
      })
    } else {
      confirm({
        title: '温馨提示',
        content: `${res.message}`,
        okText: '我知道了',
        onOk() {
          typeof onExprotErrorCancel === 'function' && onExprotErrorCancel()
        },
        onCancel() {
        }
      })
    }
  }

  // 下载导出报错的信息
  downloadError = (res) => {
    let a = document.createElement('a')
    document.body.appendChild(a)
    let url = res.result.downloadUrl
    a.href = url
    a.download = '报错导出'
    a.click()
    document.body.removeChild(a)
  }

  /* 导入文件事件 */
  handleChange = info => {
    const {onOk, onError, onExprotError, onResponse} = this.props

    if (
      typeof info.file.status !== 'undefined' &&
      info.file.status !== 'uploading'
    ) {
      let res = info.file.response

      if (typeof res != 'object' || !res) {
        return message.error('系统异常')
      }

      if (res.result && res.result.success) {
        _.isFunction(onOk) ? onOk(res) : message.success('导入成功')
      } else if (res.code == 2 || res.code == 600230 || res.code == 600207) {
        // 登陆超时处理
        history.replace('/')
      } else {
        _.isFunction(onResponse) && onResponse(res) // 导入失败，

        /*
        * 400200 : prices
        * 405018 : productcenter
        * 401069 : inventorycenter
        * 412105 : orders
        * 1021 : dmcenter
        * 410001 : cmscenter
        * */
        // let ExportErrorCodes = [401069, 405018, 400200, 412105, 412552, 1021, 410001]
        // 导入失败，错误处理
        if (_.isFunction(onError)) {
          onError(res)
        } else if (
          _.isFunction(onExprotError)
        ) {
          this.handleExportError(res)
        } else {
          message.error(res.message || '导入失败')
        }
      }
    }
  }

  /* 判断上传文件类型 */
  beforeUpload = file => {
    const {
      beforeImport,
      fileType, // 优先判断文件类型
      maxSize, // 判断文件体积最大值, 1k == 1024b
      overSizeMessage // 因业务需要可能会存在比较友善的提示、所以超出文件大小时增加自定义提示api
    } = this.props

    if (_.isFunction(beforeImport) && beforeImport()) return false

    let bool = false
    if (fileType) {
      if (_.isArray(fileType)) {
        let regexp = new RegExp(`\\.(${fileType.join('|')})`)
        bool = regexp.test(file.name)
      } else if (_.isString(fileType)) {
        let regexp = new RegExp(`\\.${fileType}`)
        bool = regexp.test(file.name)
      }
    } else {
      // defined default
      bool = file.name.includes('xlsx') || file.name.includes('xls') || file.name.includes('zip')
    }

    if (!bool) {
      return message.error('导入文件格式不正确')
      // return bool
    }

    if (maxSize && _.isNumber(maxSize)) {
      if (file.size > maxSize) {
        message.error(overSizeMessage || '导入文件太大')
        return false
      }
    }
    return bool
  }

  render() {
    const {action, onChange, ...props} = this.props
    const {data, searchParams, urlParams, replaceParams, api} = action
    let url = _.isObject(action)
      ? generateUrl(api, searchParams, urlParams, replaceParams)
      : action
    let settings = {
      action: url,
      data,
      name: 'file',
      // accept: 'image/*,.pdf,.word,.xlsx,.xls',
      accept: '.xlsx,.xls',
      headers: {
        'login-token': getVariantSession(LOGIN_TOKEN),
        'X-Requested-With': null
      },
      showUploadList: this.props.showUploadList || false,
      beforeUpload: this.beforeUpload,
      onChange: onChange || this.handleChange
    }

    return <Upload {...props} {...settings} />
  }
}
