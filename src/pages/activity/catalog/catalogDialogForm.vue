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
          label="名称">
            <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="updateOperate">确定</el-button>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'catalog-dialog-form',
  props: {
    value: Boolean
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
        ]
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
    }
  }
}
</script>
