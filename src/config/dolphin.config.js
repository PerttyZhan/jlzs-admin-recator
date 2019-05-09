/*
 * @Author: xiangxiao3
 * @Date: 2018-01-13 15:31:41
 * @Desc: 系统配置文件
 * @Last Modified by: xiangxiao3
 * @Last Modified time: 2018-04-25 19:05:12
 */

const baseContext = 'jlzs'

module.exports = {
  sysName: baseContext,
  sysPath: process.env.NODE_ENV !== 'development' ? `/${baseContext}` : '',
  userInfo: {
    'languageId': 'zh_CN',
    'skin': 'blue',
    'breadcrumb': {
      "100": ["产业"],
      "110": ['产业', '文章'],
      "120": ['产业', '分类'],

      "200": ["特写"],
      "210": ['特写', '文章'],
      "220": ['特写', '分类'],

      "300": ["活动"],
      "310": ['活动', '文章'],
      "320": ['活动', '分类'],

      "400": ["视频"],
      "410": ['视频', '文章'],
      "420": ['视频', '分类'],

      "500": ["关于我们"],
      "510": ['关于我们', '文章'],
      "520": ['关于我们', '分类'],

      "600": ["全局设置"],
      "610": ['全局设置', '首页轮播'],
      "620": ['全局设置', '活动页轮播'],
      "630": ['全局设置', '精彩推荐'],
      "640": ['全局设置', '网站信息'],
      "650": ['全局设置', '友情链接'],
      "660": ['全局设置', '标签库'],
      "670": ['全局设置', '视频库'],

      "700": ['账号管理', '列表']
    },
    'code': [
      `${baseContext}_home`,
      `${baseContext}_entry`,

      `${baseContext}_100`,
      `${baseContext}_110`,
      `${baseContext}_120`,
      
      `${baseContext}_200`,
      `${baseContext}_210`,
      `${baseContext}_220`,

      `${baseContext}_300`,
      `${baseContext}_310`,
      `${baseContext}_320`,

      `${baseContext}_400`,
      `${baseContext}_410`,
      `${baseContext}_420`,

      `${baseContext}_500`,
      `${baseContext}_510`,
      `${baseContext}_520`,

      `${baseContext}_600`,
      `${baseContext}_610`,
      `${baseContext}_620`,
      `${baseContext}_630`,
      `${baseContext}_640`,
      `${baseContext}_650`,
      `${baseContext}_660`,
      `${baseContext}_670`,

      `${baseContext}_700`
    ]
  }
}
