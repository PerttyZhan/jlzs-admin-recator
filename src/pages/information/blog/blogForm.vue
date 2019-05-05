<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">
      <page-form></page-form>
  </page-layout>
</template>

<script>
export default {
  name: 'blog-form',
  props: {
    breadcrumbObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">

</style>

