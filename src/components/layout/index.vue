<template>
  <div class="layout">

    <div v-if="breadcrumb && breadcrumb.length" class="layout-header">
      <div class="layout-breadcrumb">
        <el-breadcrumb :separator="separator">
          <el-breadcrumb-item
            v-for="(b, index) in breadcrumb"
            :key="index">
              {{b.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <el-row
      v-if="$slots.operate"
      type="flex"
      justify="space-between"
      class="layout-operate">
        <slot name="operate"></slot>
      <!-- <div>
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
      <el-button
        title="收缩过滤"
        type="medium"
        icon="el-icon-setting"
        class="el-button--iconButton">
      </el-button> -->
    </el-row>
    

    <el-form
      v-if="$slots.filter"
      class="layout-filter">
      <el-row>
        <el-col v-for="n in 3" :key="n" :xs="24" :sm="12" :lg="8" :xl="6">
          <el-form-item label="用户名">
            <el-input size="medium" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <div class="layout-filter-button">
          <el-button type="primary" size="medium">查询</el-button>
          <el-button size="medium">重置</el-button>
        </div>
      </el-row>
    </el-form>
    

    <div class="layout-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-layout',
  props: {
    breadcrumb: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      separator: '/'
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/custom.less';

  .layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: hidden;
    .layout-header {
      border-bottom: 1px solid @baseBorderColor;
    }
    .layout-breadcrumb {
      min-height: 40px;
      padding: 8px 15px;
      .el-breadcrumb {
        line-height: 24px;
      }
    }

    .layout-operate {
      padding: 8px 15px;
      border-bottom: 1px solid @baseBorderColor;
    }
    .layout-filter {
      padding-top: 16px;
      border-bottom: 1px solid @baseBorderColor;
      /deep/ .el-form-item__label {
        line-height: 18px;
        height: 18px;
        margin-bottom: 4px;
        font-size: 12px;
      }
      /deep/ .el-form-item {
        padding: 0 15px;
      }
      .layout-filter-button {
        float: right;
        margin-right: 15px;
        margin-top: 24px;
        margin-bottom: 16px;
      }
    }

    .layout-main {
      flex: 1;
      width: 100%;
      padding: 15px;
      overflow: hidden;
    }
  }
</style>
