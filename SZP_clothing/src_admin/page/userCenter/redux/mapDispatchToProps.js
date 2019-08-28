import {bindActionCreators} from 'redux'
import * as actions from './action'

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions
}, dispatch)
