<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'Map',
  mounted () {
    const map = L.map('map', {
      center: [30, 114],
      zoom: 4,
      zoomControl: false,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
