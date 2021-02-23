<template>
  <el-dialog
    :close-on-click-modal="false"
    width="680px"
    customClass="pullDialog"
    title="工程拉取"
    :append-to-body='true'
    :visible.sync="dialogVisible"
    @close="dialogClose">
    <el-table
      :border=true
      :data="tableContent.slice((currentPage-1)*pageSize, currentPage*pageSize)"
      style="width: 100%; height: 314px; overflow-y: auto;">
      <el-table-column
        v-for="(item, index) in tableHeaderArray"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePull(scope.$index, scope.row)">加载</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
      :small="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :pager-count="5"
      layout="prev, pager, next, sizes, jumper, total"
      :total="tableContent.length"
    >
    </el-pagination>
  </el-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProjectDownloadDialog',
  props: {
    pullDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: this.pullDialogVisible,
      tableHeaderArray: [
        {
          label: '名称',
          prop: 'name',
          width: '240'
        },
        {
          label: '上传日期',
          prop: 'date',
          width: '160'
        },
        {
          label: '类型',
          prop: 'type',
          width: '80'
        }],
      tableContent: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.pullPrj()
  },
  methods: {
    dialogClose () {
      this.$emit('update:pullDialogVisible', false)
    },
    pullPrj () {
      var vm = this
      axios
        .get('http://27.17.43.14:9411' + '/file/getFilesList')
        .then(function (response) {
          console.log(response)
          var parseArray = []
          // for (var i = 0; i < 69; ++i) {
          //   parseArray.push({
          //     name: '用户' + i,
          //     date: '2020-12-30 23:23:12',
          //     type: 'prj'
          //   })
          // }
          for (var i = 0; i < response.data.list.length; ++i) {
            parseArray.push({
              name: response.data.list[i].FILE_NAME,
              date: response.data.list[i].UPLOAD_END_TIME,
              type: response.data.list[i].FILE_TYPE,
              url: 'http://27.17.43.14:9411' + '/file/download/' + response.data.list[i].TASK_ID
            })
          }
          vm.tableContent = parseArray
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handlePull (index, row) {
      var url = row.url
      console.log(url)
      axios
        .get(url, { timeout: 3000 })
        .then(function (response) {
          console.log(response.data)
        })
    },
    handleDel (index, row) {
      console.log(index, row)
      this.tableContent.splice(this.pageSize * (this.currentPage - 1) + index, 1)
    }
  },
  watch: {
    pullDialogVisible () {
      this.dialogVisible = this.pullDialogVisible
    }
  }
}
</script>

<style>
  .pullDialog {
    width: 680px;
  }

  /*.el-pager {*/
  /*  max-width: 132px;*/
  /*}*/
</style>

<style scoped>

</style>
