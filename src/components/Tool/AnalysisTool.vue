<template>
  <div class="analysis-tool">
    <!--  源图层  -->
    <div class="src-layer tool" v-if="this.control.srcLayer">
      <div class="title">
        <span>源图层</span>
        <el-tooltip
          effect="light"
          :content="this.control.srcLayer.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="srcLayerInputValue" placeholder="请选择">
        <el-option
          v-for="item in srcLayerOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  叠置图层  -->
    <div class="overlap-layer tool" v-if="this.control.overlapLayer">
      <div class="title">
        <span>叠置图层</span>
        <el-tooltip
          effect="light"
          :content="this.control.overlapLayer.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="overlapLayerInputValue" placeholder="请选择">
        <el-option
          v-for="item in overlapLayerOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  差异图层  -->
    <div class="difference-layer tool" v-if="this.control.differenceLayer">
      <div class="title">
        <span>差异图层</span>
        <el-tooltip
          effect="light"
          :content="this.control.differenceLayer.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="differenceLayerInputValue" placeholder="请选择">
        <el-option
          v-for="item in differenceLayerOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  目标图层  -->
    <div class="dest-layer tool" v-if="this.control.destLayer">
      <div class="title">
        <span>目标图层</span>
        <el-tooltip
          effect="light"
          :content="this.control.destLayer.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="destLayerInputValue" placeholder="请选择">
        <el-option
          v-for="item in destLayerOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  源图形空间参考  -->
    <div class="src-geo-srs tool" v-if="this.control.srcGeoSrs">
      <div class="title">
        <span>源图形空间参考</span>
        <el-tooltip
          effect="light"
          :content="this.control.srcGeoSrs.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input type="textarea" v-model="srcGeoSrsInputValue"></el-input>
    </div>

    <!--  目标图形空间参考  -->
    <div class="dest-geo-srs tool" v-if="this.control.destGeoSrs">
      <div class="title">
        <span>目标图形空间参考</span>
        <el-tooltip
          effect="light"
          :content="this.control.destGeoSrs.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input type="textarea" v-model="destGeoSrsInputValue"></el-input>
    </div>

    <!--  目标空间参考  -->
    <div class="out-srs tool" v-if="this.control.outSrs">
      <div class="title">
        <span>目标空间参考</span>
        <el-tooltip
          effect="light"
          :content="this.control.outSrs.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input type="textarea" v-model="outSrsInputValue"></el-input>
    </div>

    <!--  源空间参考  -->
    <div class="prj tool" v-if="this.control.prj">
      <div class="title">
        <span>源空间参考</span>
        <el-tooltip
          effect="light"
          :content="this.control.prj.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input type="textarea" v-model="prjInputValue"></el-input>
    </div>

    <!--  分组字段  -->
    <div class="group-fields tool" v-if="this.control.GroupFields">
      <div class="title">
        <span>分组字段</span>
        <el-tooltip
          effect="light"
          :content="this.control.GroupFields.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="groupFieldsInputValue" placeholder="请选择">
        <el-option
          v-for="item in groupFieldsOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  汇总字段  -->
    <div class="summary-fields tool" v-if="this.control.summaryFields">
      <div class="title">
        <span>汇总字段</span>
        <el-tooltip
          effect="light"
          :content="this.control.summaryFields.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="summaryFieldsInputValue" placeholder="请选择">
        <el-option
          v-for="item in summaryFieldsOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  汇总类型  -->
    <div class="summary-types tool" v-if="this.control.summaryTypes">
      <div class="title">
        <span>汇总类型</span>
        <el-tooltip
          effect="light"
          :content="this.control.summaryTypes.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select
        v-model="summaryTypesInputValue"
        multiple
        collapse-tags
        placeholder="请选择"
      >
        <el-option
          v-for="item in summaryTypesOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  容差  -->
    <div class="tolerance tool" v-if="this.control.tolerance">
      <div class="title">
        <span>容差（米）</span>
        <el-tooltip
          effect="light"
          :content="this.control.tolerance.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input-number v-model="toleranceInputValue" :precision="2" :step="1"></el-input-number>
    </div>

    <!--  最小面积  -->
    <div class="area-limit tool" v-if="this.control.areaLimit">
      <div class="title">
        <span>最小面积（平方米）</span>
        <el-tooltip
          effect="light"
          :content="this.control.areaLimit.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input-number v-model="areaLimitInputValue" :precision="2" :step="1"></el-input-number>
    </div>

    <!--  目标空间参考类型  -->
    <div class="out-srs-type tool" v-if="this.control.outSrsType">
      <div class="title">
        <span>目标空间参考类型</span>
        <el-tooltip
          effect="light"
          :content="this.control.outSrsType.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="outSrsTypeInputValue" placeholder="请选择">
        <el-option
          v-for="item in outSrsTypeOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  需要计算的属性参数  -->
    <div class="attribute tool" v-if="this.control.attribute">
      <div class="title">
        <span>需要计算的属性参数</span>
        <el-tooltip
          effect="light"
          :content="this.control.attribute.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="attributeInputValue" placeholder="请选择">
        <el-option
          v-for="item in attributeOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  缓冲区方向  -->
    <div class="buffer-side-type tool" v-if="this.control.bufferSideType">
      <div class="title">
        <span>缓冲区方向</span>
        <el-tooltip
          effect="light"
          :content="this.control.bufferSideType.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-select v-model="bufferSideTypeInputValue" placeholder="请选择">
        <el-option
          v-for="item in bufferSideTypeOptions"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--  缓冲半径  -->
    <div class="buffer-radius tool" v-if="this.control.bufferRadius">
      <div class="title">
        <span>缓冲半径（米）</span>
        <el-tooltip
          effect="light"
          :content="this.control.bufferRadius.tooltip"
          placement="right"
        >
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <el-input-number v-model="bufferRadiusInputValue" :precision="2" :step="1"></el-input-number>
    </div>

    <!--  返回图形面积  -->
    <div class="return-fields-area tool" v-if="this.control.returnFieldsArea">
      <div class="title">
        <span>返回图形面积（平方米）</span>
      </div>
      <el-input v-model="returnFieldsAreaInputValue" :disabled="true"></el-input>
    </div>

    <!--  返回图形长度  -->
    <div class="return-fields-length tool" v-if="this.control.returnFieldsLength">
      <div class="title">
        <span>返回图形长度（米）</span>
      </div>
      <el-input v-model="returnFieldsLengthInputValue" :disabled="true"></el-input>
    </div>

    <!--  分析结果  -->
    <div class="analysis-result tool" v-if="this.control.analysisResult">
      <div class="title">
        <span>分析结果</span>
      </div>
      <el-input type="textarea" v-model="analysisResultInputValue"></el-input>
    </div>

    <!--  结果图层名称  -->
    <div class="handle-result tool" v-if="this.control.handleResult">
      <div class="title">
        <span>结果图层名称</span>
      </div>
      <el-input v-model="handleResultInputValue"></el-input>
      <div class="handle-result-button">
        <el-button type="info" disabled>保存图层</el-button>
        <el-button type="info" disabled>撤销图层</el-button>
      </div>
    </div>

    <!--  分析结果Button  -->
    <div class="analysis-result-button tool" v-if="this.control.analysisResultButton">
      <el-button type="info" disabled>分析结果</el-button>
    </div>

    <!--  运行分析  -->
    <div class="run-analysis tool">
      <el-button type="primary" @click="handleClickRunAnalysis">分析结果</el-button>
    </div>

  </div>
</template>

<script>
import controlConfig from './controlConfig.json'
export default {
  name: 'AnalysisTool',
  props: {
    analysisName: {
      type: String,
      isRequired: true
    },
    toolType: {
      type: String,
      isRequired: true
    }
  },
  data () {
    return {
      control: null,
      srcLayerOptions: [
        { value: 'srcLayer1' },
        { value: 'srcLayer2' },
        { value: 'srcLayer3' }
      ],
      srcLayerInputValue: '',
      overlapLayerOptions: [
        { value: 'overlapLayer1' },
        { value: 'overlapLayer2' },
        { value: 'overlapLayer3' }
      ],
      overlapLayerInputValue: '',
      differenceLayerOptions: [
        { value: 'differenceLayer1' },
        { value: 'differenceLayer2' },
        { value: 'differenceLayer3' }
      ],
      differenceLayerInputValue: '',
      destLayerOptions: [
        { value: 'destLayer1' },
        { value: 'destLayer2' },
        { value: 'destLayer3' }
      ],
      destLayerInputValue: '',
      srcGeoSrsInputValue: 'EPSG:4326',
      destGeoSrsInputValue: 'EPSG:4326',
      outSrsInputValue: 'EPSG:4326',
      prjInputValue: 'EPSG:4326',
      groupFieldsOptions: [
        { value: 'groupFields1' },
        { value: 'groupFields2' },
        { value: 'groupFields3' }
      ],
      groupFieldsInputValue: '',
      summaryFieldsOptions: [
        { value: 'summaryFields1' },
        { value: 'summaryFields2' },
        { value: 'summaryFields3' }
      ],
      summaryFieldsInputValue: '',
      summaryTypesOptions: [
        { value: '求和' },
        { value: '最小值' },
        { value: '最大值' },
        { value: '平均值' },
        { value: '计数' }
      ],
      summaryTypesInputValue: '',
      toleranceInputValue: 0,
      areaLimitInputValue: 0,
      outSrsTypeOptions: [
        { value: 'proj4' },
        { value: 'epsg' },
        { value: 'wkt' },
        { value: 'esri' }
      ],
      outSrsTypeInputValue: 'proj4',
      attributeOptions: [
        { value: '面积' },
        { value: '长度' },
        { value: '中心点' },
        { value: '外接矩形' }
      ],
      attributeInputValue: '面积',
      bufferSideTypeOptions: [
        { value: 'both' }
      ],
      bufferSideTypeInputValue: 'both',
      bufferRadiusInputValue: 0,
      returnFieldsAreaInputValue: '',
      returnFieldsLengthInputValue: '',
      analysisResultInputValue: '',
      handleResultInputValue: ''
    }
  },
  beforeMount () {
    this.control = controlConfig[this.toolType][this.analysisName]
  },
  methods: {
    handleClickRunAnalysis () {
      console.log(this.analysisName, 'click run-analysis')
    }
  }
}
</script>

<style lang="scss">
.analysis-tool {
  .el-textarea {
    textarea {
      height: 80px;
    }
  }
}
</style>
<style lang="scss" scoped>
.analysis-tool {
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding: 25px 25px 0 25px;
  box-sizing: border-box;
  overflow: auto;
  .el-input-number {
    width: 100%;
  }
  .tool {
    width: 100%;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      display: flex;
      justify-content: space-between;
      .el-icon-warning-outline {
        cursor: pointer;
      }
    }
  }
  .src-layer, .overlap-layer, .dest-layer, .group-fields,
  .summary-fields, .summary-types, .tolerance, .area-limit,
  .out-srs-type, .attribute, .buffer-side-type, .buffer-radius,
  .return-fields-area, .return-fields-length {
    height: 65px;
  }
  .src-geo-srs, .dest-geo-srs, .out-srs, .prj, .analysis-result {
    height: 105px;
  }
  .handle-result {
    height: 115px;
    .handle-result-button {
      display: flex;
      justify-content: space-between;
      button {
        width: 50%;
      }
    }
  }
  .run-analysis {
    position: fixed;
    left: 50px;
    bottom: 0;
    width: 300px;
    height: 70px;
    padding: 0 25px;
    margin: 0;
    box-sizing: border-box;
    border-width: 1px 0 0 0;
    border-color: #ccc;
    border-style: solid;
    display: flex;
    justify-content: center;
  }
}
</style>
