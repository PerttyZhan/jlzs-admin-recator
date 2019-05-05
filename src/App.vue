<template>
  <div id="app" class="full">
    <router-view/>
  </div>
</template>

<script>
// import Page from '@/components/page/index.vue'
export default {
  name: 'app',
  components: {
    // Page
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
