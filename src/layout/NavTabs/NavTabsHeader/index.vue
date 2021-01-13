<template>
  <div>
    <div v-if="!isFold" class="nav-tabs-header">
      <div class="builder-logo" @click="handleClickFold">
        <span class="iconfont icon-builder-logo"></span>
      </div>
      <div class="project-name">
        <el-input v-model="inputValue" placeholder="工程名"></el-input>
      </div>
      <div class="save">
        <el-dropdown>
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
    <div v-else class="nav-tabs-header">
      <div class="fold" @click="handleClickFold">
        <span class="iconfont icon-menu-fold"></span>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="pullDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pullDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="pullDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavTabsHeader',
  data () {
    return {
      inputValue: '',
      pullDialogVisible: false
    }
  },
  computed: {
    ...mapState(['isFold'])
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs-header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding: 0 5px;
  font-size: 20px;
  box-sizing: border-box;
  .builder-logo {
    width: 50px;
    height: 50px;
    cursor: pointer;
    .icon-builder-logo {
      font-size: 40px;
    }
  }
  .project-name {
    display: flex;
    align-items: center;
    font-weight: bold;
    width: 160px;
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
</style>
