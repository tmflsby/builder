<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: 'Map',
  mounted () {
    this.$store.dispatch('setMap')
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
