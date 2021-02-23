<template>
  <div>
    <div v-if="!isFold" class="nav-tabs-header">
      <div class="builder-logo" @click="handleClickFold">
        <span class="iconfont icon-builder-logo"></span>
      </div>
      <div class="header-right-base-layer" v-if="selectBaseLayerPage">
        <i class="fa fa-mail-reply" @click="handleClickBaseLayerBack"></i>
        <div class="title">{{ this.selectBaseLayerName }}</div>
        <span class="iconfont icon-menu-fold" @click="handleClickFold"></span>
      </div>
      <div class="header-right-analysis" v-else-if="isAnalysisHeader">
        <div class="title">
          <span :class="['iconfont', this.analysisIcon]"></span>
          <span class="name">{{ this.analysisName }}</span>
        </div>
        <i class="fa fa-mail-reply" @click="handleClickAnalysisBack"></i>
      </div>
      <div class="header-right-default" v-else>
        <div class="project-name">
          <el-input v-model="inputValue" placeholder="工程名"></el-input>
        </div>
        <div class="save">
          <el-dropdown placement="bottom">
            <span class="iconfont icon-save"></span>
            <i class="el-icon-arrow-down"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleClickSave">保存</el-dropdown-item>
              <el-dropdown-item @click.native="handleClickSaveAs">另存为</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="pull" @click="handleClickPull">
          <span class="iconfont icon-clouddown"></span>
        </div>
        <div class="fold" @click="handleClickFold">
          <span class="iconfont icon-menu-fold"></span>
        </div>
      </div>
    </div>
    <div v-else class="nav-tabs-header">
      <div class="folded" @click="handleClickFold">
        <span class="iconfont icon-menu-fold"></span>
      </div>
    </div>
    <ProjectDownloadDialog v-if="pullDialogVisible" :pullDialogVisible.sync="pullDialogVisible"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectDownloadDialog from '@/components/Dialog/ProjectDownloadDialog'
export default {
  name: 'NavTabsHeader',
  components: { ProjectDownloadDialog },
  data () {
    return {
      inputValue: '',
      pullDialogVisible: false
    }
  },
  computed: {
    ...mapState([
      'isFold', 'selectBaseLayerPage', 'selectBaseLayerName',
      'isAnalysisHeader', 'analysisName', 'analysisIcon'
    ])
  },
  methods: {
    handleClickFold () {
      this.$store.dispatch('setFoldSidebar')
    },
    handleClickSave () {
      console.log('click save')
    },
    handleClickSaveAs () {
      console.log('click saveAs')
    },
    handleClickPull () {
      this.pullDialogVisible = true
    },
    handleClickBaseLayerBack () {
      this.$store.dispatch('setBaseLayerHeaderBack')
    },
    handleClickAnalysisBack () {
      this.$store.dispatch('setAnalysisHeaderBack')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  font-size: 20px;
  box-sizing: border-box;
  .builder-logo {
    width: 50px;
    height: 50px;
    padding: 0 5px;
    box-sizing: border-box;
    cursor: pointer;
    .icon-builder-logo {
      font-size: 40px;
    }
  }
  .header-right-base-layer {
    position: fixed;
    top: 0;
    left: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    .fa-mail-reply {
      margin-left: 15px;
      cursor: pointer;
    }
    .title{
      width: 200px;
    }
    .icon-menu-fold {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .header-right-analysis {
    position: fixed;
    top: 0;
    left: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    .fa-mail-reply {
      margin-left: 15px;
      cursor: pointer;
    }
    .title {
      width: 200px;
      float: left;
      .iconfont {
        margin-left: 15px;
        font-size: 20px;
      }
      .name {
        margin-left: 15px;
      }
    }
  }
  .header-right-default {
    position: fixed;
    top: 0;
    left: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    height: 50px;
    padding: 0 5px;
    box-sizing: border-box;
    .project-name {
      display: flex;
      align-items: center;
      font-weight: bold;
      width: 180px;
    }
    .save {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon-save {
        font-size: 20px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
    .pull {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon-clouddown {
        font-size: 20px;
      }
    }
    .fold {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon-menu-fold {
        font-size: 20px;
      }
    }
  }
  .folded {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-menu-fold {
      font-size: 20px;
    }
  }
}
</style>
