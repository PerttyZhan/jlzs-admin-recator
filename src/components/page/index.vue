<template>
  <div :class="$style.wrap">
    <el-scrollbar>
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'ElPage',
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

<style lang="less" module>
  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    overflow: hidden;
  }
  .wrap-scrollbar {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
