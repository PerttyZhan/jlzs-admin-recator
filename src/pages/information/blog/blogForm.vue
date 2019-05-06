<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">
      <page-form>
        <el-form-item
          prop="title"
          label="大标题">
            <el-input
              v-model="formData.title"
              placeholder="请输入大标题">
            </el-input>
        </el-form-item>

        <el-form-item
          prop="s_title"
          label="小标题">
            <el-input
              v-model="formData.s_title"
              placeholder="请输入小标题">
            </el-input>
        </el-form-item>
        
        <el-form-item
          prop="s_title"
          label="小标题">
            <el-input
              v-model="formData.s_title"
              placeholder="请输入小标题">
            </el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              prop="creator"
              label="署名">
                <el-input
                  v-model="formData.creator"
                  placeholder="请输入署名">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="weight"
              label="权重">
                <el-input
                  v-model="formData.weight"
                  placeholder="请输入权重">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="secondcatalog"
              label="分类">
                <el-select
                  v-model="formData.secondcatalog"
                  clearable>
                  <el-option
                    v-for="t in types"
                    :key="t.id"
                    :label="t.name"
                    :value="t.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="tags"
              label="标签">
                <el-select
                  v-model="formData.tags"
                  clearable>
                  <el-option
                    v-for="t in tags"
                    :key="t.id"
                    :label="t.name"
                    :value="t.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="封面">
          <div class="page-upload">
            <el-upload
              class="page-upload__main"
              drag
              name="image"
              :show-upload-list="false"
              :on-success="fileUploadSuccess"
              action="">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          prop="content"
          label="内容">
            <!-- <vue-html5-editor
              :content="formData.content"
              :height="500"
              @change="updateData"
              :auto-height="false">
            </vue-html5-editor> -->
        </el-form-item>
      </page-form>
  </page-layout>
</template>

<script>
import { to } from '@/utils'
import { fetchTag } from '@/api/common'
import { fetchBlogTypeList } from './http'

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
      formData: {
        weight: 1,
        title: '',
        s_title: '',
        img_src: '',
        secondcatalog: '',
        content: '',
        tags: [],
        creator: ''
      },
      types: [],
      tags: [],
      editorOption: {}
    }
  },
  methods: {
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
    },
    /**
     * 封面上传成功
     */
    fileUploadSuccess () {

    },
    /**
     * 富文本初始化
     */
    onEditorReady (editor) {
      console.log(editor)
    },
    /**
     * 富文本内容更新
     */
    updateData () {
    }
  },
  created () {
    this.initType()
    this.initTag()
  }
}
</script>

<style lang="less">
  .page-upload {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    border: 1px dashed #eee;

    .page-upload__main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
  }
</style>

