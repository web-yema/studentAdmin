<template>
  <div class="app-container">
    <el-table
v-loading="listLoading"
              :data="tableData"
              style="width: 150%"
>
      <el-table-column
label="名称"
                       prop="adminName"
>
        <template slot-scope="scope">
          <div>{{ scope.row.adminName }}</div>
        </template>
      </el-table-column>
      <el-table-column
label="权限"
                       prop="power"
>
        <template slot-scope="scope">
          <div v-show="isUpdate !== scope.row._id">{{ scope.row.power }}</div>
          <el-select
v-show="isUpdate === scope.row._id"
                     v-model="value"
                     placeholder="请选择"
>
            <el-option
v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
v-show="isUpdate === scope.row._id"
                     size="mini"
                     type="primary"
                     @click="updateClassCancel()"
>取消</el-button>
          <el-button
v-show="isUpdate === scope.row._id"
                     size="mini"
                     type="success"
                     @click="updateClassSucess(scope.row._id)"
>确定</el-button>
          <el-button
v-show="isUpdate !== scope.row._id"
                     size="mini"
                     type="primary"
                     @click="updateClass(scope.row)"
>修改</el-button>
          <el-button
            v-show="isUpdate !== scope.row._id"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllAdmin, delAdmin } from '@/api/user'
import { updateAdminPass } from '@/api/api'

export default {
  data() {
    return {
      listLoading: true, // 加载状态
      isUpdate: '',
      tableData: [], // 所有用户
      update: {
        power: ''
      },
      // 修改权限
      options: [
        {
          value: '2',
          label: '管理员'
        },
        {
          value: '3',
          label: '普通用户'
        }
      ],
      value: ''
    }
  },
  mounted() {
    this.handlegetHeadTeacher()
  },
  methods: {
    async handlegetHeadTeacher() {
      const { data } = await getAllAdmin()
      this.tableData = data.data
      if (data.code === 200) {
        this.listLoading = false
      }
      for (let i = 0; i < this.tableData.length; i++) {
        let tableDatas = this.tableData[i].power
        if (tableDatas === '2') {
          tableDatas = '管理员'
        } else if (tableDatas === '3') {
          tableDatas = '普通用户'
        }
        this.tableData[i].power = tableDatas
      }
    },

    // 删除一项
    handleDelete(id) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
          const { data } = await delAdmin(id)
          if (data.code === 200) {
            this.handlegetHeadTeacher()
            return this.$message.success(data.msg)
          }
          this.$message({
            message: data.msg,
            type: 'error'
          })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改一项
    updateClass(row, scope) {
      this.update.power = row.power
      this.isUpdate = row._id
      if (this.update.power === '管理员') {
        this.value = '2'
      } else if (this.update.power === '普通用户') {
        this.value = '3'
      }
    },
    // 取消修改
    updateClassCancel() {
      this.isUpdate = ''
    },
    // 确定修改
    async updateClassSucess(id) {
      this.update['_id'] = id
      if (this.update.power === '') {
        return this.$message.error('更新信息中不能为空')
      }
      const { data } = await updateAdminPass({ _id: id, power: this.value })
      if (data.code === 2002) {
        this.$message.success(data.msg)
        this.updateClassCancel()
        this.handlegetHeadTeacher()
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
