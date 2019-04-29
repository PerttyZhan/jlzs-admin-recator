<template>
  <div class="full">
    <el-container class="container">
      <el-aside
        :class="$style.sideNav"
        :width="sideWidth">
        <compScroll>
          <homeSideNav></homeSideNav>
        </compScroll>
      </el-aside>
      <el-container>
        <el-main :class="$style.main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import homeSideNav from './components/homeSideNav'
import compScroll from '@/components/page'

export default {
  name: 'page-admin',
  data () {
    return {
      sideWidth: '300px'
    }
  },
  components: {
    homeSideNav,
    compScroll
  }
}
</script>

<style lang="less" module>
  .sideNav {
    background: #fff;
    border-right: 1px solid #eee;
  }
  .main {
    background: #fff;
    padding: 0;
  }
</style>
