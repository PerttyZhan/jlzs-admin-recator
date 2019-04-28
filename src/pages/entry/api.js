/**
 * 通用请求
 */
import instance from '@/api/api/instance'

const URL = {
  login: 'login',
  copyRight: 'websiteone/copyright'
}

function loginApp (opts) {
  return instance({
    method: 'post',
    url: copyRight.login,
    opts: opts
  })
}

function fetchCopyRight (opts) {
  return instance({
    url: URL.copyRight,
    opts: opts
  })
}

 export {
  loginApp,
  fetchCopyRight
 }