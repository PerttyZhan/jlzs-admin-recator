<template>
  <el-pagination
    :class="$style.wrap"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    :layout="layout">
  </el-pagination>
</template>

<script>
export default {
  name: 'pager',
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSizes: [10, 20, 40, 100],
      pageSize: 20,
      total: 1,
      layout: "total, sizes, slot, prev, pager, next, jumper"
    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('input', {
        pageNo: 1,
        pageSize: size,
        totalCount: this.total
      })
    },
    handleCurrentChange (page) {
      this.$emit('input', {
        pageNo: page,
        pageSize: this.pageSize,
        totalCount: this.total
      })
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler ({pageNo, pageSize, totalCount}) {
        this.currentPage = parseInt(pageNo) || 1
        this.pageSize = parseInt(pageSize) || 10
        this.total = parseInt(totalCount) || 1
      }
    }
  }
}
</script>

<style lang="less" module>
  .wrap {
    text-align: center;
  }
</style>


