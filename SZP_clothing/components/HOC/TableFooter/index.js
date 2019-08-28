/*
 * author: zero
 * createdTime: 2018/04/26
 * */

import React, {PureComponent} from 'react'
import {
  Table
} from 'antd'

export default class TableComponent extends PureComponent {
  constructor(props) {
    super(props)

    this.columns = []
  }

  componentWillMount() {
    const {
      columns,
      dataIndex
    } = this.props

    columns.map((item, index) => {
      let obj = Object.assign({}, item)
      if (obj.render) obj.render = (text, record, index) => text || ''
      if (obj.dataIndex === 'index') obj.width = dataIndex || 110
      this.columns[index] = obj
    })
  }

  render() {
    const {
      dataSource,
      ...props
    } = this.props

    const tableSettings = {
      ...props,
      dataSource,
      style: {margin: '-16px', marginTop: '-13px'},
      columns: this.columns,
      pagination: false,
      showHeader: false
    }

    return (
      <Table {...tableSettings}/>
    )
  }
}
