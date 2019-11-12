import * as actionType from './actionType'
import {getData} from 'util'
import {
  API_GET_JOURNALS_LIST,
  API_GET_JOURNALS_DETAIL,
  API_GET_JOURNALS_ADD,
  API_GET_JOURNALS_UPDATE,
  API_GET_JOURNALS_DELETE,
} from 'api'
import {message} from 'antd'

//同步
export const update = (object) => ({
  type: actionType.JOURNALS_UPDATE,
  data: object,
})

//异步

// 获取列表
export const handleGetList = (reqData) => (dispatch) => {
  dispatch({type: actionType.JOURNALS_UPDATE, data: {tableLoading: true}})
  let reqObj = reqData.searchParams
  for (let i in reqObj) {
    if (Object.prototype.toString.call(reqObj[i]) === '[object Object]') {
      reqObj[i] = reqObj[i].value
    }
  }
  getData({api: API_GET_JOURNALS_LIST, ...reqData}).then(data => {
    // 相应的逻辑判断
    let {page, size} = reqData.searchParams;
    dispatch({
      type: actionType.JOURNALS_UPDATE,
      data: {
        page,
        size,
        tableLoading: false,
        total: data.result.total,
        searchResult: data.result.items || []
      }
    })
  }).catch(err => {
    dispatch({ type: actionType.JOURNALS_UPDATE, data: {tableLoading: false} })
    dispatch({
      type: actionType.JOURNALS_FILE
    })
  })
};

// 获取详情数据
export const getDetailInfo = (reqData) => (dispatch) => {
  getData({api: API_GET_JOURNALS_DETAIL, ...reqData}).then(data => {
    // 相应的逻辑判断
    dispatch({
      type: actionType.JOURNALS_UPDATE,
      data: {
        modalData: data.result || {},
      }
    })
  }).catch(err => {
    dispatch({
      type: actionType.JOURNALS_FILE
    })
  })
};

// 新增员工
export const handleCommitModal = (reqData, action, callBack) => (dispatch) => {
  getData({api: action=='add'?API_GET_JOURNALS_ADD:API_GET_JOURNALS_UPDATE, ...reqData}).then(data => {
    if(data.code != 200) return message.error(data.message)
    // 相应的逻辑判断
    dispatch({
      type: actionType.JOURNALS_UPDATE,
      data: {
        modalData: data.result || {},
      }
    })
    callBack&&callBack(data)
  }).catch(err => {
    dispatch({
      type: actionType.JOURNALS_FILE
    })
  })
};

// 编辑员工
export const handleUpdateStaff = (reqData) => (dispatch) => {
  getData({api: API_GET_JOURNALS_UPDATE, ...reqData}).then(data => {
    // 相应的逻辑判断
    dispatch({
      type: actionType.JOURNALS_UPDATE,
      data: {
        modalData: data.result || {},
      }
    })
  }).catch(err => {
    dispatch({
      type: actionType.JOURNALS_FILE
    })
  })
};

// 删除员工
export const handleDeleteStaff = (reqData, callBack) => (dispatch) => {
  getData({api: API_GET_JOURNALS_DELETE, ...reqData}).then(data => {
    if(data.code != 200) return message.error(data.message)
    callBack && callBack(data)
  }).catch(err => {
    dispatch({
      type: actionType.JOURNALS_FILE
    })
  })
};
