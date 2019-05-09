<template>
  <page-layout
    :breadcrumb="i18nBreadcrumb">
      <page-form
        ref="form"
        :forms="formData"
        :rules="ruleValidate">
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
          <el-col :span="24">
            <el-form-item>
              <el-alert
                show-icon
                title="热门文章首先看权重，其次看阅读量"
                type="warning"
                :closable="false">
              </el-alert>
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
                  multiple
                  filterable
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
        
        <el-form-item
          prop="img_src"
          label="封面">
          <div class="page-upload">
            <div v-if="formData.img_src"
              class="page-upload__show"
              :style="{backgroundImage: `url(${formData.img_src})`}">
            </div>
            <el-upload
              class="page-upload__main"
              drag
              name="image"
              :show-file-list="false"
              :on-success="fileUploadSuccess"
              :action="apiUrl">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          prop="content"
          label="内容">
            <vue-html5-editor
              :content="formData.content"
              :height="500"
              @change="updateData"
              :auto-height="false">
            </vue-html5-editor>
        </el-form-item>

        <template slot="footer">
          <el-button
            type="primary"
            size="small"
            @click="saveFormData(false)"
            :round="false">
              保存
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="saveFormData(true)"
            :round="false">
              保存并上架
          </el-button>
        </template>
      </page-form>
  </page-layout>
</template>

<script>
import { to } from '@/utils'
import { fetchTag } from '@/api/common'
import config from '@/api/config'
import { fetchBlogTypeList } from './http'

export default {
  name: 'blog-form',
  props: {
    breadcrumbObj: {
      type: Object,
      default () {
        return {}
      }
    },
    // 文章的类别
    oneCatalog: {
      type: String,
      default: ''
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
      },                                    // 表单数据
      blogId: this.$route.params.id,        // 更新文章ID
      apiUrl: config.apiUrl,                // 图片上传接口地址
      types: [],                            // 分类列表
      tags: [],                             // 标签列表
      ruleValidate: {                       // 规则
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        // img_src: [
        //   {required: true, message: '封面不能为空', trigger: 'change'}
        // ],
        content: [
          {required: true, message: '内容不能为空', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    /**
     * 初始化表单数据
     */
    initFormData () {

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
    },
    /**
     * 封面上传成功
     */
    fileUploadSuccess () {

    },
    /**
     * 富文本内容更新
     */
    updateData (content) {
      this.formData.content = content
    },
    /**
     * 保存数据
     * @params isGroup 是否上架
     */
    async saveFormData (isGroup) {
      let [error, data] = await to(this.$refs.form.validate())
      if (error) {
        return this.$message.error('表单信息不完善')
      }
      
      this.saveTagNum()
      this.saveBlogData()
    },
    /**
     * 
     * formData 处理后的数据
     */
    saveBlogData () {
      let formData = Object.assign({}, this.formData)
    },
    /**
     * 每次的更新需要更新标签的引用数量
     */
    saveTagNum () {
      let tags = this.formData.tags
      let detailTags = this.tags.filter(v => tags.includes(v.id))
    }
  },
  created () {
    this.initType()
    this.initTag()
    if (this.blogId) {
      this.initFormData()
    }
  }
}
</script>

<style lang="less">
  .page-upload {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    overflow: hidden;
    border: 1px dashed #eee;
    cursor: pointer;
    &:hover {
      .page-upload__main {
        display: block !important;
      }
    }
    .page-upload__show {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      + .page-upload__main {
        display: none;
      }
    }
    .page-upload__main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
  }
</style>

