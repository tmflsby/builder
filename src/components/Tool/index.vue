<template>
  <div class="tool">
    <el-collapse accordion>
      <el-collapse-item title="几何服务" name="1">
        <div class="analysis">
          <div class="overlay" @click="handleClickAnalysis">
            <span class="iconfont icon-analysis-overlay"></span>
            <div>叠置分析</div>
            <el-tooltip effect="light" content="对给定的两个图形的交集" placement="right">
              <i class="el-icon-warning-outline"></i>
            </el-tooltip>
          </div>
          <div class="difference" @click="handleClickAnalysis">
            <span class="iconfont icon-analysis-difference"></span>
            <div>差异分析</div>
            <el-tooltip effect="light" content="求属于目标图形但不属于源图形的部分" placement="right">
              <i class="el-icon-warning-outline"></i>
            </el-tooltip>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="通用查询服务" name="2">
        123
      </el-collapse-item>
      <el-collapse-item title="空间统计" name="3">
        123
      </el-collapse-item>
      <el-collapse-item title="要素查询" name="4">
        123
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Tool',
  methods: {
    handleClickAnalysis () {
      console.log('click analysis')
    }
  }
}
</script>

<style lang="scss" scoped>
.tool {
  position: fixed;
  top: 50px;
  left: 50px;
  width: 300px;
  padding: 15px;
  box-sizing: border-box;
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
      margin-left: 10px;
    }
    i {
      font-size: 15px;
    }
  }
}
</style>
