import wepy from 'wepy'
/**
 * 获取当前时间：年月日时分秒
 * @returns {string}
 */
function getCurrentTime() {
  var keep = ''
  var date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var rand = Math.round(Math.random() * 899 + 100)
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s
  return keep// 20160614134947
}

/**
 * 时间戳转换为字符串//https://segmentfault.com/a/1190000015992232
 * @param {*} time 
 */
function timeDesc(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ');
}

/**
 * 获取当年时间戳
 * @returns {number}
 */
function getTimeStamp() {
  return +new Date().getTime()
}

/**
 * 返回对象长度
 * @param input
 * @returns {number}
 */
function objLength(input) {
  var type = toString(input)
  var length = 0
  if (type != '[object Object]') {
    // throw '输入必须为对象{}！'
  } else {
    for (var key in input) {
      if (key != 'number') {
        length++
      }
    }
  }
  return length
}

/**
 * 验证是否是手机号码
 * @param number
 * @returns {boolean}
 */
function vailPhone(number) {
  let flag = false
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/
  if (number.length != 11) {
    flag = flag
  } else if (!myreg.test(number)) {
    flag = flag
  } else {
    flag = true
  }
  return flag
}

/**
 * 验证是否西班牙手机(6开头 9位数)
 * @param number
 * @returns {boolean}
 */
function ifSpanish(number) {
  let flag = false
  let myreg = /^([6|7|9]{1}(\d+){8})$/
  if (number.length != 9) {
    flag = flag
  } else if (!myreg.test(number)) {
    flag = flag
  } else {
    flag = true
  }
  return flag
}

/**
 * 浮点型除法
 * @param a
 * @param b
 */
function div(a, b) {
  var c, d, e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) { }
  try {
    f = b.toString().split('.')[1].length
  } catch (g) { }
  return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), mul(c / d, Math.pow(10, f - e))
}

/**
 * 浮点型加法函数
 * @param arg1
 * @param arg2
 * @returns {string}
 */
function accAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m + arg2 * m) / m).toFixed(2)
}

/**
 * 浮点型乘法
 * @param a
 * @param b
 * @returns {number}
 */
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) { }
  try {
    c += e.split('.')[1].length
  } catch (f) { }
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

/**
 * 遍历对象属性和值
 * @param obj
 * @returns {string}
 */
function displayProp(obj) {
  var names = ''
  for (var name in obj) {
    names += name + obj[name]
  }
  return names
}

/**
 * 去除字符串所有空格
 * @param text
 * @returns {void|string|*}
 */
function sTrim(text) {
  return text.replace(/\s/ig, '')
}

/**
 * 去除所有:
 * @param txt
 * @returns {void|string|*}
 */
function replaceMaohao(txt) {
  return txt.replace(/\:/ig, '')
}

function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false
  if (obj.length === 0) return true

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }
  return true
}

/**
 * 优雅解决用户授权时拒绝的问题,在每个需要用户授权的页面onShow函数中调用此函数
 * @return {Promise<boolean>}
 */
async function checkAuth(scope) {
  // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
  return new Promise(async (resolve, reject) => {
    let res = await wepy.getSetting()
    console.log(res.authSetting)
    let authSetting = res.authSetting
    if (isEmpty(authSetting)) {
      // 第一次授权
      let settingResp = await wepy.openSetting({}).catch((res) => console.log('获取setting resp 出错'))
      resolve(!!settingResp.authSetting[scope])
    } else {
      console.log('不是第一次授权', authSetting)
      // 没有授权的提醒
      if (authSetting[scope] === false) {
        let resp1 = await wepy.showModal({
          title: '用户未授权',
          content: '如需正常使用小程序，请授权',
          showCancel: false
        })
        if (resp1.confirm) {
          console.log('用户点击确定')
          let settingResp = await wepy.openSetting({}).catch((res) => console.log('获取setting resp 出错'))
          resolve(!!settingResp.authSetting[scope])
        } else {
          resolve(false)
        }
      } else {
        resolve(true)
      }
    }
  })
}

module.exports = {
  getCurrentTime: getCurrentTime,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceMaohao: replaceMaohao,
  vailPhone: vailPhone,
  ifSpanish: ifSpanish,
  div: div,
  mul: mul,
  accAdd: accAdd,
  getTimeStamp: getTimeStamp,
  checkAuth,
  timeDesc
}
