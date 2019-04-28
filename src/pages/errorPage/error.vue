<template>
  <div class="error-page" :class="errorPageClass">
    <div class="error-page-main">
      <p>{{ text || errorText[code] }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
    props: {
      code: {
        type: [String, Number],
        default: '404'
      },
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        errorText: {
          '403': '403页面无权限',
          '404': '404页面不存在',
          '500': '500服务器异常',
          'no-auth': '没有本级区域权限'
        }
      }
    },
    computed: {
      errorPageClass () {
        let code = this.code
        let ret = [`error-${code}`]
        if (Number.parseInt(code) === 403 || Number.parseInt(code) === 404 || Number.parseInt(code) === 500) {
          ret.push('error-full-page')
        }
        return ret
      }
    }
  }
</script>
