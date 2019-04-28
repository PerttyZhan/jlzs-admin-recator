import instance from './instance'
import { convertRESTAPI } from '../util'

/** 获取用户信息借口 */
function userinfo (opts) {
  return instance({
    method: 'get',
    url: '/template/ui/userinfo',
    opts: opts
  })
}

/** get接口测试 */
function testIds (opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/template/ui/v1/test/{ids}', opts),
    opts: opts
  })
}

function fetchTree (opts) {
  return instance({
    method: 'post',
    url: '/b/lep/camera/getTree',
    opts: opts
  })
}

export {
  userinfo,
  testIds,
  fetchTree
}
