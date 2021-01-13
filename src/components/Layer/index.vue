<template>
  <div class="layer">
    <el-button type="primary" class="add-layer" @click="handleClickAddLayer">
      <i class="el-icon-plus"></i>
      添加图层
    </el-button>
    <div class="base-layer"></div>
  </div>
</template>

<script>
export default {
  name: 'Layer',
  methods: {
    handleClickAddLayer () {
      console.log('click addLayer')
    }
  }
}
</script>

<style lang="scss" scoped>
.layer {
  padding: 10px;
  .add-layer {
    width: 100%;
    height: 40px;
  }
  .base-layer {
    width: 100%;
    height: 80px;
    margin-top: 20px;
    border-radius: 4px;
    background: yellowgreen;
  }
}
</style>
