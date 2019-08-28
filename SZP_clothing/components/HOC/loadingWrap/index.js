/**
 * Created by wangjun on 2018/1/25.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading.js'

function dispatchLoadingWrap(Component) {
  class DispatchLoadingWrap extends React.Component {
    render() {
      return React.createElement(Component, Object.assign({}, this.props, {addLoading: this.context.addLoading}))
    }
  }
  DispatchLoadingWrap.contextTypes = {
    addLoading: PropTypes.func
  }
  return DispatchLoadingWrap
}

export default function loadingWrap(Component) {
  class LoadingWrap extends React.Component {
    constructor(props, context) {
      super(props, context)
      this.state = {loadingElement: null}
      this.queue = []
      this.addLoading = this.addLoading.bind(this)
    }
    getChildContext() {
      return {addLoading: this.addLoading}
    }
    closeLoading(tag) {
      this.queue = this.queue.filter(item => item !== tag)
      if (!this.queue.length) {
        this.setState({loadingElement: <Loading visible={false}/>})
      }
    }
    addLoading() {
      let tag = {}
      this.queue.push(tag)
      this.setState({loadingElement: <Loading visible={true}/>})
      return () => {
        this.closeLoading(tag)
      }
    }
    render() {
      return <div style={{position: 'relative'}}>
        {React.createElement(Component, Object.assign({}, this.props, {addLoading: this.addLoading}))}
        {this.state.loadingElement}
      </div>
    }
  }
  LoadingWrap.contextTypes = {
    addLoading: PropTypes.func
  }
  LoadingWrap.childContextTypes = {
    addLoading: PropTypes.func
  }
  return LoadingWrap
}
loadingWrap.dispatchLoadingWrap = dispatchLoadingWrap
