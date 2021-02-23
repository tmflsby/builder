<template>
  <div class="setting">
    <div class="title">
      <h3>标题</h3>
      <el-input placeholder="无标题"></el-input>
    </div>
    <div class="tag">
      <div class="tag-title">
        <h3>标签</h3>
        <span>（多个标签用逗号隔开，最多6个）</span>
      </div>
      <el-input placeholder="暂无地图标签"></el-input>
      <div class="add-tag" @click="handleClickAddTag">
        <i class="el-icon-plus"></i>
        添加标签
      </div>
    </div>
    <div class="des">
      <h3>描述</h3>
      <el-input type="textarea" placeholder="暂无描述信息"></el-input>
    </div>
    <div class="longitude">
      <h3>经度</h3>
      <el-input></el-input>
    </div>
    <div class="latitude">
      <h3>纬度</h3>
      <el-input></el-input>
    </div>
    <div class="zoom">
      <h3>地图级别</h3>
      <el-input></el-input>
    </div>
    <div class="copyright">
      <h3>
        <span class="iconfont icon-builder-logo"></span>
        <span>KQ Web Map Builder</span>
        <span>v1.0</span>
      </h3>
      <div>
        基于KQGIS Server、KQPortal 和 KQClient 产品以及其他
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  methods: {
    handleClickAddTag () {
      console.log('click addTag')
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  position: fixed;
  top: 50px;
  left: 50px;
  width: 300px;
  padding: 15px 25px;
  box-sizing: border-box;
  div {
    padding: 5px 0;
  }
}
.tag {
  position: relative;
  .tag-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .add-tag {
    position: absolute;
    bottom: 18px;
    right: 10px;
    cursor: pointer;
  }
}
.copyright {
  h3 {
    .icon-builder-logo {
      font-size: 40px;
    }
    span {
      padding-right: 8px;
    }
  }
  div {
    line-height: 20px;
  }
}
</style>
