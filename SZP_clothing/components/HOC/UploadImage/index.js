/*
 * author: szp
 * tips: 图片上传组件，支持单张或者多张图片上传
 * createdTime: 2019/08/12
 * */

import React, {PureComponent} from 'react'
import {Modal, message, Upload, Icon} from 'antd'
import {getVariantSession, LOGIN_TOKEN} from 'Variant'
import {generateUrl} from 'util'
import {API_POST_UPLOAD} from 'api'
const confirm = Modal.confirm

export default class UploadImage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      previewUpload: { //图片预览弹框
        previewVisible: false,
        previewImage: ''
      },
    }
  }

  //点击预览图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.setState({previewUpload: {previewVisible: true, previewImage: file.url || file.preview}})
  };
  //点击提交base64
  getBase64(file, callback, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  //关闭预览图片的弹框
  handleCancel = () => {
    this.setState({previewUpload: {previewVisible: false, previewImage: ''}})
  }

  //上传之前执行的方法
  beforeUpload = file => {
    const {maxSize} = this.props;
    let config = {
      maxSize: maxSize || 2
    }
    if(file.size / 1024 / 1024 > config.maxSize) {
      message.error('上传图片超过2Mb')
      return false;
    }
  }

  //上传后执行的方法:TODO
  handleChange(file) {

  }

  render() {
    const {previewUpload} = this.state;
    //参数：（fileData：图片list，maxLength：图片限制，最大允许上传几张图片, name：上传的字段名称）
    const {action, onChange, beforeUpload, fileData, maxLength, name, fileTips, fileList, isShowDel, ...props} = this.props;
    let url, fileData_ = fileData?fileData:[];
    if(action) {  //如果有配置
      const {data, searchParams, urlParams, replaceParams, api} = action; //图片上传需要配置的网络地址和参数
      //获取图片需要上传的api地址
      url = _.isObject(action)
        ? generateUrl(api, searchParams, urlParams, replaceParams)
        : action
    } else {
      url = generateUrl(API_POST_UPLOAD)
    }
    let settings = {
      name: name?name:"multipartFile",
      showUploadList: true,
      action: url,
      headers: {'login-token': getVariantSession(LOGIN_TOKEN), 'X-Requested-With': null},
      listType: "picture-card",
      beforeUpload: beforeUpload || this.beforeUpload,
      onPreview: this.handlePreview,
      onChange: (file)=>{
        //如果beforeUpload返回false表示不上传，禁止返回数据
        if(file.file&&file.file.status) {
          onChange&&onChange(file) || this.handleChange(file)
        }
      }
    }
    return(
      <div style={{'position': 'relative', 'float': 'left', 'width': '100%'}}>
        <Upload
          {...props} {...settings}
          fileList={fileData}
          showUploadList={{showRemoveIcon: isShowDel?false:true}}
          accept=".jpg, .png, .gif, .bmp, .webp, .jpeg"
        >
          {
            fileData_.length >= maxLength ? null :
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
          }
        </Upload>
        <div style={{'position': 'absolute', 'bottom': '-20px'}}>{fileTips?fileTips:''}</div>
        <Modal visible={previewUpload.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewUpload.previewImage} />
        </Modal>
      </div>
    )
  }
}
