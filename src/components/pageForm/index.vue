<template>
  <div class="page-form">
    <pageScroll class="page-form__main">
      <el-form
        ref="form"
        :inline-message="false"
        :model="forms"
        :rules="rules"
        class="page-form__wrap"
        label-width="100px"
        label-position="left"
        size="medium">
          <slot></slot>
      </el-form>
    </pageScroll>
    <div class="page-form__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import pageScroll from '../page'

export default {
  name: 'page-form',
  components: {
    pageScroll
  },
  props: {
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    forms: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      formData: {},
      formRule: []
    }
  },
  methods: {
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve('ok')
          } else {
            reject(new Error('no sublimt'))
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/style/custom';

  .page-form {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    padding-top: 40px;
    .el-form-item {
    }
    .el-form-item__content {
      // min-width: 400px;
    }
    .el-select  {
      width: 100%;
    }
    .page-form__main {
      text-align: center;
      height: 100%;
    }
    .page-form__wrap {
      width: 800px;
      margin: 0 auto;
    }
    .page-form__footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-top: 16px;
      text-align: right;
      border-top: 1px solid @baseBorderColor;
      box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.1);
      .el-button {
        min-width: 100px;
      }
    }
  }
</style>

