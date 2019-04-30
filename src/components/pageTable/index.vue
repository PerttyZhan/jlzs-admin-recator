<template>
  <div :class="['full', $style.full]">
    <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          v-for="col in tableColumn"
          :key="'col_' + col.prop"
          :prop="col.prop"
          :label="col.label">
        </el-table-column>
    </el-table>

    <div :class="$style['footer-pagation']">
      <Pager v-model="pageInfo"></Pager>
    </div>
  </div>
</template>

<script>
import Pager from './pager'

export default {
  name: 'page-table',
  components: {
    Pager
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableColumn: [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'}
      ],
      pageInfo: {
        pageNo: 1,
        pageSize: 20,
        totalCount: 200
      }
    }
  }
}
</script>

<style lang="less" module>
  @import '../../assets/style/custom.less';

  .full {
    padding-bottom: 50px;
  }
  .footer-pagation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 18px;
    border-top: 1px solid @baseBorderColor;
  }
</style>
