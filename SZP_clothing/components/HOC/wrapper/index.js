import React, {Component} from 'react'
import PropTypes from 'prop-types'

const heightFunc = hookFn => InnerComponent => {
  let ref = InnerComponent.prototype
  let cache = ref.clickFunc
  ref.clickFunc = function(...args) {
    cache.apply(this, args)
    hookFn()
  }
}

@heightFunc(() => console.log('hook is called'))
export class firstComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'hello world'
    }
  }

  static PropTypes = {
    velocity: PropTypes.number
  }

  static defaultProps = {
    velocity: 500
  }

  clickFunc = () => {
    this.setState({text: 'I am clicked'})
  }

  render() {
    return (
      <div onClick={this.clickFunc}>
        {this.state.text}
      </div>
    )
  }

}
