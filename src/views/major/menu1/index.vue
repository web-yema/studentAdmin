<template>
  <div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 150%">
      <el-table-column label="专业">
        <template slot-scope="scope">
          <el-input v-if="scope.$index===updateShow" v-model="majorname" size="mini" placeholder="请输入内容" />
          <div v-else>{{ tableData[scope.$index].majorname }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入接口函数
import { getMajor } from '../../../api/headAll'
export default {
  data() {
    return {
      listLoading: false,
      tableData: [], // 所有专业
      updateShow: 100000,
      major: '' // 专业
    }
  },
  // 获取所有专业
  async mounted() {
    const { data } = await getMajor()
    if (data.code === 200) {
      this.tableData = data.data
    } else if (data.code === 201) {
      this.$message.error(data.message)
    }
  }
}
</script>
