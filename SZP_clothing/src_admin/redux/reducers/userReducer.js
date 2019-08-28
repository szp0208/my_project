import {handleActions} from 'redux-actions'
import {initState} from '../models'

export default handleActions({
  //更新用户信息
  UPDATE_USER: (state, {data}) => {
    let newState = {...state, ...data}
    return newState
  }
}, initState)
