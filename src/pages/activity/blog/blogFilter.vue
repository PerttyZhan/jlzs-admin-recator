<template>
  <el-form
    size="medium"
    ref="filterForm"
    :model="filters">
    <el-row>
      <el-col :xs="24" :sm="12" :lg="6" :xl="5">
        <el-form-item
          prop="date"
          label="时间">
          <el-date-picker
            v-model="filters.date"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator=" 至 "
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="5">
        <el-form-item
          prop="type"
          label="分类">
          <el-select v-model="filters.type" clearable>
            <el-option
              v-for="t in types"
              :key="t.id"
              :label="t.name"
              :value="t.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="5">
        <el-form-item
          prop="activitystatus"
          label="活动状态">
          <el-select v-model="filters.activitystatus" clearable>
            <el-option
              v-for="t in activityStatus"
              :key="t.value"
              :label="t.lable"
              :value="t.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="5">
        <el-form-item
          prop="status"
          label="文章状态">
          <el-select v-model="filters.blogstatus" clearable>
            <el-option
              v-for="t in blogStatus"
              :key="t.value"
              :label="t.lable"
              :value="t.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <div class="layout-filter-button">
        <el-button type="primary" size="medium" @click="queryTable">查询</el-button>
        <el-button size="medium" @click="resetFilter">重置</el-button>
      </div>
    </el-row>
  </el-form>
</template>

<script>
import { to } from '@/utils'
import { fetchTag } from '@/api/common'
import { fetchBlogTypeList } from './http'

export default {
  name: 'blog-form',
  props: {
    value: Object
  },
  data () {
    return {
      filters: {
        date: '',
        type: '',
        blogstatus: '',
        activitystatus: ''
      },
      types: [],
      tags: [],
      blogStatus: [
        {value: 1, lable: '发布'},
        {value: -1, lable: '未发布'}
      ],
      activityStatus: [
        {value: 1, lable: '进行中'},
        {value: 2, lable: '报名中'},
        {value: 3, lable: '已结束'}
      ]
    }
  },
  methods: {
    /**
     * 将filter赋给tablefiler，引起刷新
     */
    queryTable () {
      this.$emit('input', {
        ...this.filters
      })
    },
    /**
     * 重置过滤表单
     */
    resetFilter () {
      this.$refs.filterForm.resetFields()
    },
    /**
     * 初始化分类选择
     */
    async initType () {
      let [error, data] = await to(fetchBlogTypeList({pageSize: 100}))
      if (error) {throw error}

      this.types = data.list
    }
  },
  created () {
    this.initType()
  }
}
</script>
