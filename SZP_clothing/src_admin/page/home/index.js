import React, {Component} from 'react'
import {withRouter} from 'react-router'
import style from './style/index.scss'

class Adpp extends Component {
  constructor() {
    super()

    this.state = {
      dataType: 'xiaoshou',
      dateTimetype: 'day'
    }
  }

  render() {
    const {dataType, dateTimetype} = this.state
    return (
      <section className={style.homeBox}>
        <h1>更新日志：</h1>
        <div>
          <p>1、添加登录token和登录时间过期</p>
          <p>2、添加登录过滤器、解决跨域问题并静止非法网站调用接口</p>
          <p>3、添加员工管理模块，增加接口增删改查</p>
          <p>4、添加列表的分页功能</p>
          <p>5、添加自动生成员工code字段</p>
          <p>6、添加监控管理模块、接口监控和异常日志监控</p>
        </div>
        <h1>待完成事项：</h1>
        <div>
          <p>1、列表添加查询条件，获取列表信息</p>
          <p>2、添加新模块-库存，功能要自定义添加衣服的种类、单价、数量</p>
          <p>3、添加新模块-员工工作内容，功能要把衣服的种类、单价、数量分配到各个员工</p>
          <p>4、添加新模块-员工工资，根据员工的工作内容、单价、种类计算工资模块</p>
        </div>
      </section>
    )
  }
}

export default withRouter(Adpp)
