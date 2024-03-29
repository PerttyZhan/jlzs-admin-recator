import { createAPI } from '../util'
import config from '../config'
import axios from 'axios'
import { Message } from 'element-ui'
import i18n from '@/i18n'
import Qs from 'qs'
import { REQUEST_SUCCESS } from '../../constant'

const baseUrl = {
  mock: config.mockUrl,
  dev: config.apiUrl,
  pre: '',
  prod: config.apiUrl
}[config.env || 'mock']

const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json; */*', 'Content-Type': 'application/x-www-form-urlencoded'},
  // headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json'},
  baseURL: baseUrl,
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  validateStatus (status) {
    if (status === 401) {
			Message.error('登录状态消失')
		}
		if (status === 422) {
			Message.error('请填写正确信息')
		}
		if (status === 500) {
			Message.error('500 错误')
		}
		return status >= 200 && status < 300;
  }
})

// 相应拦截器
http.interceptors.response.use(function (response) {
  // 请求多语言的json文件
  if (response.config.url.indexOf('json') > -1) {
    return response
  }
   // 根据响应数据判断是否登录过期
  if (response.data.errorCode === 'pleaseRefreshByHeader') {
    let refreshUrl = response.headers['refresh-url'].split('?')[0]
    refreshUrl = refreshUrl + '?service=' + location.protocol + '//' + location.host + location.pathname + encodeURIComponent(location.search)
    location.href = refreshUrl
  }

  // 对错误进行统一处理
  if (response.data.code != REQUEST_SUCCESS) {
    if (!response.config.noMsg && response.data.msg) {
      Message.error(i18n.t(response.data.msg, response.data.data))
    }
    return Promise.reject(response)
  } else if (response.data.code === REQUEST_SUCCESS && response.config.successNotify) { // 弹出成功提示
    Message.success(i18n.t(response.data.msg) || 'success !')
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.msg,
    data: response.data.data
  })
}, function (error) {
  if (error.message.indexOf('timeout') > -1) {
    // 多语言需要自己在项目中配置
    Message.error(i18n.t('common.timeout'))
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default createAPI(http)

export {
  http
}
