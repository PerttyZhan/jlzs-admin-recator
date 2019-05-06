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
          prop="tag"
          label="标签">
          <el-select v-model="filters.tag" clearable>
            <el-option
              v-for="t in tags"
              :key="t.id"
              :label="t.name"
              :value="t.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="5">
        <el-form-item
          prop="status"
          label="状态">
          <el-select v-model="filters.status" clearable>
            <el-option
              v-for="t in status"
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
        tag: '',
        status: ''
      },
      types: [],
      tags: [],
      status: [
        {value: 1, lable: '上架'},
        {value: -1, lable: '未上架'}
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
    },
    /**
     * 初始化标签选择
     */
    async initTag () {
      let [error, data] = await to(fetchTag({pageSize: 100}))
      if (error) {throw error}

      this.tags = data.list
    }
  },
  created () {
    this.initType()
    this.initTag()
  }
}
</script>
