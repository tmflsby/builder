<template>
  <el-dialog
    :close-on-click-modal="false"
    width="680px"
    customClass="webDialog"
    title="通过web添加图层"
    :append-to-body="true"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    >
    <el-row type="flex" align="middle">
      <el-col :span="4">
        <label>服务类型</label>
      </el-col>
      <el-col :span="20">
        <el-select v-model="serviceTypeValue" value-key="type" @change="serviceTypeChange">
          <el-option
            v-for="item in serviceTypeList"
            :key="item.type"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="4">
        <label>服务地址</label>
      </el-col>
      <el-col :span="20">
        <el-input
          v-model="serviceAddressValue"
          style="font-size: 12px;"
          :placeholder="serviceAddressPlaceHolderValue" @input.native="serviceAddressInput">
        </el-input>
      </el-col>
    </el-row>
    <el-row v-if="layerListVisible" type="flex" align="middle">
      <el-col :span="4">
        <label>选择图层</label>
      </el-col>
      <el-col :span="20">
        <el-select v-model="serviceTypeValue">
          <el-option
            v-for="(item, index) in serviceTypeList"
            :key="index"
            :value="item"
            :label="item.label">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-if="scaleListVisible" type="flex" align="middle">
      <el-col :span="4">
        <label>选择比例尺</label>
      </el-col>
      <el-col :span="20">
        <el-select v-model="serviceTypeValue">
          <el-option
            index="0"
            v-for="(item, index) in serviceTypeList"
            :key="index"
            :value="item"
            :label="item.label">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="18"/>
      <el-col :span="3">
        <el-button type="primary" size="mini">取消</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="mini">确定</el-button>
      </el-col>
    </el-row>
    </el-dialog>
</template>

<script>
export default {
  name: 'AddLayerWebDialog',
  props: {
    webDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: this.webDialogVisible,
      serviceTypeList: [
        {
          type: 'KQ',
          label: 'KQ Rest Map Service',
          holder: 'http://<server>:<port>/KQGis/rest/services/{servicename}/MapServer'
        },
        {
          type: 'WMS',
          label: 'OGC WMS Service',
          holder: 'http://<server>:<port>/KQGis/rest/services/{servicename}/MapServer/WMS'
        },
        {
          type: 'WMTS',
          label: 'OGC WMTS Service',
          holder: 'http://<server>:<port>/KQGis/rest/services/{servicename}/MapServer/WMTS'
        }],
      serviceTypeValue: {
        type: 'KQ',
        label: 'KQ Rest Map Service',
        holder: 'http://<server>:<port>/KQGis/rest/services/{servicename}/MapServer'
      },
      serviceAddressPlaceHolderValue: 'http://<server>:<port>/KQGis/rest/services/{servicename}/MapServer',
      serviceAddressValue: '',
      layerList: [],
      scaleList: [],
      layerListVisible: false,
      scaleListVisible: false
    }
  },
  methods: {
    dialogClose () {
      this.$emit('update:webDialogVisible', false)
    },
    serviceTypeChange (data) {
      this.serviceAddressPlaceHolderValue = data.holder
      this.serviceTypeValue = data
    },
    // 处理服务地址input事件
    serviceAddressInput (ev) {
      console.log(ev.target.value)
    }
  },
  watch: {
    webDialogVisible () {
      this.dialogVisible = this.webDialogVisible
    }
  }
}
</script>

<style customClass>

</style>

<style scoped>
  .el-row:not(:last-child) {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }

  .el-select {
    width: 100%;
  }

</style>
