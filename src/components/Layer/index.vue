<template>
  <div class="layer">
    <div class="change-base-layer" v-if="selectBaseLayerPage">
      <div class="base-map"
        v-for="item in baseMap"
        :key="item.name"
        @mouseenter="handleMouseEnterBaseMapStyle"
        @mouseleave="handleMouseLeaveBaseMapStyle"
        :name="item.name"
      >
        <div
          :class="[item.class, 'map-img']"
          :style="{backgroundImage: 'url( '+ item.src +')'}"
          @click="handleClickSelectMap"
        ></div>
        <span class="title" @click="handleClickSelectMap">{{ item.name }}</span>
      </div>
    </div>
    <div class="layer-default" v-else>
      <el-dropdown placement="bottom" trigger="click" class="dropdown-add-layer">
        <el-button type="primary" class="button-add-layer">
          <i class="el-icon-arrow-down el-icon-plus"></i>
          添加图层
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleAddLayerFile">通过数据源添加</el-dropdown-item>
          <el-dropdown-item>通过数据服务添加</el-dropdown-item>
          <el-dropdown-item>通过地图服务添加</el-dropdown-item>
          <el-dropdown-item>创建注记图层</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="add-layer-wrapper">
        <AddLayer/>
      </div>
      <div
        class="base-layer"
        ref="baseLayer"
        @click="handleClickBaseLayer"
        @mouseenter="handleMouseEnterLayerStyle"
        @mouseleave="handleMouseLeaveLayerStyle"
      >
        <div class="image" :style="{backgroundImage: 'url( '+ this.currentBaseMapImageUrl +')'}"></div>
        <div class="name">{{this.selectBaseLayerName}}</div>
        <i class="fa fa-eye"  @click.stop="handleClickLayerUnShow" v-if="layerIsShow"></i>
        <i class="fa fa-eye-slash" @click.stop="handleClickLayerShow" v-else></i>
      </div>
      <AddLayerFileDialog
        v-if="fileDialogVisible"
        :fileDialogVisible.sync="fileDialogVisible"
        >
      </AddLayerFileDialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddLayer from './AddLayer'
import AddLayerFileDialog from '@/components/Dialog/AddLayerFileDialog'
import geoQBlue from '@/assets/baseMapImage/geoq_blue.png'
import geoQGray from '@/assets/baseMapImage/geoq_gray.png'
import geoQVector from '@/assets/baseMapImage/geoq_vector.png'
import geoQWarm from '@/assets/baseMapImage/geoq_warm.png'
import googleVector from '@/assets/baseMapImage/google_vector.png'
import googleImage from '@/assets/baseMapImage/google_image.png'
import gaoDeVector from '@/assets/baseMapImage/gaode_vector.png'
import gaoDeImage from '@/assets/baseMapImage/gaode_image.png'
export default {
  name: 'Layer',
  data () {
    return {
      fileDialogVisible: false,
      baseMap: [
        { src: geoQVector, name: '智图矢量' },
        { src: geoQBlue, name: '智图蓝色' },
        { src: geoQGray, name: '智图灰色' },
        { src: geoQWarm, name: '智图暖色' },
        { src: googleVector, name: '谷歌矢量' },
        { src: googleImage, name: '谷歌影像' },
        { src: gaoDeVector, name: '高德矢量' },
        { src: gaoDeImage, name: '高德影像' }
      ],
      currentBaseMapImageUrl: '',
      layerIsShow: true
    }
  },
  components: { AddLayerFileDialog, AddLayer },
  computed: {
    ...mapState(['selectBaseLayerPage', 'selectBaseLayerName', 'currentLayer', 'currentBaseLayer'])
  },
  watch: {
    currentBaseLayer () {
      return this.currentBaseLayer
    }
  },
  beforeMount () {
    this.selectedBaseMap()
  },
  beforeUpdate () {
    this.selectedBaseMap()
  },
  methods: {
    selectedBaseMap () {
      this.baseMap.forEach(item => {
        if (this.selectBaseLayerName === item.name) {
          Object.defineProperty(item, 'class', {
            value: 'selected'
          })
          this.currentBaseMapImageUrl = item.src
        }
      })
    },
    handleClickBaseLayer () {
      if (Object.keys(this.currentBaseLayer).length !== 0) {
        this.$store.dispatch('setSelectBaseLayerPage')
      }
    },
    handleAddLayerFile () {
      this.fileDialogVisible = true
      console.log('file')
    },
    handleMouseEnterBaseMapStyle (e) {
      e.target.firstElementChild.classList.add('hover')
    },
    handleMouseLeaveBaseMapStyle (e) {
      e.target.firstElementChild.classList.remove('hover')
    },
    handleClickSelectMap (e) {
      this.$store.dispatch('setSelectBaseMap', {
        currentSelectBaseLayerName: e.target.parentElement.attributes.name.value
      })
      this.baseMap = [
        { src: geoQVector, name: '智图矢量' },
        { src: geoQBlue, name: '智图蓝色' },
        { src: geoQGray, name: '智图灰色' },
        { src: geoQWarm, name: '智图暖色' },
        { src: googleVector, name: '谷歌矢量' },
        { src: googleImage, name: '谷歌影像' },
        { src: gaoDeVector, name: '高德矢量' },
        { src: gaoDeImage, name: '高德影像' }
      ]
    },
    handleMouseEnterLayerStyle (e) {
      e.target.classList.add('hover')
    },
    handleMouseLeaveLayerStyle (e) {
      e.target.classList.remove('hover')
    },
    handleClickLayerUnShow () {
      this.layerIsShow = false
      this.$refs.baseLayer.classList.add('unShow')
      this.$store.dispatch('setDeleteBaseMap')
    },
    handleClickLayerShow () {
      this.layerIsShow = true
      this.$refs.baseLayer.classList.remove('unShow')
      this.$store.dispatch('setAddBaseMap')
    }
  }
}
</script>

<style lang="scss" scoped>
.layer {
  position: fixed;
  top: 50px;
  left: 50px;
  width: 300px;
  padding: 15px 25px;
  box-sizing: border-box;
  .layer-default {
    .button-add-layer {
      width: 100%;
      height: 40px;
    }
    .add-layer-wrapper {
      width: 100%;
    }
    .base-layer {
      width: 100%;
      height: 60px;
      margin-top: 20px;
      border: 2px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .image {
        width: 50px;
        height: 50px;
        margin-left: 10px;
        border-radius: 50%;
        border: 2px solid #ccc;
      }
      .name {
        width: 120px;
        font-size: 14px;
      }
      .fa-eye, .fa-eye-slash {
        font-size: 14px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .hover {
      background: #cccccc;
    }
    .unShow {
      background: #cccccc;
    }
  }
  .change-base-layer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .base-map {
      width: 120px;
      height: 135px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;
      .map-img {
        width: 100px;
        height: 100px;
        margin: 0;
        padding: 0;
        border-radius: 4px;
        background-size: 100% 100%;
      }
      .selected {
        border: 4px solid #ccc;
      }
      .hover {
        border: 4px solid #ccc;
      }
    }
  };
}
.el-dropdown {
  width: 100%;
}
.el-dropdown-menu.el-popper {
  width: 251px;
  .el-dropdown-menu__item {
    display: flex;
    justify-content: center;
  }
}
</style>
