<template>
  <el-dialog
    width="680px"
    title="工程拉取"
    :close-on-click-modal="false"
    :append-to-body='true'
    :visible="this.dialogTableVisible"
    @close="dialogTableClose"
  >
    <el-table
      :border=true
      :data="this.tableData"
    >
      <el-table-column
        v-for="item in this.tableHeaderArray"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePull(scope.$index, scope.row)"
          >
            加载
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      layout="prev, pager, next, jumper"
      :page-size="2"
      :pager-count="5"
      :total="this.tableData && this.tableData.length"
    >
    </el-pagination>
  </el-dialog>
</template>

<script>
export default {
  name: 'PullProject',
  props: {
    isShowPullProject: {
      type: Boolean,
      isRequired: true
    },
    tableData: {
      type: Array,
      isRequired: true
    }
  },
  data () {
    return {
      tableHeaderArray: [
        {
          label: '名称',
          prop: 'FILE_NAME',
          width: '240'
        },
        {
          label: '上传日期',
          prop: 'UPLOAD_START_TIME',
          width: '160'
        },
        {
          label: '类型',
          prop: 'FILE_TYPE',
          width: '80'
        }],
      dialogTableVisible: this.isShowPullProject
    }
  },
  watch: {
    isShowPullProject () {
      this.dialogTableVisible = this.isShowPullProject
    }
  },
  methods: {
    dialogTableClose () {
      this.$emit('update:isShowPullProject', false)
    }
  }
}
</script>

<style scoped>

</style>
