import * as actionType from './actionType'
import {getData} from 'util'
import {
  API_GET_INTERFACES_LIST,
  API_GET_INTERFACES_DETAIL,
  API_GET_INTERFACES_ADD,
  API_GET_INTERFACES_UPDATE,
  API_GET_INTERFACES_DELETE,
} from 'api'
import {message} from 'antd'

//同步
export const update = (object) => ({
  type: actionType.INTERFACES_UPDATE,
  data: object,
})

//异步

// 获取列表
export const handleGetList = (reqData) => (dispatch) => {
  dispatch({type: actionType.INTERFACES_UPDATE, data: {tableLoading: true}})
  let reqObj = reqData.searchParams
  for (let i in reqObj) {
    if (Object.prototype.toString.call(reqObj[i]) === '[object Object]') {
      reqObj[i] = reqObj[i].value
    }
  }
  getData({api: API_GET_INTERFACES_LIST, ...reqData}).then(data => {
    // 相应的逻辑判断
    let {page, size} = reqData.searchParams;
    dispatch({
      type: actionType.INTERFACES_UPDATE,
      data: {
        page,
        size,
        tableLoading: false,
        total: data.result.total,
        searchResult: data.result.items || []
      }
    })
  }).catch(err => {
    dispatch({ type: actionType.INTERFACES_UPDATE, data: {tableLoading: false} })
    dispatch({
      type: actionType.INTERFACES_FILE
    })
  })
};

// 获取详情数据
export const getDetailInfo = (reqData) => (dispatch) => {
  getData({api: API_GET_INTERFACES_DETAIL, ...reqData}).then(data => {
    // 相应的逻辑判断
    dispatch({
      type: actionType.INTERFACES_UPDATE,
      data: {
        modalData: data.result || {},
      }
    })
  }).catch(err => {
    dispatch({
      type: actionType.INTERFACES_FILE
    })
  })
};

// 新增员工
export const handleCommitModal = (reqData, action, callBack) => (dispatch) => {
  getData({api: action=='add'?API_GET_INTERFACES_ADD:API_GET_INTERFACES_UPDATE, ...reqData}).then(data => {
    if(data.code != 200) return message.error(data.message)
    // 相应的逻辑判断
    dispatch({
      type: actionType.INTERFACES_UPDATE,
      data: {
        modalData: data.result || {},
      }
    })
    callBack&&callBack(data)
  }).catch(err => {
    dispatch({
      type: actionType.INTERFACES_FILE
    })
  })
};

// 编辑员工
export const handleUpdateStaff = (reqData) => (dispatch) => {
  getData({api: API_GET_INTERFACES_UPDATE, ...reqData}).then(data => {
    // 相应的逻辑判断
    dispatch({
      type: actionType.INTERFACES_UPDATE,
      data: {
        modalData: data.result || {},
      }
    })
  }).catch(err => {
    dispatch({
      type: actionType.INTERFACES_FILE
    })
  })
};

// 删除员工
export const handleDeleteStaff = (reqData, callBack) => (dispatch) => {
  getData({api: API_GET_INTERFACES_DELETE, ...reqData}).then(data => {
    if(data.code != 200) return message.error(data.message)
    callBack && callBack(data)
  }).catch(err => {
    dispatch({
      type: actionType.INTERFACES_FILE
    })
  })
};
