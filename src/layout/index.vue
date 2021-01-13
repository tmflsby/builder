<template>
  <div class="layout">
    <div ref="navTabsWrapper" class="nav-tabs-wrapper">
      <NavTab/>
    </div>
    <div ref="MapWrapper" class="map-wrapper">
      <Map/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavTab from './NavTabs'
import Map from './Map'
export default {
  name: 'Layout',
  components: { NavTab, Map },
  computed: {
    ...mapState(['isFold'])
  },
  watch: {
    isFold () {
      if (this.isFold) {
        this.$refs.navTabsWrapper.style.width = '50px'
        this.$refs.MapWrapper.style.width = 'calc(100% - 50px)'
      } else {
        this.$refs.navTabsWrapper.style.width = '350px'
        this.$refs.MapWrapper.style.width = 'calc(100% - 350px)'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  .nav-tabs-wrapper {
    width: 350px;
    height: 100%;
    transition: .5s;
  }
  .map-wrapper {
    width: calc(100% - 350px);
    height: 100%;
    transition: .5s;
  }
}
</style>
