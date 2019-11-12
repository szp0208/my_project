import userReducer from './userReducer'
import {initState} from '../models'

import staffCenterReducer from '../../page/staffCenter/redux/reducer'
import interfacesReducer from '../../page/interfaces/redux/reducer'
import journalsReducer from '../../page/journals/redux/reducer'

let rootReducer = (state = initState, action) => {
  let user = userReducer(state, action),
    staffCenter = staffCenterReducer(state.staffCenter, action),
    interfaces = interfacesReducer(state.interfaces, action),
    journals = journalsReducer(state.journals, action),


    newState
  newState = {
    previewData: user.previewData,
    userInfos: user.userInfos,
    userLoation: user.userLoation,

    staffCenter,
    interfaces,
    journals,

  }
	//信息优先级处
  return newState
}

export default rootReducer
