/**
 * Created by 李华良 on 2018/10/17
 */

import React from 'react'
import style from '../style/ShinningInput.scss'

class ShinningInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false
    }
    this.inputRef = null
  }

  handleCompClick = e => {
    this.inputRef.focus()
  }

  handleInputFocus = e => {
    this.setState({isFocused: true})
    this.props.onFocus && this.props.onFocus(e)
  };

  handleInputBlur = e => {
    this.setState({isFocused: false})
    this.props.onBlur && this.props.onBlur(e)
  };

  render() {
    const {isFocused} = this.state
    const {label, placeholder, ...passThroughProps} = this.props
    const className = [
      style.shinningInput,
      isFocused ? style.focused : style.blured
    ].join(' ')
    return (
      <div className={className} onClick={this.handleCompClick}>
        <label>{ label }</label>
        <input
          {...passThroughProps}
          placeholder={isFocused ? '' : placeholder}
          ref={ref => (this.inputRef = ref)}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
      </div>
    )
  }
}

export default ShinningInput
