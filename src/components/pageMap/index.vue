<template>
  <div class="page-map">
    <el-autocomplete
      v-model="address"
      placeholder="请输入地址，自动搜索"
      class="page-map__input"
      :debounce="1000"
      placement="top"
      :trigger-on-focus="false"
      :fetch-suggestions="querySearchAsync"
      :popper-append-to-body="true"
      @select="handleSelect">
    </el-autocomplete>
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      class="bm-view"
      :ak="BAIDU_AK">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'

import { BAIDU_AK } from '@/constant'
import { to } from '@/utils'
import axios from 'axios'

export default {
  name: 'page-map',
  components: {
    BaiduMap,                             // 地图
    BmNavigation,                         // 缩放控件
    BmGeolocation                        // 定位
  },
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3,
      BAIDU_AK: BAIDU_AK,
      keyword: '',
      address: ''
    }
  },
  watch: {
    address (newV) {
      // console.log(newV)
    }
  },
  methods: {
    handler ({BMap, map}) {
      this.center.lng = 120.21937542
      this.center.lat = 30.25924446
      this.zoom = 15
    },
    async querySearchAsync (queryString, cb) {
      let [err, data] = to(this.fetchAddressList(queryString))
      console.log(data)
    },
    fetchAddressList (queryString) {
      return axios({
        methods: 'get',
        url: 'http://api.map.baidu.com/place/v2/suggestion',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true,
        params: {
          query: queryString,
          region: '全国',
          city_limit: 'false',
          output: 'json',
          ak: this.BAIDU_AK
        }
      })
    },
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="less">
  .page-map {
    width: 100%;
    .bm-view {
      width: 100%;
      height: 500px;
    }
    .page-map__input {
      margin-bottom: 10px;
      display: block;
      width: 300px;
    }
  }
</style>
