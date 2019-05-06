<template>
  <div :class="['full', $style.full]">
    <el-table
      :data="tableData"
      v-loading="loading"
      ref="elTable"
      row-key="id"
      height="100%"
      @selection-change="selectChange"
      style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <template
          v-for="(col, index) in tableColumn">
            <el-table-column
              v-if="col.custom"
              :key="'col_' + index"
              :prop="col.prop"
              :label="col.label">
                <template slot-scope="scope">
                  <slot :name="col.name" v-bind="scope"></slot>
                </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="'col_' + index"
              :prop="col.prop"
              :label="col.label">
            </el-table-column>
        </template>
    </el-table>
    <div :class="$style['footer-pagation']">
      <Pager v-model="pageInfo"></Pager>
    </div>
  </div>
</template>

<script>
import Pager from './pager'
import { to, compareObject } from '@/utils'
import Sortable from 'sortablejs'

export default {
  name: 'page-table',
  props: {
    // 搜索参数
    query: {
      type: Object,
      default () {
        return {}
      }
    },
    tableColumn: {
      type: Array,
      default: []
    },
    fetchData: {
      type: Function,
      default () {
        return new Promsie(resolve => {
          resolve([])
        })
      }
    },
    ajaxSuccess: {
      type: Function,
      default: () => {}
    },
    selectChange: {
      type: Function,
      default: () => {}
    },
    rowSort: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pager
  },
  data () {
    return {
      tableData: [],
      pageInfo: {
        pageNo: 1,
        pageSize: 20,
        totalCount: 1
      },
      loading: false
    }
  },
  watch: {
    ajaxParams: {
      immediate: true,
      deep: true,
      handler (newV, oldV) {
        let keys = compareObject(newV, oldV)
        if (keys.length && keys.join('') !== 'totalCount') {
          console.log( keys )
          this.fetchList()
        }
      }
    },
    query: {
      deep: true,
      handler (newV) {
        if (this.pageInfo.pageNo == 1) {
          this.fetchList()
        } else {
          this.pageInfo.pageNo = 1
        }
      }
    }
  },
  computed: {
    ajaxParams () {
      let {pageSize, pageNo} = this.pageInfo        
      return {
        pageSize,
        pageNo
      }
    }
  },
  methods: {
    async fetchList () {
      console.log('fetchList')
      this.loading = true
      let params = Object.assign({}, this.query, this.ajaxParams) 
      let fetchDataFn = this.fetchData
      // if (!params.scheme) return
      let [error, data] = await to(fetchDataFn(params))
      if (error) return
      let {pageNo, pageSize, total, list} = data
      this.ajaxSuccess && this.ajaxSuccess(list)
      this.tableData = list
      // this.pageInfo = {                                      // 注意对象和数组的直接赋值，即使里面的值一样，也会触发上面的watch
      //   pageNo,
      //   pageSize,
      //   totalCount
      // }
      this.pageInfo.pageSize = pageSize
      this.pageInfo.pageNo = pageNo
      this.pageInfo.totalCount = total
      this.$nextTick(() => {
        this.loading = false
      })
    },
    // 行拖拽
    rowDrop () {
      const tbody = this.$refs.elTable.$el.querySelector('tbody')
      let tableData = this.tableData
      Sortable.create(tbody, {
        onEnd: ({newIndex, oldIndex}) => {
          const currRow = tableData.splice(oldIndex, 1)[0]
          this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    selectionChange () {
      console.log('aaaa')
    }
  },
  mounted () {
    if (this.rowSort) {
      this.rowDrop()
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
