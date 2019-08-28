import * as actionType from './actionType'
import {getData} from 'util'
import {
  API_GET_SUPPLIER_LIST,  //获取供应商冻结列表
  API_GET_FROZEN_STATUS,
} from 'api'

//同步
export const update = (object) => ({
  type: actionType.FROZEN_UPDATE,
  data: object,
})

//异步

// 获取列表
export const handleGetList = (reqData) => (dispatch) => {
  dispatch({type: actionType.FROZEN_UPDATE, data: {tableLoading: true}})
  let reqObj = reqData.searchParams
  for (let i in reqObj) {
    if (Object.prototype.toString.call(reqObj[i]) === '[object Object]') {
      reqObj[i] = reqObj[i].value
    }
  }
  getData({api: API_GET_SUPPLIER_LIST, ...reqData}).then(data => {
    // 相应的逻辑判断
    let {page, size} = reqData.searchParams;
    dispatch({
      type: actionType.FROZEN_UPDATE,
      data: {
        page,
        size,
        tableLoading: false,
        total: data.result.total,
        searchResult: data.result.list || []
      }
    })
  }).catch(err => {
    dispatch({ type: actionType.FROZEN_UPDATE, data: {tableLoading: false} })
    dispatch({
      type: actionType.FROZEN_FILE
    })
  })
};
//修改冻结状态
export const updateFrozenState = (reqData, callBack) => (dispatch) => {
  dispatch({type: actionType.FROZEN_UPDATE, data: {}});
  getData({api: API_GET_FROZEN_STATUS, urlParams: reqData}).then(data => {
    callBack&&callBack(data)
  }).catch(err => {
    dispatch({
      type: actionType.FROZEN_FILE
    })
  })
}
