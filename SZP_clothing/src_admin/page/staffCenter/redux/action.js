import * as actionType from './actionType'
import {getData} from 'util'
import {
  API_GET_STAFFCENTER_LIST
} from 'api'

//同步
export const update = (object) => ({
  type: actionType.STAFFCENTER_UPDATE,
  data: object,
})

//异步

// 获取列表
export const handleGetList = (reqData) => (dispatch) => {
  dispatch({type: actionType.STAFFCENTER_UPDATE, data: {tableLoading: true}})
  let reqObj = reqData.searchParams
  for (let i in reqObj) {
    if (Object.prototype.toString.call(reqObj[i]) === '[object Object]') {
      reqObj[i] = reqObj[i].value
    }
  }
  console.log(API_GET_STAFFCENTER_LIST)
  getData({api: API_GET_STAFFCENTER_LIST, ...reqData}).then(data => {
    // 相应的逻辑判断
    let {page, size} = reqData.searchParams;
    dispatch({
      type: actionType.STAFFCENTER_UPDATE,
      data: {
        page,
        size,
        tableLoading: false,
        total: data.result.total,
        searchResult: data.result || []
      }
    })
  }).catch(err => {
    dispatch({ type: actionType.STAFFCENTER_UPDATE, data: {tableLoading: false} })
    dispatch({
      type: actionType.STAFFCENTER_FILE
    })
  })
};
