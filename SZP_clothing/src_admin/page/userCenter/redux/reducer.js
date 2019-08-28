import {handleActions} from 'redux-actions'
import {initState} from '../../../redux/models'
import * as actionType from './actionType'

export default handleActions({
  //更新信息
  [actionType.FROZEN_UPDATE]: (state, {data}) => {
    let newState = {...state, ...data}
    return newState
  },
  [actionType.FROZEN_FILE]: (state) => {
    let newState = {...state, modalTuttonLoading: false, tableLoading: false}
    return newState
  }
}, initState)
