import wepy from 'wepy'
import utils from './utils'
import tips from './tips'
import {hex_md5} from './md5'
import {
  USER_SPECIAL_INFO,
  ACCESS_TOKEN
} from './constant'
import env from './env'

/**
 * 执行请求函数 , silent为true时不显示 loading
 * @param params
 * @param urlPart
 * @return {Promise<*>}
 */
const wxRequest = async (params = {silent: false}, urlPart) => {
  // 原始请求包装
  let url = (env.curENV === 'dev') ? (env.devENV.apiMall + urlPart) : (env.prodENV.apiMall + urlPart)
  let originReq = async () => {
    let data = params.query || {}
    let resp = await wepy.request({
      url: url,
      method: params.method || 'GET',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      }
    })
    return resp
  }
  // do real request flow
  if (!params.silent) {
    tips.loading()
  }
  let response = {}
  // 执行真正的流程
  console.log(`request ${url} start`)
  try {
    response = await originReq()
  } catch (e) {
    console.log(`request ${url} fail`)
  } finally {
    console.log(`request ${url} end`)
    if (!params.silent) {
      tips.loaded()
    }
  }
  return response
}

async function doCheckSession() {
  return wepy.checkSession()
}

async function checkSession() {
  try {
    let resp = await doCheckSession()
    console.log('check session success')
  } catch (e) {
    console.log('check session failed')
    await wxRequest({
      query: {},
      method: 'GET'
    }, '/api/v1/user/userInfo/get').catch((e) => console.log('获取用户信息失败', e))
    // await getUserInfo().catch((e) => console.log('获取用户授权失败', e))
  }
  return true
}

module.exports = {
  wxRequest: wxRequest,
  checkSession
}
