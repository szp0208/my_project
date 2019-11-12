import staffCenter from '../page/staffCenter/redux/modal' //用户中心
import interfaces from '../page/interfaces/redux/modal' //接口监控
import journals from '../page/journals/redux/modal' //异常日志

// 初始化数据
export const previewData = '未登录' // 登录状态
export const userInfos = {} // 用户信息
export const userLoation = {} // 当前登陆的仓库

export const initState = {
  previewData,
  userInfos,
  userLoation,

  staffCenter,
  interfaces,
  journals,

}
