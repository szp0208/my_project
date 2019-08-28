import userReducer from './userReducer'
import {initState} from '../models'

import staffCenterReducer from '../../page/staffCenter/redux/reducer'

let rootReducer = (state = initState, action) => {
  let user = userReducer(state, action),
    staffCenter = staffCenterReducer(state.staffCenter, action),

    newState
  newState = {
    previewData: user.previewData,
    userInfos: user.userInfos,
    userLoation: user.userLoation,
    staffCenter,
  }
	//信息优先级处
  return newState
}

export default rootReducer
