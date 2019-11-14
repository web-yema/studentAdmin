<template>
  <div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 150%">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-input v-if="scope.$index===updateShow" v-model="name" size="mini" placeholder="请输入内容" />
          <div v-else>{{ tableData[scope.$index].headname }}</div>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow" style="display:flex;">
            <el-radio v-model="sex" label="男">男</el-radio>
            <el-radio v-model="sex" style="margin-left:-15px;" label="女">女</el-radio>
          </div>
          <div v-else>{{ tableData[scope.$index].headsex }}</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-input v-if="scope.$index===updateShow" v-model="age" size="mini" placeholder="请输入内容" />
          </div>
          <div v-else>{{ tableData[scope.$index].headage }}</div>
        </template>
      </el-table-column>
      <el-table-column label="入职时间">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="jointime" size="mini" placeholder="入职时间">
              <el-option size="mini" :value="item.value" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].entryDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="学院">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upmajor" size="mini" placeholder="学院">
              <el-option size="mini" :value="item.value" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].college }}</div>
        </template>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upmajor" size="mini" placeholder="职位">
              <el-option size="mini" :value="item.value" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].position }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="">操作</template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="open(scope)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" style="margin-top:3px;" @click="deleteOne(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入接口函数
import { getHeadAll, updateHead, deleteHead } from '../../../api/headAll'
export default {
  data() {
    return {
      dialogVisible: false, // 弹窗状态
      listLoading: false,
      tableData: [], // 所有班主任
      updateShow: 100000,
      name: '', // 姓名
      sex: '', // 性别
      age: '', // 年龄
      jointime: '', // 入职时间
      upmajor: '' // 职位
    }
  },
  mounted() {
    this.getHeadAlls()
  },
  methods: {
    // 获取所有班主任
    async getHeadAlls() {
      const { data } = await getHeadAll()
      this.tableData = data.data
    },
    // 修改班主任信息
    open(scope) {
      this.$prompt('修改班主任职位:', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        // 判断如果value值和之前相同，或是填入空格，提示用户您没有做任何更改
        if (value === this.tableData[scope.$index].upmajor || value.trim() === '') {
          this.$message.error('您没有做任何更改!')
          return false
        }
        const Id = this.tableData[scope.$index]._id
        const { data } = await updateHead(Id, value)
        if (data.code === 200) {
          // 如果code码为200，提示用户修改成功
          this.$message.success(data.msg)
          this.getHeadAlls()
        } else {
          // 否则就提示用户修改失败，请重试
          this.$message.error('修改失败，请重试!')
          return false
        }
      }).catch(() => {
        this.$message({
          // 取消修改
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 删除班主任
    deleteOne(scope) {
      this.$confirm('此操作将永久删除该班主任, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const Id = this.tableData[scope.$index]._id
        const { data } = await deleteHead(Id)
        if (data.code === 200) {
          // 如果code码为200，提示用户删除成功
          this.$message.success(data.msg)
          this.getHeadAlls()
        } else if (data.code === 201) {
          // 如果code码为201，提示用户没有当前项
          this.$message.error('没有当前项!')
          return false
        }
      }).catch(() => {
        this.$message({
          // 取消删除
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
