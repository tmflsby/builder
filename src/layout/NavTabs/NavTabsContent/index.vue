<template>
  <div ref="navTabsContent" class="nav-tabs-content">
    <el-tabs type="border-card" tab-position="left" class="tabs">
      <el-tab-pane class="tab-pane">
        <span slot="label" class="tab-pan-content" @click="handleClickTabPane">
          <i class="tab-iconfont iconfont icon-layers"></i>
          <span>图层</span>
        </span>
        <div class="tab-content">
          <Layer/>
        </div>
      </el-tab-pane>
      <el-tab-pane class="tab-pane">
        <span slot="label" class="tab-pan-content" @click="handleClickTabPane">
          <i class="tab-iconfont iconfont icon-map-builder-analysis"></i>
          <span>工具</span>
        </span>
        <div class="tab-content">
          <Tool/>
        </div>
      </el-tab-pane>
      <el-tab-pane class="tab-pane">
        <span slot="label" class="tab-pan-content" @click="handleClickTabPane">
          <i class="tab-iconfont iconfont icon-setting"></i>
          <span>设置</span>
        </span>
        <div class="tab-content">
          <Setting/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Layer from '@/components/Layer'
import Tool from '@/components/Tool'
import Setting from '@/components/Setting'
export default {
  name: 'NavTabsLeft',
  components: { Layer, Tool, Setting },
  computed: {
    ...mapState(['isFold'])
  },
  watch: {
    isFold () {
      if (this.isFold) {}
    }
  },
  methods: {
    handleClickTabPane () {
      if (this.isFold) {
        this.$store.dispatch('setFoldSidebar')
      }
    }
  }
}
</script>

<style lang="scss">
.el-tabs__nav {
  height: 240px;
  width: 50px;
  .el-tabs__item {
    height: 80px;
  }
  .tab-pan-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80px;
    .tab-iconfont {
      height: 25px;
    }
  }
}
.el-tabs__header.is-left {
  margin-right: 0 !important;
}
</style>
<style lang="scss" scoped>
.nav-tabs-content {
  width: 100%;
  height: 100%;
  .tabs {
    width: 100%;
    height: calc(100% - 2px);
  }
}
</style>
