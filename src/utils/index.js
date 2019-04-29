
/**
 * promise封装
 * @param {*} promise 
 */
function to (promise) {
  return promise
          .then(res => [null, res.data])
          .catch(error => [error, null])
}

/**
 * 根据子系统渲染皮肤
 * @param {String} skin 皮肤
 * @param {Object} packages 需要换肤的包
 * @param {String} system 子系统
 */
function renderSkin (skin, packages, system) {
  let skinDir = `static/skin/${skin}`
  let loadPromises = []
  packages.forEach((pkg) => {
    let path = `/${skinDir}/${pkg.name}/${pkg.stylePath}`
    if (system !== undefined && system !== '') {
      system = system.replace(/^\//, '')
      path = `/${system}${path}`
    }
    loadPromises.push(loadCSS(path, pkg.name))
  })
  return Promise.all(loadPromises)
}

/**
   * 往页面中插入css
   * @param {String} path CSS文件路径
   * @param {String} name 包名称
   * @author chenguanbin
   */
function loadCSS (path, name) {
  return new Promise((resolve, reject) => {
    let head = document.getElementsByTagName('head')[0]
    let linkId = `skin-${name}`
    let linkTag = document.getElementById(linkId)
    linkTag && linkTag.parentNode.removeChild(linkTag)
    linkTag = document.createElement('link')
    linkTag.href = path
    linkTag.rel = 'stylesheet'
    linkTag.type = 'text/css'
    linkTag.setAttribute('id', linkId)
    linkTag.onload = () => resolve()
    linkTag.onerror = err => reject(err)
    head.appendChild(linkTag)
  })
}

/**
 * 设置cookie
 * @export
 * @param {string} name
 * @param {any} value
 * @param {any} expiredays
 */
function setCookie (name, value, expiredays) {
  var exdate = new Date()
  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays)
  }
  document.cookie = name + '=' + escape(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + ';path=/;'
}
/**
 * 获取cookie
 * @export
 * @param {any} name
 * @returns
 */
function getCookie (name) {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(name + '=')
    var end = 0
    if (start !== -1) {
      start = start + name.length + 1
      end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

/**
 * 简单比较两个Object，返回不同项的key
 */
function compareObject (a = {}, b = {}) {
  let aKey = a ? Object.keys(a) : []
  let bKey = b ? Object.keys(b) : []
  let keys = aKey.length >= bKey.length ? aKey : bKey

  return keys.reduce((result, k) => {
    if (a[k] !== b[k]) {
      result.push(k)
    }
    return result
  }, [])
}

/**
 * @author ZhanHeng
 * @dateTime 2018-03-19
 * @param    {Array[String/Object]}    rules [验证规则]
 * @return   {Function}         [返回验证函数]
 */
function fnValidate (rules = []) {
  let regArr = []
  let key, obj
  for (let i = 0, l = rules.length; i < l; i++) {
    obj = rules[i]
    key = obj.name || obj
    if (key in regs) {
      regArr.push({
        fn: regs[key],
        msg: obj.message || ''
      })
    }
  }
  return (rule, value, callback) => {
    for (let i = 0, l = regArr.length; i < l; i++) {
      let rule = regArr[i]
      if (rule.fn(value)) {
        return callback(new Error(rule.msg))
      }
    }
    callback()
  }
}

const ValidateBuildIn = ['required', 'min', 'max']

function createValidate (rules) {

  return rules.map(rule => {
    let keys = typeof rule === 'string' ? [rule] : Object.keys(rule)
    if (keys.includes) {
    }
  })
  let validate_rule = []
  rules.map(r => {
    if (r ==  'required') {
      validate_rule.push({
        required: true,
        message: message,
        trigger: 'blur'
      })
    } else {
      validate_rule.push({
        validator: fnValidate([
          {
            name: r,
            message: message,
            trigger: 'blur'
          }
        ])
      })
    }
  })

  return validate_rule
} 

export {
  to,
  setCookie,
  getCookie,
  compareObject,
  renderSkin,
  loadCSS,
  createValidate
}