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
  state => ({...state.staffCenter}),
  mapDispatchToProps
)

export default class App extends PureComponent{
  constructor(){
    super();
    this.columns = [
      {
        title: '操作',
        width: 80,
        key: '',
        dataIndex: '',
        render: (text, record, index) => (
          <div>
            <span style={{color:'#1890ff', marginRight: '10px', cursor: 'pointer'}} onClick={() => {
              const {update} = this.props;
              update({'isShowModal': true, 'action': 'detail', modalData: {id: record.id}});
            }}>编辑</span>
            <span style={{color:'red', cursor: 'pointer'}} onClick={() => {
              const {handleDeleteStaff} = this.props;
              confirm({
                title: '温馨提示',
                content: '确定删除该员工？',
                okText: '确定',
                width: 520,
                cancelText: '取消',
                onOk() {
                  handleDeleteStaff({searchParams: {id: record.id}});
                }
              })
            }}>删除</span>
          </div>
        ),
      },
      {
        title: '姓名',
        width: 80,
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '员工编号',
        width: 80,
        key: 'code',
        dataIndex: 'code'
      },
      {
        title: '昵称',
        width: 80,
        key: 'nickname',
        dataIndex: 'nickname'
      },
      {
        title: '性别',
        width: 80,
        key: 'sex',
        dataIndex: 'sex'
      },
      {
        title: '年龄',
        width: 80,
        key: 'age',
        dataIndex: 'age'
      },
      {

        title: '手机号',
        width: 80,
        key: 'phone',
        dataIndex: 'phone'
      },
    ]
  }
  componentDidMount() {
    const {handleGetList, searchParams, page, size} = this.props;
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
