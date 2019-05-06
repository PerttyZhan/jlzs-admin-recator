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
      "110": ['产业', '文章'],
      "120": ['产业', '分类']
    },
    'code': [
      `${baseContext}_home`,
      `${baseContext}_entry`,

      `${baseContext}_100`,
      `${baseContext}_110`,
      `${baseContext}_120`,
      
      `${baseContext}_200`
    ]
  }
}
