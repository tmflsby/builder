<template>
  <div class="user-info">
    <div class="user-info-icon" @click="handleClickUserInfo">
      <span class="iconfont icon-user"></span>
    </div>
    <div class="user-info-content-wrapper" v-if="isShowUserInfo">
      <div class="user-info-content">
        <div class="account-info" @click.prevent="handleClickAccountInfo">
          <span class="user-info-icon-font iconfont icon-account-info"></span>
          <span class="title">账户信息</span>
        </div>
        <div class="create-map" @click.prevent="handleClickCreateMap">
          <span class="user-info-icon-font iconfont icon-add-map"></span>
          <span class="title">创建地图</span>
        </div>
        <div class="my-map" @click.prevent="handleClickMyMap">
          <span class="user-info-icon-font iconfont icon-my-map"></span>
          <span class="title">我的地图</span>
        </div>
        <div class="back-home" @click.prevent="handleClickBackHome">
          <span class="user-info-icon-font iconfont icon-home-page"></span>
          <span class="title">返回首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      isShowUserInfo: false
    }
  },
  methods: {
    handleClickUserInfo () {
      console.log('click userInfo')
      this.isShowUserInfo = !this.isShowUserInfo
    },
    handleBlurUserInfo () {
      this.isShowUserInfo = false
    },
    handleClickAccountInfo () {
      console.log('click accountInfo')
      this.isShowUserInfo = false
    },
    handleClickCreateMap () {
      console.log('click createMap')
      this.isShowUserInfo = false
    },
    handleClickMyMap () {
      console.log('click myMap')
      this.isShowUserInfo = false
    },
    handleClickBackHome () {
      console.log('click backHome')
      this.isShowUserInfo = false
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-icon {
  padding: 5px;
  cursor: pointer;
  .icon-user {
    font-size: 40px;
  }
}
.user-info-content-wrapper {
  position: fixed;
  bottom: 0;
  left: 50px;
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 4px 0 0;
  background: #F5F7FA;
  display: flex;
  align-items: center;
  .user-info-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .account-info {
      border-width: 0 1px 1px 0;
    }
    .create-map {
      border-width: 0 0 1px 0;
    }
    .my-map {
      border-width: 0 1px 0 0;
    }
    .back-home {
      border-width: 0;
    }
    div {
      .iconfont {
        font-size: 40px;
      }
      width: 80px;
      height: 80px;
      padding: 5px;
      font-size: 14px;
      text-align: center;
      border-color: #ccc;
      border-style: solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
