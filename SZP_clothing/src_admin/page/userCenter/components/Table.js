import React, {PureComponent} from 'react';
import {
  Table,
  Modal,
  message,
} from 'antd'
const confirm = Modal.confirm

import {connect} from 'react-redux'
import {mapDispatchToProps} from '../redux/mapDispatchToProps'
@connect(
  state => ({...state.frozen}),
  mapDispatchToProps
)

export default class App extends PureComponent{
  constructor(){
    super();
    this.columns = [{
      title: '操作',
      width: 120,
      key: '',
      dataIndex: '',
      render: (text, record, index) => (
        <div className="tableOperation">
            <span style={{color:'#1890ff'}} onClick={() => {
              this.handleEdit(record);
            }}>{record.supplierStatus==0?'冻结':'取消冻结'}</span>
        </div>),
    },{
      title: '采购组织',
      width: 100,
      key: 'procurementOrganizationCode',
      dataIndex: 'procurementOrganizationCode'
    },{
      title: '采购组织名称',
      width: 200,
      key: 'procurementOrganizationName',
      dataIndex: 'procurementOrganizationName'
    },{
      title: '供应商代码',
      width: 100,
      key: 'supplierCode',
      dataIndex: 'supplierCode'
    },{
      title: '供应商名称',
      width: 200,
      key: 'supplierName',
      dataIndex: 'supplierName'
    },{
      title: '冻结状态',
      width: 100,
      key: 'supplierStatus',
      dataIndex: 'supplierStatus',
      render:(text)=>{
        switch (text) {
          case '0': return '未冻结';break;
          case '1': return '冻结';break;
        }
      }
    },{
      title: '更改时间',
      width: 100,
      key: 'updateTime',
      dataIndex: 'updateTime',
      render:(text)=>{
        return new Date(text).toLocaleDateString().replace(/\//g,'-')
      }
    },{
      title: '更改人',
      width: 80,
      key: 'updateBy',
      dataIndex: 'updateBy'
    }]; //表格头
  }
  componentDidMount() {
    const {handleGetList, searchParams, page, size} = this.props
    handleGetList({searchParams: {page, size, ...searchParams}})
  }
  //修改冻结状态
  handleEdit(record) {
    const {updateFrozenState, handleGetList, page, searchParams, size} = this.props
    confirm({
      title: '温馨提示',
      content: `确认修改冻结状态？`,
      okText: '确认',
      width: 520,
      cancelText: '取消',
      onOk() {

        updateFrozenState([record.supplierCode, record.procurementOrganizationCode, record.supplierStatus==0?1:0], (data)=>{
          message.success('修改成功')
          handleGetList({searchParams: {page, size, ...searchParams}})
        })
      }
    })
  }
  /* 页码和每页显示数量改变 */
  pageSizeChange = (current, pageSize) => {
    const {update, handleGetList, searchParams} = this.props;
    if (!current || !pageSize) return false
    update({
      page: current,
      size: pageSize,
    })
    handleGetList({searchParams: {page: current, size: pageSize, ...searchParams}})
  }
  render(){
    const {
      total,
      page,
      size,
      tableLoading,
      searchResult
    } = this.props
    let pagination = {
      total,
      showTotal: (total, range) => `共 ${total} 条`, // 显示总数
      showQuickJumper: true, // 是否可以快速跳转至某页
      current: page,
      pageSize: size,
      showSizeChanger: true, // 是否可以改变 pageSize
      onShowSizeChange: this.pageSizeChange, // 是否可以改变 pageSize
      onChange: this.pageSizeChange,
      className: 'pagination',
       pageSizeOptions: ['10', '50', '100', '200']
    }
    return(
      <div className="table-group">
        <Table
          rowKey={record => record.id}
          loading={tableLoading}
          columns={this.columns}
          dataSource={searchResult}
          // scroll={{x: 1000, y: 400}}
          onChange={this.onChange}
          pagination={pagination}
        />
      </div>
    )
  }
}
