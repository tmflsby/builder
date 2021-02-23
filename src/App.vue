<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#app {
  padding: 0;
  margin: 0;
  font-size: 12px;
  font-family: "Microsoft YaHei", sans-serif !important;
}
</style>
