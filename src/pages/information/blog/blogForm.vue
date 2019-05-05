<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">
      <page-form></page-form>
  </page-layout>
</template>

<script>
export default {
  name: 'blog-form',
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
      forms: {
        name: {
          rules: [
            {require: true, message: '请输入名称', trigger: 'click'}
          ],
          label: '活动名称',
          type: 'input',
          value: ''
        },
        region: {
          rules: [
            {require: true, message: '请选择活动区域', trigger: 'change'}
          ],
          label: '活动区域',
          type: 'select',
          value: '',
          selects: [
            {label: '区域1', value: 'quyu1'},
            {label: '区域2', value: 'quyu2'}
          ]
        },
        datetime: {
          rules: [
            {require: true, message: '请选择活动时间', trigger: 'change'}
          ],
          label: '活动时间',
          type: 'date-picker',
          value: ''
        },
        delivery: {
          label: '即时配送',
          type: 'switch',
          value: false
        },
        type: {
          rules: [
            {type: 'array', require: true, message: '请选择至少一个活动性质', trigger: 'change'}
          ],
          label: '活动性质',
          type: 'checkbox',
          value: []
        }
      }
    }
  }
}
</script>

<style lang="less">

</style>

