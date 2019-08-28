import userCenter from '../page/userCenter/redux/modal' //用户中心

// 初始化数据
export const previewData = '未登录' // 登录状态
export const userInfos = {} // 用户信息
export const userLoation = {} // 当前登陆的仓库

export const initState = {
  previewData,
  userInfos,
  userLoation,

  userCenter,
}
