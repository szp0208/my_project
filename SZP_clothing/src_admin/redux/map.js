import {bindActionCreators} from 'redux'
import * as userActions from './actions/userAction'

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...userActions
}, dispatch)
