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
      "110": ['资讯', '文章'],
      "120": ['资讯', '分类'],
      "130": ['资讯', '标签']
    },
    'code': [
      `${baseContext}_home`,
      `${baseContext}_entry`,

      `${baseContext}_100`,
      `${baseContext}_110`,
      `${baseContext}_120`,
      `${baseContext}_130`,
      
      `${baseContext}_200`
    ]
  }
}
