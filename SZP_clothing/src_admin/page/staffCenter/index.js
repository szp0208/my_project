import {Bread} from 'Bread';
import React, {PureComponent} from 'react';
import {
  Form,
  Table,
  AddModal,
} from './components'

import {connect} from 'react-redux'
import {mapDispatchToProps} from './redux/mapDispatchToProps'
@connect(
  state => ({...state.staffCenter}),
  mapDispatchToProps
)

export default class App extends PureComponent{
  constructor(){
    super()
  }
  render(){
    return(
      <section>
        <Bread route={['员工管理', '员工中心']}></Bread>
        <Form/>
        <Table />
        {
          this.props.isShowModal ? <AddModal /> : null
        }
      </section>
    )
  }
}
