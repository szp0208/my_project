export default {
  // 获取员工列表数据
  API_GET_STAFFCENTER_LIST: {
    url: 'staffCenter/list',
    config: {
      method: 'get',
      host: 'SZP_HOST'
    }
  },
  // 获取员工详情
  API_GET_STAFFCENTER_DETAIL: {
    url: 'staffCenter/getStaffInfoById',
    config: {
      method: 'get',
      host: 'SZP_HOST'
    }
  },
  // 新增员工
  API_GET_STAFFCENTER_ADD: {
    url: 'staffCenter/add',
    config: {
      method: 'post',
      host: 'SZP_HOST'
    }
  },
  // 编辑员工信息
  API_GET_STAFFCENTER_UPDATE: {
    url: 'staffCenter/update',
    config: {
      method: 'post',
      host: 'SZP_HOST'
    }
  },
  // 删除员工信息
  API_GET_STAFFCENTER_DELETE: {
    url: 'staffCenter/delete',
    config: {
      method: 'post',
      host: 'SZP_HOST'
    }
  },
}
