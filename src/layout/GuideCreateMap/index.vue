<template>
  <div class="guide-create-map" v-if="this.isShowGuideCreateMapDialog">
    <el-dialog
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="handleCloseDialog"
      top="25vh"
      width="750px"
    >
      <div slot="title" class="guide-title">
        <span style="font-size: 20px">创建第一幅地图</span>
        <span style="font-size: 16px; margin-left: 20px">多种方式创建地图</span>
      </div>
      <div class="guide-content">
        <el-carousel indicator-position="outside" :interval="4000" height="360px">
          <el-carousel-item v-for="(item, index) in guideImage" :key="item" class="guide-content-item">
            <img :src="guideImage[index]" alt="">
            <div class="guide-content-item-des">
              <div class="name">{{guideConfig.config[index].name}}</div>
              <div class="des">{{guideConfig.config[index].des}}</div>
              <el-button>{{guideConfig.config[index].button}}</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
        <el-checkbox v-model="checked">不再显示</el-checkbox>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'
import guideImage1 from '@/assets/guideImage/1.jpg'
import guideImage2 from '@/assets/guideImage/2.jpg'
import guideImage3 from '@/assets/guideImage/3.jpg'
import guideImage4 from '@/assets/guideImage/4.jpg'
import guideConfig from './guideConfig.json'
export default {
  name: 'GuideCreateMap',
  data () {
    return {
      visible: true,
      guideImage: [guideImage1, guideImage2, guideImage3, guideImage4],
      guideConfig,
      checked: false,
      isShowGuideCreateMapDialog: true
    }
  },
  mounted () {
    if (getLocalStorage('isShowGuideCreateMapDialog') === 'unShow') {
      this.isShowGuideCreateMapDialog = false
    }
  },
  methods: {
    handleCloseDialog () {
      if (this.checked) {
        setLocalStorage('isShowGuideCreateMapDialog', 'unShow')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-create-map {
  width: 100%;
  height: 100%;
}
.guide-content-item {
  display: flex;
  img {
    border-radius: 4px;
  }
  .guide-content-item-des {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    .name {
      font-size: 30px;
      font-weight: bold;
    }
    .des {
      margin-bottom: 50px;
      font-size: 18px;
    }
  }
}
</style>
