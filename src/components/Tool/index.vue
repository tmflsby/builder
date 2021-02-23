<template>
  <div class="tool">
    <div class="analysis-tool-wrapper" v-if="isAnalysisHeader">
      <AnalysisTool :analysisName="analysisName" :toolType="toolType"/>
    </div>
    <div class="tool-type" v-else>
      <el-collapse
        accordion
        v-model="activeName"
        v-for="(toolConfigItem, index) in toolConfig"
        :key="toolConfigItem.name"
      >
        <el-collapse-item :title="toolConfigItem.name" :name="index">
          <div
            :class="[toolConfigItem.class, 'analysis']"
            v-for="item in toolConfigItem.analysis"
            :key="item.name"
          >
            <div :name="item.name">
              <span :class="[item.icon, 'iconfont']" @click="handleClickAnalysis($event, item.icon)"></span>
              <div @click="handleClickAnalysis($event, item.icon)">{{ item.name }}</div>
              <el-tooltip effect="light" :content="item.tooltip" placement="right">
                <i class="el-icon-warning-outline" @click="handleClickAnalysis($event, item.icon)"></i>
              </el-tooltip>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import toolConfig from './toolConfig.json'
import AnalysisTool from './AnalysisTool'
export default {
  name: 'Tool',
  components: { AnalysisTool },
  data () {
    return {
      toolConfig,
      activeName: 0,
      analysisName: '',
      analysisIcon: '',
      toolType: ''
    }
  },
  computed: {
    ...mapState(['isAnalysisHeader'])
  },
  methods: {
    handleClickAnalysis (e, icon) {
      this.toolType = e.target.parentElement.parentElement.className.split(' ')[0]
      this.analysisName = e.target.parentElement.attributes.name.value
      this.analysisIcon = icon
      this.$store.dispatch('setAnalysisHeader', {
        currentAnalysisName: this.analysisName,
        currentAnalysisIcon: this.analysisIcon
      })
    }
  }
}
</script>

<style lang="scss">
.tool {
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
.el-tooltip__popper {
  .query-tooltip {
    width: 250px;
  }
}
</style>
<style lang="scss" scoped>
.tool {
  position: fixed;
  top: 50px;
  left: 50px;
  width: 300px;
  height: calc(100% - 50px);
  box-sizing: border-box;
  .analysis-tool-wrapper {
    width: 100%;
    height: calc(100% - 75px);
  }
  .tool-type {
    width: 100%;
    height: 100%;
    padding: 0 25px;
    box-sizing: border-box;
  }
}
.analysis {
  width: 100%;
  padding: 0;
  margin: 0;
  div {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .iconfont {
      font-size: 24px;
    }
    div {
      margin-left: 25px;
    }
    i {
      font-size: 15px;
    }
  }
}
</style>
