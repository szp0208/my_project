const menuData = [
  {
    name: '员工管理',
    icon: 'dashboard',
    path: 'gss/staffMag',
    children: [
      {
        name: '员工中心',
        icon: 'dashboard',
        path: 'staffCenter',
      }
    ]
  },
]

function formatter(data, parentPath = '') {
  const list = []
  data.sort((a, b) => a.rank - b.rank).forEach((item, index) => {
    if (item.childs.length) {
      let obj = {
        name: item.menuName,
        path: `${parentPath}${item.menuUrl}`,
        children: formatter(item.childs, `${parentPath}${item.menuUrl}/`)
      }
      // 为了只给第一级菜单增加ICON
      if (item.menuLevel === 2) {
        obj.icon = item.menuPath
      }
      list.push(obj)
    } else {
      list.push({
        name: item.menuName,
        path: `${parentPath}${item.menuUrl}`,
        icon: item.menuLevel === 2 ? item.menuPath : null
      })
    }
  })
  return list
}
export function formatDownload(data) {
  let list = {}
  data.map((o, i) => {
    list[o.key] = {
      desc: o.desc,
      downloadUrl: o.downloadUrl
    }
  })
  return list
}
export function formatHostList(data) {
  let list = []
  data.map((o, i) => {
    list.push({
      value: o.warehouseCode,
      children: o.warehouseName
    })
  })
  return list
}

export function formatMenuList(data, parentPath='') {
  const list = []
  data.sort((a, b) => a.rank - b.rank).forEach((item, index) => {
    if (item.children) {
      let obj = {
        name: item.name,
        path: `${parentPath}${item.path}`,
        children: formatMenuList(item.children, `${parentPath}${item.path}/`)
      }
      // 为了只给第一级菜单增加ICON
      if (item.level === 1) {
        obj.icon = item.code
      }
      list.push(obj)
    } else {
      list.push({
        name: item.name,
        path: `${parentPath}${item.path}`
      })
    }
  })
  return list

}

export const formatterData = formatter
export const getMenuData = () => formatMenuList(menuData)
