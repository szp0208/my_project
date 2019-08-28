// import {history} from 'RouterAdmin'
import {Promise} from 'es6-promise'
import host from './Host'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import {message} from 'antd'
import {
  LOGIN_TOKEN,
  COMMIT_TOKEN,
  setVariant,
  getVariant,
  hasVariant,
  setVariantSession,
  removeVariantSession
} from 'Variant'
const cacheData = {}
const timeout = 60000
// GBK字符集实际长度计算
export const getStrLength = str => {
  let realLength = 0
  let len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      // 如果是中文则长度加2
      realLength += 2
    }
  }
  return realLength
}
export function removeUndefined(obj) {
  let o = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] !== undefined) {
        o[key] = obj[key]
      }
    }
  }
  return o
}
function hasCache(data, url, api) {
  return (
    cacheData[api.url] &&
    cacheData[api.url][api.config.method] &&
    _.isEqual(data, cacheData[api.url].data, true) &&
    _.isEqual(url, cacheData[api.url].url) &&
    _.isEqual(api, cacheData[api.url].api)
  )
}
export function generateUrl(api, searchParams, urlParams, replaceParams) {
  console.log(api)
  return;
  let url = `${host[api.config.host.toLocaleUpperCase()]}${api.url}`
  if (replaceParams) {
    for (const key in replaceParams) {
      if (replaceParams.hasOwnProperty(key)) {
        const reg = new RegExp(`\\$${key}`, 'g')
        url = url.replace(reg, replaceParams[key])
      }
    }
  }
  if (urlParams) {
    url += `/${urlParams.join('/')}`
  }
  if (searchParams) {
    url += (() => {
      const str = []
      for (const key in searchParams) {
        if (
          searchParams.hasOwnProperty(key) &&
          searchParams[key] !== '' &&
          searchParams[key] !== undefined
        ) {
          str.push(`${key}=${searchParams[key]}`)
        }
      }
      return `?${str.join('&')}`
    })()
  }
  // 给URL加个时间戳
  // if (url.indexOf('?') != -1) {
  //   url += `&t=${new Date().getTime()}`
  // } else {
  //   url += `?t=${new Date().getTime()}`
  // }
  return url
}
function generateBody(api, data) {
  const headers = new Headers({
    Accept: 'application/json, */*'
  })
  if (api.config.host == 'CSXWMS') {
    const b2bWmsLocation = JSON.parse(localStorage.getItem('b2bWmsLocation')) || {}
    headers.append('x-location', b2bWmsLocation.value || '')
    headers.append('x-locationName', encodeURI(b2bWmsLocation.children || ''))
  }
  if (api.config.method !== 'get') {
    // 带上token
    headers.append('Content-Type', 'application/json')
  }
  if (hasVariant(LOGIN_TOKEN)) {
    headers.append(LOGIN_TOKEN, getVariant(LOGIN_TOKEN))
  }
  // if (hasVariant(COMMIT_TOKEN)) {
  //   // 防重，比如下单重复提交
  //   headers.append(COMMIT_TOKEN, getVariant(COMMIT_TOKEN))
  // }
  const result = {
    method: api.config.method,
    headers
  }
  if (data !== undefined) {
    result.body = JSON.stringify(data)
  }
  return result
}
const otherPlaceCode = '600230' // 异地登陆错误code
function getApiData(options) {
  /*
   * author: 石志鹏
   * createdTime: 2019/08/22
   * 修改问题：添加后端返回的code码前端需要获取到，并且执行code码的方法，例如：returnCode: [500]等
   */
  const {data, searchParams, urlParams, replaceParams, api, returnCode} = options
  let url = generateUrl(api, searchParams, urlParams, replaceParams),
    loginToken = null,
    commitToken = null,
    noWarn = api.config.noWarn || false,
    fileName = api.config.fileName || '导出信息'
  if (api.config.cache) {
    if (hasCache(data, url, api)) {
      return Promise.resolve(cacheData[api.url][api.config.method])
    }
    cacheData[api.url] = {}
  }

  return new Promise((resolve, reject) => {
    let timeOutFlag = setTimeout(() => {
      timeOutFlag = null
      reject({message: '超时'})
    }, timeout)
    fetch(url, generateBody(api, data))
      .then(
        res => {
          if (timeOutFlag === null) {
            return Promise.reject({})
          }
          clearTimeout(timeOutFlag)
          // loginToken = res.headers.get(LOGIN_TOKEN)
          loginToken = (url.indexOf('ucenter/login') > -1) ? res.headers.get(LOGIN_TOKEN) : getVariant(LOGIN_TOKEN)
          commitToken = res.headers.get(COMMIT_TOKEN)
          let contentType = res.headers.get('Content-Type')

          // 判断是否是下载文件传文件名
          /*
           * author: 石志鹏
           * tips：更改getdata添加下载文件pdf类型
           * createdTime: 2019/08/14
           *
           */
          let contentDisposition = res.headers.get('Content-Disposition')
          if (contentDisposition) {
            if(contentType.includes('excel')) {
              fileName = contentDisposition.match(/filename=.*(?=.xlsx)/g)[0] && contentDisposition.match(/filename=.*(?=.xlsx)/g)[0].replace('filename=', '')
              fileName = decodeURI(fileName)
            }
            //添加判断是否是pdf文件下载
            if(contentType.includes('pdf')) {
              fileName = contentDisposition.match(/filename=.*(?=.pdf)/g)[0] && contentDisposition.match(/filename=.*(?=.pdf)/g)[0].replace('filename=', '')
              fileName = decodeURI(fileName)
            }
          }
          return contentType.includes('excel') || contentType.includes('pdf')
            ? res.blob()
            : contentType.includes('json')
              ? res.json()
              : {}
        },
        err => {
          if (timeOutFlag === null) {
            return Promise.reject({})
          }
          clearTimeout(timeOutFlag)
          reject(err)
          return Promise.reject(err)
        }
      )
      .then(
        data => {
          if (api.config.cache) {
            cacheData[api.url][api.config.method] = data
          }
          if (!timeOutFlag) {
            resolve()
            return
          }
          // 在接口设置notoken字段  允许后台接口没有token返回
          if (data.code == 600207 || data.code == 600201 || data.code == otherPlaceCode) {
            // 登录过期
            sessionStorage.clear()
            removeVariantSession(LOGIN_TOKEN)
            removeVariantSession(COMMIT_TOKEN)
            localStorage.removeItem('curr_shop')
            localStorage.removeItem(LOGIN_TOKEN)
            localStorage.removeItem(COMMIT_TOKEN)
            reLogin({
              hasTips: true,
              needBack: false,
              tips: false
            })
          }
          if (api.config.noToken !== true && loginToken) {
            setVariant(LOGIN_TOKEN, loginToken)
            setVariantSession(LOGIN_TOKEN, loginToken)
            if (commitToken) {
              // 防重，比如下单重复提交。有数据则更新
              setVariant(COMMIT_TOKEN, commitToken)
              setVariantSession(COMMIT_TOKEN, commitToken)
            }
          }
          if (!data) {
            message.destroy()
            !noWarn && message.error('接口异常')
          }
          if (data.type && data.type.includes('excel') || data.type&&data.type.includes('pdf')) {
            let a = document.createElement('a')
            document.body.appendChild(a)
            let url = window.URL.createObjectURL(data)
            a.href = url

            //添加判断下载的文件类型支持excel和pdf
            if(data.type.includes('excel')) {
              a.download = `${fileName}.xlsx`
            } else if(data.type.includes('pdf')) {
              a.download = `${fileName}.pdf`
            }
            a.click()
            document.body.removeChild(a)
            // 异步导出，火狐专用
            setTimeout(() => window.URL.revokeObjectURL(url), 0)
            resolve()
            return
          }

          /*
           * author: 石志鹏
           * createdTime: 2019/08/22
           * tips：添加后端返回的code码前端需要获取到，并且执行code码的方法，例如：returnCode: [500]等
           * 当isReturnCode为true时则表示需要捕获到后台返回的code并加以处理
           */
          let isReturnCode = false;
          if(returnCode) {
            for (let c = 0; c < returnCode.length; c++) {
              if(data.code == returnCode[c]) {
                isReturnCode = true;
              }
            }
          }
          if (data.code == 200 || data.code == 0 || data.code == 200000 || data.code == 20001005 || isReturnCode) {
            resolve(data)
            return data
          } else {
            message.destroy()
            !noWarn && message.error(data.message || data.desc || '未知的错误')
            reject(data)
            return data
          }
        },
        err => {
          console.error(err)
          return err
        }
      )
  })
}
export function getData(options) {
  const {type = 'api'} = options
  switch (type) {
    case 'api': {
      return getApiData(options)
    }
  }
}
/* 重新登陆 */
let warning = false
function reLogin(params) {
  let hasTips = params.hasTips || true,
    // needBack = params.needBack || true,
    tips = params.tips || false
  if (!warning) {
    warning = true
    // let directUrl = `/${needBack ? `?backUrl=${window.location.pathname}` : ''}`
    if (hasTips) {
      message.error(tips ? tips : '当前未登录，将跳转到登录页面。')
    }
    setTimeout(() => {
      window.location.href = '/'
      warning = false
    }, 2000)
  }
}
/* 判断是否为登陆页 */
export function isLoginPage() {
  return window.location.pathname == '/'
}
/*
 获取url参数
 */
export function getQueryString(name) {
  if (name == undefined || name == null || name == '') {
    // showMsg('获取参数失败');
    return false
  }
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}
/* 取两位小数点 整数 - zero */
export function toFixed(number, padEnd = 2) {
  try {
    number = parseFloat(number)
    let pow = 10 ** (padEnd + 1) // Math.pow(10, padEnd)
    /*
    * fround()
      返回一个数的单精度浮点数形式
      主要用于无法用 64 个二进制位表示的小数
    * trunc()
      用于取整(非四舍五入)
      对于非数值，内部调用 Number 强转为数值
      对于空值或其他数据，返回NaN
    * round()
      用于取整(非四舍五入)
      对于非数值，内部调用 Number 强转为数值
      对于空值或其他数据，返回NaN
    */
    number = isNaN(number) ? 0 : Math.round(number * pow) / pow
  } catch (err) {
    console.error(err)
    return '0.00'
  }
  return number.toFixed(padEnd)
}
/* toFixed -zero */
// 将传入数据转换为字符串,并清除字符串中非数字与.的字符
// 按数字格式补全字符串
// 支持负数
export function getFloatStr(num = 0, padEnd = 2) {
  // Infinity 代表无穷大
  if (num === -Infinity || num === Infinity || isNaN(num)) num = 0
  if (!_.isNumber(parseFloat(num)) || !_.isNumber(parseFloat(padEnd))) {
    return console.error('arguments to type not is numner! ')
  }
  num = parseFloat(num)
  let isMinus = num < 0
  num = _.round(Math.abs(num), padEnd)
  try {
    num += ''
    num = num.replace(/[^0-9|\.]/g, '') //清除字符串中的非数字非.字符
    if (/^0+/.test(num)) {
      //清除字符串开头的0
      num = num.replace(/^0+/, '')
    }
    if (!/\./.test(num)) {
      //为整数字符串在末尾添加.00
      num = num.padEnd(num.length + 1, '.')
      num = num.padEnd(num.length + padEnd, '0') // num += '.00'
    }
    if (/^\./.test(num)) {
      //字符以.开头时,在开头添加0
      num = num.padStart(num.length + 1, '0') // num = '0' + num
    }
    num = num.padEnd(num.length + padEnd, '0') // num += '00'        //在字符串末尾补零
    let regExp = new RegExp(`\\d+\\.\\d{${padEnd}}`)
    num = num.match(regExp)[0]
  } catch (err) {
    console.error(err)
  }
  return isMinus ? `-${num}` : num
}
/* 幂 - zero */
// 数组扩展方法
Array.prototype.power = function(fun, ...callbact) {
  for (let i = 0, l = this.length; i < l; i++) {
    let j = l - i - 1
    if (i > j) {
      break
    }
    if (i == j) {
      fun(this[i], i)
      break
    }
    fun(this[i], i)
    fun(this[j], j)
  }
  return this
}
String.prototype.Trim = function() {
  return this.replace(/\s+/g, '')
}
export const fullScreen = () => {
  let el = document.documentElement,
    rfs =
      el.requestFullscreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen
  rfs.call(el)
}
export const isInFullScreen = () => {
  let isInFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null)
  return !!isInFullScreen
}
export const toggleFullScreen = () => {
  let docElm = document.documentElement
  if (!isInFullScreen()) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
}
/*
 * 运算部件
 * */
export const operationalUnit = {
  // 保留几位小数点
  toFixed: (num = 0, e) => {
    try {
      let divisor = operationalUnit.changeInit(num, e)
      num = operationalUnit.divide([divisor, Math.pow(10, e)])
    } catch (e) {
      console.error(e)
      num = 0
    }
    return num
  },
  // 获取小数点位数
  getPosition: (num = 0) => {
    // 待优化
    let e = 0
    try {
      num = parseFloat(num).toString()
      // 判断是否小于0
      // let isMinus = false
      if (num.indexOf('-') !== -1) {
        // isMinus = true
        num = Math.abs(num).toString()
      }
      if (num.includes('.') && num.indexOf('.') !== -1) {
        e = num.length - num.indexOf('.') - 1
      }
    } catch (e) {
      console.error(e)
    }
    return e
  },
  // 转变成整数
  changeInit: (num = 0, e) => {
    try {
      if (num == '0') return 0
      num = parseFloat(num).toString()
      // 判断是否小于0
      let isMinus = false
      if (num.indexOf('-') !== -1) {
        isMinus = true
        num = Math.abs(num).toString()
      }
      num = parseInt(Math.round(num * Math.pow(10, e)), 10) // 待优化 // '9.53' * 100
      if (isMinus) num = -num
    } catch (e) {
      console.error(e)
      num = 0
    }
    return num
  },
  // 加
  add: arr => {
    if (!arr.length) return 0
    let e = 0
    arr.map(item => {
      let _e = operationalUnit.getPosition(item)
      e = _e > e ? _e : e
    })
    let total = 0
    arr.map((item, index) => {
      let num = operationalUnit.changeInit(item, e)
      if (index === 0) {
        total = num
      } else {
        total += num
      }
    })
    let m = Math.pow(10, e)
    return total / m
  },
  // 减
  cut: arr => {
    if (!arr.length) return 0
    let e = 0
    arr.map(item => {
      let _e = operationalUnit.getPosition(item)
      e = _e > e ? _e : e
    })
    let total = 0
    arr.map((item, index) => {
      let num = operationalUnit.changeInit(item, e)
      if (index === 0) {
        total = num
      } else {
        total -= num
      }
    })
    let m = Math.pow(10, e)
    return total / m
  },
  // 乘
  ride: arr => {
    if (!arr.length) return 0
    let e = 0
    arr.map(item => {
      let _e = operationalUnit.getPosition(item)
      e = _e > e ? _e : e
    })
    let total = 0
    arr.map((item, index) => {
      let num = operationalUnit.changeInit(item, e)
      if (index === 0) {
        total = num
      } else {
        total *= num
      }
    })
    let m = Math.pow(10, e * arr.length)
    return total / m
  },
  // 除
  divide: arr => {
    if (!arr.length) return 0
    let e = 0
    arr.map(item => {
      let _e = operationalUnit.getPosition(item)
      e = _e > e ? _e : e
    })
    let total = 0
    arr.map((item, index) => {
      let num = operationalUnit.changeInit(item, e)
      if (index === 0) {
        total = num
      } else {
        total /= num
      }
    })
    return total
  }
}
// 获取用户按钮权限
export const getPermissionsButtonsBans = () =>
  JSON.parse(localStorage.getItem('permissionsButtonsBans'))
// import number from 'number-precision' // 待优化

// 转换层级数据

export function changeFieldsName(data, options, codeAndId) {
  if (data.length === 0) {
    // return arr
    return []
  }
  const restFields = []
  data.forEach((firstItem, firstIdx) => {
    restFields.push({
      value: firstItem[options[0]],
      label: firstItem[options[1]],
      children: []
    })
    data[firstIdx][options[2]].forEach((secondItem, secondIdx) => {
      const thredChildren = data[firstIdx][options[2]][secondIdx][options[2]]
      restFields[firstIdx].children.push({
        value: (thredChildren.length == 0 && codeAndId) ? `${secondItem[options[0]]}-${secondItem[options[3]]}` : secondItem[options[0]],
        label: secondItem[options[1]],
        children: []
      })
      if (thredChildren.length > 0) {
        thredChildren.forEach((thirdItem, thirdIdx) => {
          restFields[firstIdx].children[secondIdx].children.push({
            value: codeAndId ? `${thirdItem[options[0]]}-${thirdItem[options[3]]}` : thirdItem[options[0]],
            label: thirdItem[options[1]]
            // children: []
          })
        })
      }
    })
  })
  return restFields
}

export const provinceTextMap = {
  1: '北京市',
  2: '上海市',
  3: '天津市',
  4: '内蒙古自治区',
  5: '山西省',
  6: '河北省',
  7: '辽宁省',
  8: '吉林省',
  9: '黑龙江省',
  10: '江苏省',
  11: '安徽省',
  12: '山东省',
  13: '浙江省',
  14: '江西省',
  15: '福建省',
  16: '福建BBC',
  17: '湖南省',
  18: '湖北省',
  19: '河南省',
  20: '广东省',
  21: '海南省',
  22: '广西壮族自治区',
  23: '贵州省',
  24: '四川省',
  25: '云南省',
  26: '陕西省',
  27: '甘肃省',
  28: '宁夏回族自治区',
  29: '青海省',
  30: '新疆维吾尔自治区',
  31: '西藏自治区',
  32: '重庆市'
}

//去除空字段(obj:需要去除的对象，fields：需要直接去掉的字段, noDelNull: 若为true则不删除obj中的空值）
export function dealObjectValue(obj, fields, noDelNull){
  let newObj = {};
  for (let i in obj) {
    let jud = true;
    if(fields) {
      for (let j = 0; j < fields.length; j++) {
        if(i == fields[j]) jud = false;
      }
    }
    if(noDelNull) { //不删除obj中的空值
      if(jud) newObj[i] = obj[i];
    } else {  //删除obj中的空值handlePoint
      if(obj[i] && jud) newObj[i] = obj[i];
    }
  }
  return newObj;
};

//返回需要的状态
export function returnNeedState(str, arr) {
  let state = '';
  arr.map((item, index)=>{
    if(item[0] == str) state = item[1];
  })
  return state;
}

//去除字符串中所有的空格
export function removeSpaces(str) {
  let str_1 = str.replace(/\s*/g,"");
  return str_1
}

//保留小数点后两位-处理js数据精度问题
export function handlePoint(num) {
  let n_ = num * 1;
  if(n_) {
    return Math.round(n_ * 100) / 100;
  } else {
    return 0;
  }
}

//去除特殊字符或者一些字符串的操作
export function stripscript(s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;'\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？%]")
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

//数字转汉语大写
export function digitUppercase(n) {
  let fraction = ['角', '分'];
  let digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  let head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

