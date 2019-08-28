import React, {PureComponent} from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
} from 'antd';
import {
  API_GET_SEARCHSUPPLIER,
  API_GET_PURCHASEORG,
  API_GET_PURCHASERGROUP,
} from 'api'
import {CsxSelect, CsxSearch} from 'Form'
import style from './style/Form.scss'
const { RangePicker } = DatePicker

import {connect} from 'react-redux'
import {mapDispatchToProps} from '../redux/mapDispatchToProps'
@connect(
  state => ({...state.frozen}),
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
  render(){
    const {
      searchParams: {
        supplierCode,
        procurementOrganizationCode,
        frozenStatus,
      }
    } = this.props;
    return(
      <Form className={style.form}>
        <Row ref={(ref)=>{this.formDOM=ref}} gutter={24} type='flex' justify='start'>
          <Col span={8}>
            <CsxSelect
              antd={{ allowClear:true }}
              dateApi={API_GET_PURCHASEORG}
              label='采购组织'
              selectItem={{key: 'purchaseOrgCode', valueKey: ['purchaseOrgCode', 'purchaseOrgName'], data: procurementOrganizationCode}}
              onChangeSelect={(data)=>{
                this.onInputChange({procurementOrganizationCode:data, procurementOrganizationName: data.children})
              }}
            />
          </Col>
          <Col span={8}>
            <CsxSearch
              dateApi={API_GET_SEARCHSUPPLIER}
              label='供应商'
              keyWordsLength={4}
              searchParamsKey='supplierCode'
              selectItem={{data: supplierCode, key: 'supplierCode', valueKey: 'supplierName'}}
              onSelect={(data) => {
                this.onInputChange({supplierName: data.children, supplierCode: data})
              }}
              onChangeSelect={(data) => {
                if(!data) {
                  this.onInputChange({supplierName: data.children, supplierCode: data})
                }
              }}
            />
          </Col>
          <Col span={8}>
            <CsxSelect
              antd={{ allowClear:true }}
              label='冻结状态'
              data={[{'key': '0', 'value': '未冻结'}, {'key': '1', 'value': '冻结'}]}
              selectItem={{key: 'key', valueKey: 'value',data: frozenStatus}}
              onChangeSelect={(data)=>{
                this.onInputChange({frozenStatus:data})
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row type='flex' justify='end'>
              <Button type='primary' className={style.mr10} onClick={()=>{ this.query() }}>查询</Button>
              <Button className={style.mr10} onClick={()=>{ this.reset() }}>重置</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(App)
