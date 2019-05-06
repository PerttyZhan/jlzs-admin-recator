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
        @click="delArticle(false)"
        type="medium"
        icon="el-icon-delete"
        class="el-button--iconButton">
          删除
      </el-button>
    </div>
    <table-filter
      slot="filter"
      v-model="tableFilters">
    </table-filter>

    <page-table
      :row-sort="true"
      :query="tableFilters"
      :table-column="tableColumn"
      :ajax-success="fetchSuccess"
      :select-change="selectChange"
      :fetch-data="fetchList">
        <div slot="operate" slot-scope="scope">
          <el-button type="text" size="small" @click="updateOne(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delArticle(scope.row.id)">删除</el-button>
        </div>
    </page-table>
  </page-layout>
</template>

<script>
import tableFilter from './blogFilter'
import { fetchBlogList, fetchBlogTypeList } from './http'
import { to } from '@/utils'

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
  components: {
    tableFilter
  },
  data () {
    return {
      tableColumn: [
        {prop: 'updated_at', label: '时间'},
        {prop: 'type', label: '分类'},
        {prop: 'tag', label: '标签', width: 120, ellipsis: true},
        {prop: 'title', label: '标题', width: 200, ellipsis: true},
        {prop: 'weight', label: '权重'},
        {prop: 'reads', label: '阅读数'},
        {prop: 'collections', label: '收藏数'},
        {prop: 'status', label: '状态'},
        {
          custom: true,
          name: 'operate',
          label: '操作'
        }
      ],
      tableFilters: {},
      tableSelectIds: []
    }
  },
  methods: {
    /**
     * table的获取源
     */
    fetchList ({pageSize, pageNo, ...rest}) {
      return fetchBlogList({
        pageSize,
        pageNo,
        ...rest
      })
    },
    /**
     * 数据请求成功后
     */
    fetchSuccess (data) {
      console.log(data)
    },
    /**
     * table的勾选项变化时
     */
    selectChange (selects) {
      this.tableSelectIds = selects.map(v => v.id)
    },
    /**
     * 编辑
     */
    updateOne ({row}) {
      this.$router.push({name: 'information-blog-update', params: {id: row.id}})
    },
    /**
     * 添加
     */
    storeArticle () {
      this.$router.push({name: 'information-blog-store'})
    },
    /**
     * 删除
     */
    async delArticle (isOne) {
      let ids = isOne ? [isOne] : this.tableSelectIds
      if (!ids.length) {
        return this.$message({
          message: '请先选择删除项',
          duration: 2000,
          type: 'warning'
        })
      }

      let [isCancel] = await to(this.$confirm('是否继续删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }))

      if (!isCancel) {
        console.log('确定删除')
      }
    }
  }
}
</script>

<style lang="less">

</style>


