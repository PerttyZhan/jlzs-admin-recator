import axios from 'axios'
import store from '@/store'
import i18n from '@/i18n'
import ErrorPage from '@/pages/errorPage/error'
import elementLocale from 'element-ui/lib/locale'
import dolphinConfig from '@/config/dolphin.config'
// import { userinfo } from '@/api/api'
// import { fetchUserMenu, fetchUserInfo } from '@/api/common'
import { renderSkin } from '@/utils'

import pageLayout from '@/components/layout'
import pageTable from '@/components/pageTable'
import pageForm from '@/components/pageForm'
import pageMap from '@/components/pageMap'

// TODO: 下个版本考虑开发环境下也加载上下文，与生产环境保持一致
// 开发态与生产环境下上下文不一样
const baseURL = process.env.NODE_ENV === 'production' ? '' : '/'
const context = process.env.BaseContext
const path = process.env.NODE_ENV === 'production' ? './static' : `./static`
const REFRESH_BY_HEADER = 'pleaseRefreshByHeader'

// 设置皮肤
async function setSkin (skin) {
  // 后端返回的有可能是空字符串
  skin = skin || 'redblack'
  let skinData = await axios.get(`${path}/skin/${skin}/skin.json`)
  return renderSkin(skin, skinData.data.packages, context)
}

// 获取多语言文件
function getLanguage (locale) {
  return axios({
    methods: 'get',
    url: `${path}/i18n/${locale}/index.json`,
    baseURL: baseURL
  })
}

// 设置多语言
function setLanguage (lang, locale) {
  // 解析语言包
  i18n.setLocaleMessage(locale, JSON.parse(JSON.stringify(lang.data)))
  // 设置hui组件的多语言
  elementLocale.i18n((key, value) => i18n.t(key, value))
  // 设置当前语言
  i18n.locale = locale
}

async function errorLoadPage (Vue) {
  // 获取用户信息失败后，设置默认皮肤并初始化一个没有配置的vue实例
  await setSkin()
  mountVueIntance(
    Vue,
    {
      template: '<error-page code="500" text="500 Please try again later for server exception"/>',
      components: { ErrorPage }
    }
  )
}

function setGlobalComponent (Vue) {
  Vue.component(pageLayout.name, pageLayout)
  Vue.component(pageTable.name, pageTable)
  Vue.component(pageForm.name, pageForm)
  Vue.component(pageMap.name, pageMap)
}

async function initApp (Vue, config) {

  setGlobalComponent(Vue)
  // let {data:menu} = await fetchUserMenu()
  // store.commit('SET_MENU', menu)

  // let {data:userInfo} = await fetchUserInfo()
  // store.commit('SET_CUR_USER', userInfo)

  // if (process.env.NODE_ENV === 'production') {
  //   try {
  //     // 获取用户信息之后，根据数据设置皮肤和多语言数据
  //     // 并将用户信息存储到store中
  //     let data = await userinfo({noMsg: true})
  //     await setSkin(data.data.skin)
  //     store.commit('SET_USER_INFO', data.data)
  //     try {
  //       // 设置多语言时，捕获获取多语言文件失败，
  //       // 失败后将语言设置为英语
  //       let lang = await getLanguage(data.data.languageId)
  //       setLanguage(lang, data.data.languageId)
  //     } catch (err) {
  //       let lang = await getLanguage('en_US')
  //       setLanguage(lang, 'en_US')
  //     } finally {
  //       // 初始化vue实例
  //       mountVueIntance(Vue, config)
  //     }
  //   } catch (err) {
  //     if (err.data && err.data.errorCode === REFRESH_BY_HEADER) return
  //     errorLoadPage(Vue)
  //   }
  // } else {
    let {userInfo: {languageId, skin}} = dolphinConfig
    store.commit('SET_USER_INFO', dolphinConfig.userInfo)
    // let lang = await getLanguage(languageId)
    // setLanguage(lang, languageId)
    // await setSkin(skin)
    mountVueIntance(Vue, config)
  // }
}

function mountVueIntance (Vue, config) {
  new Vue({
    ...config,
    i18n
  }).$mount('#app')
}

export default initApp
