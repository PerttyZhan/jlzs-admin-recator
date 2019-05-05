<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">
    <div slot="operate">
      <el-button
        type="medium"
        icon="el-icon-plus"
        @click="storeArticle"
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
    <page-table
      :row-sort="true"
      :table-column="tableColumn"
      :fetch-data="fetchList">
        <div slot="operate" slot-scope="scope">
          <el-button type="text" size="small" @click="checkDetail(scope)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </div>
    </page-table>
  </page-layout>
</template>

<script>
import { fetchBlogList } from './http'

export default {
  name: 'information-blog',
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
      tableColumn: [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
        {
          custom: true,
          name: 'operate',
          label: '操作'
        }
      ]
    }
  },
  methods: {
    storeArticle () {
      this.$router.push({name: 'information-blog-store'})
    },
    fetchList ({pageSize, pageNo}) {
      return fetchBlogList({
        pageSize,
        pageNo
      })
    },
    checkDetail (scope) {
      console.log(scope)
    }
  }
}
</script>

<style lang="less">

</style>


