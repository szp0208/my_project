/*import React, {Component} from 'react'

const withRouteOnEnter = callback => BaseComponent => {
  const routeOnEnterCallback = (props) => {
    if (callback && typeof callback === 'function') {
      callback(props)
    }
  }

  const routerOnLeaveCallback = props => {
    if (callback && typeof callback === 'function') {
      callback(props)
    }
  }

  class routeOnEnterComponent extends Component {
    componentWillMount() {
      routeOnEnterCallback(this.props)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location.key !== this.props.location.key) {
        routeOnEnterCallback(nextProps)
      }
    }

    componentWillUnmount() {
      routerOnLeaveCallback(this.props)
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }

  return routeOnEnterComponent
}*/

// ...
//
// const loadData = props => {
//   fetch(props.someId)
// }

{ /* <Route path="/abc/ad" component={withRouteOnEnter(loadData)(app)} /> */ }
