import React, {Component} from 'react'
import {withRouter} from 'react-router'

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
      <section>
        <div>欢迎来到主页</div>
      </section>
    )
  }
}

export default withRouter(Adpp)
