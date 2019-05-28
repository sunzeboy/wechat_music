import { wxRequest } from '../utils/wxRequest'
import env from '../utils/env'

/**
 * 通过登录凭证code换取会话信息
 * @param params
 * @returns {*}
 */
const bind = async (params) => wxRequest(params, 'm=wechat&c=interfaces&a=checkVerifyCode&p=json')

/**
 * 微信小程序登录
 * @param params
 * @returns {*}
 */
const getVerCode = async (params) => wxRequest(params, 'm=wechat&c=interfaces&a=getVerCode&p=json')



module.exports = {
  bind,
  getVerCode
}
