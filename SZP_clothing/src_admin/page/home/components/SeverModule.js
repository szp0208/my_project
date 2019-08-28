import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import style from '../style/gutterBox.scss'

export default class Adpp extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const str = '_x_x___x___x___'
    str.replace(/(x)(-)/)
  }

  render() {
    return (
      <div>
        <Row gutter={{xs: 8, sm: 16, md: 24}}>
          <Col span={8}>
            <div className={style.gutterBox}>
              <img src="/image/supplierIdentify.png" alt=""/>
              <div className={style.gutterTitle}>商户认证</div>
              <div className={style.gutterStatus}>商户已认证</div>
            </div>
          </Col>
          <Col span={8}>
            <div className={style.gutterBox}>
              <img src="/image/productInfo.png" alt=""/>
              <div className={style.gutterTitle}>商品信息</div>
              <Button className={style.antdButton}>未上传商品</Button>
            </div>
          </Col>
          <Col span={8}>
            <div className={style.gutterBox}>
              <img src="/image/orderManage.png" alt=""/>
              <div className={style.gutterTitle}>订单管理</div>
              <Row className={style.orderNumStyle}>
                <Col span={8}>待支付 <span className={style.numStyle}>111</span></Col>
                <Col span={8}>待发货 <span className={style.numStyle}>222</span></Col>
                <Col span={8}>退货确认 <span className={style.numStyle}>333</span></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
