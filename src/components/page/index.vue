<template>
  <el-scrollbar class="page-component">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'page-scroll',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      calcWidth: '',
      calcHeight: ''
    }
  },
  watch: {
    width: {
      immediate: true,
      handler (newV) {
        this.calcWidth = newV
      }
    },
    height: {
      immediate: true,
      handler (newV) {
        this.calcHeight = newV
      }
    }
  }
}
</script>

<style lang="less">
  .page-component {
    position: relative;
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      height: 100%;
      overflow-x: auto;
    }
  }
</style>
