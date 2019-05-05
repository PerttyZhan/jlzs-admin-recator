<template>
  <div :class="$style.sider">
    <div :class="$style.header">
      <div :class="$style['userinfo']">
        <a href="/" :class="$style['userinfo-avatar']" title="返回首页">
          <img src="@/assets/logo.png" alt="logo" :class="$style['userinfo-avatar__image']">
        </a>
        <p :class="$style['userinfo-text']">
          xxx ( <strong>管理员</strong> )
        </p>
      </div>

      <el-row :class="$style['article-summary']" type="flex">
        <el-col>
          <p :class="$style['article-type']">资讯</p>
          <p :class="$style['article-count']">123</p>
        </el-col>
        <el-col>
          <p :class="$style['article-type']">报道</p>
          <p :class="$style['article-count']">123</p>
        </el-col>
        <el-col>
          <p :class="$style['article-type']">博客</p>
          <p :class="$style['article-count']">活动</p>
        </el-col>
      </el-row>

      <div :class="$style['platform-aciton']">
        <el-button type="text">安全退出</el-button>
      </div>
    </div>

    <div :class="$style.menu">
      <el-menu
        :class="$style['el-menu-vertical']"
        :default-active="defaultActive"
        mode="vertical"
        @select="selectMenu"
        :unique-opene="true">
          <template
            v-for="n in menu">
              <el-submenu
                v-if="n.children"
                :index="n.menuCode"
                :key="n.menuCode">
                <template slot="title">
                  <i :class="n.icon"></i>
                  <span>{{n.title}}</span>
                </template>
                <el-menu-item
                  v-for="c in n.children"
                  :key="c.menuCode"
                  :route="c.router"
                  :index="c.menuCode">
                  <i :class="c.icon"></i>
                  <span slot="title">{{c.title}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="n.menuCode"
                :route="n.router"
                :index="n.menuCode">
                  <i :class="n.icon"></i>
                  <span slot="title">{{n.title}}</span>
              </el-menu-item>
          </template>
          <!-- <side-menu-item
            v-for="n in menu"
            :key="n.menuCode"
            :menuData="n">
          </side-menu-item> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
const navList = (r => r.keys().reduce((a, n) => a.concat(r(n)), []))(require.context('../../../config/nav', true, /\.json$/))
import { mapState } from 'vuex'
import sideMenuItem from './homeSideMenuItem'

export default {
  name: 'home-sideNav',
  data () {
    return {
      menu: [],
      defaultActive: this.$route.meta.menuCode
    }
  },
  components: {
    sideMenuItem
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    selectMenu (a, b, vNode) {
      this.$router.push(vNode.route)
    }
  },
  created () {
    if (process.env.NODE_ENV !== 'development') {
      this.menu = navList.filter(nav => nav.isApp && this.userInfo.code.includes(nav.menuCode))
    } else {
      this.menu = navList
    }
    // console.log(this.defaultActive)
  }
}
</script>

<style lang="less" module>
  @import '../../../assets/style/custom.less';
  .header {
    border-bottom: 1px solid @baseBorderColor;
  }
  .userinfo {
    padding: 20px 0 15px;
  }
  .userinfo-avatar {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: @lightColorShadow;
    margin: 0 auto;
    .userinfo-avatar__image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .userinfo-text {
    font-size: 16px;
    padding: 10px 0;
  }
  
  .article-summary {
    text-align: center;
    .article-type {
      padding-bottom: 8px;
    }
  }

  .platform-aciton {
    margin-top: 10px;
  }
  .menu {
    text-align: left;
    .el-menu-vertical {
      border-right: 1px solid transparent;
    }
  }
</style>

