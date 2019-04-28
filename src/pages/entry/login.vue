<template>
  <div :class="$style.entry">
    <div :class="$style['entry__wrap']">
      <div :class="$style['entry__header']">
        <img :class="$style.logo" src="@/assets/logo.png" />
      </div>
      <div :class="$style['entry__content']">
        <el-form
          ref="form"
          :model="user"
          :rules="rules"
          label-width="80">
          <el-form-item prop="username" label="账号">
            <el-input v-model="user.username" size="large" placeholder="请输入账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="user.password" size="large" placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              :disabled="isInfoFull"
              @click="fetchLogin">
                登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div :class="$style.copyright">
      {{copyright.content}}
    </div>
  </div>
</template>
<script>
  import { loginApp, fetchCopyRight } from './api'
  import { to } from '@/utils'
  export default {
    name: 'page-login',
    data() {
      return {
        loading: false,
        copyright: {},
        user: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      isInfoFull () {
        return this.user.username && this.user.password
      }
    },
    methods: {
      async initCopyRight() {
        let [error, data] = await to(fetchCopyRight({params: {}}))
        this.copyright = data
      },
      fetchLogin () {
        let user = this.user;
        this.$refs.form(async valid => {
          if (valid) {
            this.loading = true
            let [error, data] = to(loginApp({data: user}))
            this.$router.push('/admin')
          }
        })
      }
    },
    mounted () {
      // this.initCopyRight()
    },
    destroyed () {
    }
  }

</script>

<style module lang="less">
  @import './login.less';
</style>
