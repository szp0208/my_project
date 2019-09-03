import React,{PureComponent} from 'react'
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Input,
  message
} from 'antd';
import style from "./style/Form.scss";
const FormItem = Form.Item;

import {connect} from 'react-redux'
import {mapDispatchToProps} from '../redux/mapDispatchToProps'
import {dealObjectValue} from "util";
@connect(
  state => ({...state.staffCenter}),
  mapDispatchToProps
)

class App extends PureComponent{
  constructor(){
    super();
  }
  componentDidMount(){
    const {getDetailInfo, modalData, action} = this.props;
    if(action == 'detail') {
      getDetailInfo({searchParams: {'id': modalData.id}}, (data)=>{
        console.log(data)
      })
    }
  }
  //关闭弹框
  handleCloseModal() {
    const {update} = this.props
    update({isShowModal: false})
  }
  // 改变当前的输入值
  onInputChange(values) {
    const {modalData, update, form} = this.props
    form.setFieldsValue(dealObjectValue({...modalData, ...values}, ['purchaseName', 'purchaseOrgName', 'supplierName', 'companyName'], true)) //双向绑定表单的值(去除不必要设置的值)
    update({modalData: {...modalData, ...values}})
  }
  //点击提交数据
  handleSubmit = (e) => {
    const {form, modalData, handleCommitModal, action} = this.props
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let reqObj = {...modalData}
        for (let i in reqObj) {
          if (Object.prototype.toString.call(reqObj[i]) === '[object Object]') {
            reqObj[i] = reqObj[i].value
          }
        }
        handleCommitModal({...reqObj}, action, (data) => {
          message.success('提交成功');
          const {handleGetList, searchParams, page, size} = this.props;
          handleGetList({searchParams: {page, size, ...searchParams}})
        })
      }
    })
  }

  render(){
    const {
      form: {getFieldDecorator},
      modalData,
      action,
      modalTuttonLoading,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      }
    };
    return(
      <Modal
        title={action=='add'?'新增':'编辑'}
        className='mskModal antFormExplain'
        visible={true}
        width={1100}
        footer={null}
        maskClosable={false}
        onCancel={()=>{this.handleCloseModal()}}
      >
        <Form className={style.form} onSubmit={this.handleSubmit} autoComplete='off'>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="姓名"
              >
                {getFieldDecorator('name',{
                  initialValue: modalData.name,
                  rules:[{
                    required:true, message:'请填写'
                  }]
                })(
                  <div className='commonInput'>
                    <div className='box'>
                      <Input value={modalData.name} onChange={(e) => {
                          this.onInputChange({'name': e.target.value})
                      }} />
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="编号"
              >
                {getFieldDecorator('code',{
                  initialValue: modalData.code,
                  rules:[{
                    required:true, message:'请填写'
                  }]
                })(
                  <div className='commonInput'>
                    <div className='box'>
                      <Input value={modalData.code} onChange={(e) => {
                        this.onInputChange({'code': e.target.value})
                      }} />
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="性别"
              >
                {getFieldDecorator('sex',{
                  initialValue: modalData.sex,
                  rules:[{
                    required:true, message:'请填写'
                  }]
                })(
                  <div className='commonInput'>
                    <div className='box'>
                      <Input value={modalData.sex} onChange={(e) => {
                        this.onInputChange({'sex': e.target.value})
                      }} />
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="昵称"
              >
                {getFieldDecorator('nickname',{
                  initialValue: modalData.nickname,
                  rules:[{
                    required:true, message:'请填写'
                  }]
                })(
                  <div className='commonInput'>
                    <div className='box'>
                      <Input value={modalData.nickname} onChange={(e) => {
                        this.onInputChange({'nickname': e.target.value})
                      }} />
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="年龄"
              >
                {getFieldDecorator('age',{
                  initialValue: modalData.age,
                  rules:[{
                    required:true, message:'请填写'
                  }]
                })(
                  <div className='commonInput'>
                    <div className='box'>
                      <Input value={modalData.age} onChange={(e) => {
                        this.onInputChange({'age': e.target.value})
                      }} />
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="手机号码"
              >
                {getFieldDecorator('phone',{
                  initialValue: modalData.phone,
                  rules:[{
                    required:true, message:'请填写'
                  }]
                })(
                  <div className='commonInput'>
                    <div className='box'>
                      <Input value={modalData.phone} onChange={(e) => {
                        this.onInputChange({'phone': e.target.value})
                      }} />
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {
                <Row type='flex' justify='end'>
                    <Button type="primary" className={style.mr10} htmlType="submit" loading={modalTuttonLoading}>提交</Button>
                </Row>
              }
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(App)
