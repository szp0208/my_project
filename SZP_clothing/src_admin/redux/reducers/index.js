import userReducer from './userReducer'
import {initState} from '../models'

import userCenterReducer from '../../page/userCenter/redux/reducer'

let rootReducer = (state = initState, action) => {
  let user = userReducer(state, action),
    userCenter = userCenterReducer(state.userCenter, action),

    newState
  newState = {
    previewData: user.previewData,
    userInfos: user.userInfos,
    userLoation: user.userLoation,
    userCenter,
  }
	//信息优先级处
  return newState
}

export default rootReducer
