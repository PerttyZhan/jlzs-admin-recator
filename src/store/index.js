import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './mutation-types'
Vue.use(Vuex)

const getters = {
  // 获取操作某个模块的操作权限
  getUserHasAuth: (state) => (path, auth) => {
    let menu = state.menu
    let menuActionExt = []
    let hasAuth = false

    function initMenuAction (menus) {
      menus.forEach(m => {
        if (m.path === path) {
          menuActionExt.push(...m.menuActionExt)
        } else {
          m.children && initMenuAction(m.children)
        }
      })
    }
    initMenuAction(menu)
    menuActionExt.map(obj => {
      if (obj.action === auth) {
        hasAuth = true
      }
    })
    return hasAuth
  },
  // 获取某个模块的子模块
  getChildrenMenuByPath: (state) => (path) => {
    let menu = state.menu
    let targetMenuChildren = []

    function initMenu (menus) {
      menus.forEach(m => {
        if (m.path === path) {
          targetMenuChildren = m.children
        } else {
          m.children && initMenu(m.children)
        }
      })
    }
    initMenu(menu)
    return targetMenuChildren
  }
}

const state = {
  userInfo: null,
  menu: [],
  curScheme: null,
  curUser: {}
}

const mutations = {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_MENU] (state, menu) {
    state.menu = menu
  },
  [types.SET_CUR_MENU] (state, curScheme) {
    state.curScheme = curScheme
  },
  [types.SET_CUR_USER] (state, curUser) {
    state.curUser = curUser
  }
}
export default new Vuex.Store({
  getters,
  state,
  mutations,
  modules: {
  }
})
