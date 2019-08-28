/*
 * author: shizhipeng
 * createdTime: 2019/07/23
 * */
import {Bread} from 'Bread';
import React, {PureComponent} from 'react';
import {
  Form,
  Table,
} from './components'

import {connect} from 'react-redux'
import {mapDispatchToProps} from './redux/mapDispatchToProps'
@connect(
  state => ({...state.frozen}),
  mapDispatchToProps
)

export default class App extends PureComponent{
  constructor(){
    super()
  }
  render(){
    return(
      <section>
        <Bread route={['供应商对账', '供应商冻结']}></Bread>
        <Form/>
        <Table />
      </section>
    )
  }
}
