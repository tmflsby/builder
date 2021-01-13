<template>
  <div class="nav-tabs">
    <div class="nav-tabs-header-wrapper">
      <NavTabsHeader/>
    </div>
    <div class="nav-tabs-content-wrapper">
      <NavTabsContent/>
    </div>
    <div class="user-info-wrapper">
      <UserInfo/>
    </div>
  </div>
</template>

<script>
import NavTabsHeader from './NavTabsHeader'
import NavTabsContent from './NavTabsContent'
import UserInfo from '@/components/UserInfo'
export default {
  name: 'NavTab',
  components: { NavTabsHeader, NavTabsContent, UserInfo }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  width: 100%;
  height: 100%;
  .nav-tabs-header-wrapper {
    width: 100%;
    height: 50px;
  }
  .nav-tabs-content-wrapper {
    width: 100%;
    height: calc(100% - 50px);
  }
  .user-info-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
