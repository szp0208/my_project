/*
 * author: wxq
 * createdTime: 2019/05/13
 * */
import React, {PureComponent} from 'react'
import {
  Input
} from 'antd'
class CsxTextArea extends PureComponent {
  constructor() {
    super()
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    const {
      label,
      style,
      antd,
      remark,
      onChange,
      number
    } = this.props
    return (
      <div className='commonInput' style={{height: 'auto'}}>
        {
          label ? <label>{label}：</label> : null
        }
        <div className='box'>
          <Input.TextArea {...antd} style={style} value={remark} onChange={(e) => {
            if (e.target.value.length > number) return
            onChange(e.target.value)
          }}/>
          <span className='textAreaMark'>{remark.length}/{number}</span>
        </div>
      </div>
    )
  }
}
export default CsxTextArea
