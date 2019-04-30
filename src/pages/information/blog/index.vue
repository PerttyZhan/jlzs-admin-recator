<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">

    <div slot="operate">
      <el-button
        type="medium"
        icon="el-icon-plus"
        class="el-button--iconButton">
          添加
      </el-button>
      <el-button
        type="medium"
        icon="el-icon-delete"
        class="el-button--iconButton">
          删除
      </el-button>
    </div>

    <pageTable></pageTable>
  </page-layout>
</template>

<script>
import pageLayout from '@/components/layout'
import pageTable from '@/components/pageTable'

export default {
  name: 'information-blog',
  components: {
    pageLayout,
    pageTable
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


