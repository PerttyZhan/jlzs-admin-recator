/*
 * @Author: xiangxiao3
 * @项目路由
 * @Date: 2017-11-23 16:28:21
 * @Last Modified by: xiangxiao3
 * @Last Modified time: 2018-04-26 10:17:01
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import config from '../config/dolphin.config'

Vue.use(Router)

const createRoute = (routes) => {
  return routes.reduce((processedRoutes, currentRoute) => {
    processedRoutes.push(processRouteObj(currentRoute))
    return processedRoutes
  }, [])
}

/**
 * 路由统一转换方法
 * 面包削做了一次合并
 * @param {*} param0
 */
const processRouteObj = ({ menuCode, breadcrumb, children, component, ...args }) => {
  return Object.assign({
    meta: { menuCode },
    props: {
      breadcrumbObj: {
        content: breadcrumb,
        menuCode: menuCode
      }
    },
    component: () => import(`@/pages/${component}`),
    children: children ? createRoute(children) : []
  }, args)
}

const routes = createRoute((r => {
  return r.keys().reduce((a, b) => {
    if (b.includes('index.')) {
      return a.concat(r(b))
    } else {
      a[1].children = r(b)
      return a
    }
  }, [])
})(require.context('../config/router', true, /\.json$/)))

const router = new Router({
  mode: 'hash',
  routes: routes
})

router.beforeEach(async (to, form, next) => {
  const {userInfo} = store.state
  // 防止死循环跳出
  if (to.path.indexOf('error') > -1) {
    next()
    return
  }
  if (userInfo.code.includes(config.sysName + '_' + to.meta.menuCode)) {
    next()
  } else if (to.meta.menuCode) {
    // 真实菜单，但无权限
    next({path: '/error/403'})
  } else {
    // 不属于系统的url，跳转到404页面
    next({path: '/error/404'})
  }
})

export default router
