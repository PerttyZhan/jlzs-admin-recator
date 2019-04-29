<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">

  </page-layout>
</template>

<script>
import pageLayout from '@/components/layout'

export default {
  name: 'information-blog',
  components: {
    pageLayout
  },
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


