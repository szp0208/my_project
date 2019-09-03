import React, {PureComponent} from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
} from 'antd';
import style from './style/Form.scss'
const { RangePicker } = DatePicker

import {connect} from 'react-redux'
import {mapDispatchToProps} from '../redux/mapDispatchToProps'
@connect(
  state => ({...state.staffCenter}),
  mapDispatchToProps
)

class App extends PureComponent{
  constructor(){
    super(...arguments)
  }
  // 改变当前的输入值
  onInputChange(values) {
    const {searchParams, update} = this.props
    update({searchParams: {...searchParams, ...values}})
  }
  // 查询数据
  query = () => {
    const {handleGetList, searchParams, size, update} = this.props
    let reqObj = {...searchParams}
    update({page: 1});
    handleGetList({searchParams: {...reqObj, page: 1, size}})
  }
  // 重置
  reset = () => {
    const {update, handleGetList, size} = this.props
    update({searchParams: {}, page: 1})
    handleGetList({searchParams: {page: 1, size}});
  }
  //操作
  operate(type) {
    const {update} = this.props;
    switch (type) {
      case 1: //新增按钮
        update({'isShowModal': true, 'action': 'add', modalData: {}})
        break;
    }
  }
  render(){
    const {
      searchParams: {
        id,
      }
    } = this.props;
    return(
      <Form className={style.form}>
        <Row ref={(ref)=>{this.formDOM=ref}} gutter={24} type='flex' justify='start'>
          <Col span={8}>
            <div className='commonInput'>
              <label>员工ID：</label>
              <div className='box'>
                <Input value={id} onChange={(e) => {
                  this.onInputChange({id: e.target.value})
                }} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row type='flex' justify='end'>
              <Button type='primary' className={style.mr10} onClick={()=>{ this.query() }}>查询</Button>
              <Button type='primary' className={style.mr10} onClick={()=>{ this.operate(1) }}>新增</Button>
              <Button className={style.mr10} onClick={()=>{ this.reset() }}>重置</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(App)
