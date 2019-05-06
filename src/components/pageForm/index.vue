<template>
  <div class="page-form">
    <pageScroll class="page-form__main">
      <el-form
        class="page-form__wrap"
        label-width="100px"
        label-position="left"
        size="medium">
          <slot></slot>
      </el-form>
    </pageScroll>
    <div class="page-form__footer">
      <el-button type="primary" size="small" :round="false">保存</el-button>
      <el-button type="primary" size="small" :round="false">保存并上架</el-button>
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
  }
}
</script>

<style lang="less">
  @import '../../assets/style/custom';

  .page-form {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
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
      padding-top: 6px;
      text-align: right;
      border-top: 1px solid @baseBorderColor;
      .el-button {
        min-width: 100px;
      }
    }
  }
</style>

