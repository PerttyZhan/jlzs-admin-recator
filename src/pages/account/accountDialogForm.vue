<template>
  <el-dialog
    title="分类"
    width="500px"
    @close="closeDialog"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible">
      <el-form
        size="medium"
        :rules="rules"
        :model="formData">
        <el-form-item
          prop="name"
          label="账户名">
            <el-input v-model="formData.name" placeholder="请输入账户名"></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码">
            <el-input v-model="formData.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item
          prop="auth"
          label="权限">
            <pageScroll class="dialog-tree">
              <el-tree
                @check="authCheckUpdate"
                :data="menus"
                show-checkbox
                node-key="menuCode"
                :props="treeProps">
              </el-tree>
            </pageScroll>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="updateOperate">确定</el-button>
      </div>
  </el-dialog>
</template>

<script>
import navList from '@/config/nav/index.json'
import pageScroll from '@/components/page'

export default {
  name: 'catalog-dialog-form',
  props: {
    value: Boolean
  },
  components: {
    pageScroll
  },
  data () {
    return {
      dialogVisible: false,
      formData: {
        created_at: '',
        name: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      menus: [],
      treeProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newV) {
        this.dialogVisible = newV
      }
    }
  },
  methods: {
    updateOperate () {
      this.closeDialog()
    },
    closeDialog () {
      this.$emit('input', false)
    },
    /**
     * 权限选择改变时
     */
    authCheckUpdate (data, {checkedKeys, checkedNodes}) {
    }
  },
  created () {
    this.menus = navList
  }
}
</script>

<style lang="less" scoped>
  .dialog-tree {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
</style>
