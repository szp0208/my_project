/*
* author: zero
* updateTime: 2018/09/10
* */
import React from 'react'

class Bundle extends React.Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    // 加载 title
    if (this.props.title) document.title = this.props.title || '企业购平台'
    // 加载初始状态
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    // 重置状态
    this.setState({
      mod: null
    })
    // 传入组件的组件
    props.load && this.setState({
      // handle both es imports and cjs
      mod: props.load.default ? props.load.default : props.load
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod, this.props) : null
  }
}

export default Bundle

/* bundle模型用来异步加载组件 */
export const bundleComponent = (title) => (loaded, props) => (
  <Bundle load={loaded} title={title} {...props}>
    {(List, props) => <List {...props}/>}
  </Bundle>
)
