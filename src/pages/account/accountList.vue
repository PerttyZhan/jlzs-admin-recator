<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">
    <div slot="operate">
      <el-button
        type="medium"
        icon="el-icon-plus"
        @click="storeOperate"
        class="el-button--iconButton">
          添加
      </el-button>
    </div>
    <page-table
      :row-sort="true"
      :table-column="tableColumn"
      :ajax-success="fetchSuccess"
      :select-change="selectChange"
      :fetch-data="fetchList">
        <div slot="operate" slot-scope="scope">
          <el-button type="text" size="small" @click="updateOperate(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delOperate(scope.row.id)">删除</el-button>
        </div>
    </page-table>

    <form-dialog v-model="dialogVisible"></form-dialog>
  </page-layout>
</template>

<script>
import formDialog from './accountDialogForm'
import { fetchAccountList } from './http'
import { to } from '@/utils'

export default {
  name: 'account-list',
  props: {
    breadcrumbObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    formDialog
  },
  data () {
    return {
      tableColumn: [
        {prop: 'updated_at', label: '时间'},
        {prop: 'name', label: '账户名'},
        {prop: 'auth', label: '权限'},
        {
          custom: true,
          name: 'operate',
          label: '操作'
        }
      ],
      tableSelectIds: [],
      dialogVisible: false
    }
  },
  methods: {
    /**
     * table的获取源
     */
    fetchList ({pageSize, pageNo, ...rest}) {
      return fetchAccountList({
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
    updateOperate ({row}) {
    },
    /**
     * 添加
     */
    storeOperate () {
      this.dialogVisible = true
    },
    /**
     * 删除
     */
    async delOperate (isOne) {
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


