<template>
  <pageScroll>
    <el-form
      class="page-form"
      label-width="100px"
      size="medium">
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </pageScroll>
</template>

<script>
import pageScroll from '../page'

export default {
  name: 'page-form',
  components: {
    pageScroll
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
  .page-form {
    text-align: center;
    padding-top: 40px;
    .el-form-item {
      display: inline-block;
    }
    .el-form-item__content {
      min-width: 400px;
    }
  }
</style>

