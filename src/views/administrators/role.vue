<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="tableData" style="width: 150%">
      <el-table-column label="名称" prop="adminName">
        <template slot-scope="scope">
          <div >{{scope.row.adminName}}</div>
        </template>
      </el-table-column>
      <el-table-column label="权限" prop="power">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{scope.row.power}}</div>
          <el-input
            v-show="isUpdate===scope.row._id"
            size="mini"
            style="width:70%"
            v-model="update.power"
          />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-show="isUpdate===scope.row._id"
            @click="updateClassCancel()"
          >取消</el-button>
          <el-button
            size="mini"
            type="success"
            v-show="isUpdate===scope.row._id"
            @click="updateClassSucess(scope.row._id)"
          >确定</el-button>
          <el-button
            size="mini"
            type="primary"
            v-show="isUpdate!==scope.row._id"
            @click="updateClass(scope.row)"
          >修改</el-button>
          <el-button size="mini" type="danger" v-show="isUpdate!==scope.row._id" @click="handleDelete(scope.row._id)">销毁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllAdmin,delAdmin } from "@/api/user";
import { updateAdminPass } from "@/api/api"

export default {
  inject:['reload'],
  data() {
    return {
      listLoading: true, //加载状态
      isUpdate: "",
      tableData: [], //所有用户
      update: {
        power: ""
      },

      
    };
  },
  async mounted() {
    let { data } = await getAllAdmin();
    this.tableData = data.data;
    if (data.code === 200) {
      this.listLoading = false;
    }
      for (let i = 0; i < this.tableData.length; i++) {
        let tableDatas = this.tableData[i].power
        if(tableDatas == 1){
          tableDatas = '超级管理员'
        } else if(tableDatas == 2){
          tableDatas = '管理员'
        } else if(tableDatas == 3){
          tableDatas = '普通用户'
        }
        this.tableData[i].power = tableDatas
      }
       
  },
  methods: {
    async handlegetHeadTeacher() {
      let { data } = await getAllAdmin();
      this.tableData = data.data;
      if (data.code === 200) {
        this.listLoading = false;
      }
      
    },
    // 删除一项
    handleDelete(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async res => {
          let { data } = await delAdmin(id);          
          if (data.code === 200) {
            this.handlegetHeadTeacher();
            return this.$message.success(data.msg);
          }
          this.$message({
            message: data.msg,
            type: "error"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改一项
    updateClass(row,scope) {
      this.update.power = row.power;
      this.isUpdate = row._id;
      console.log(this.update.power);

      
    },
    // 取消修改
    updateClassCancel() {
      this.isUpdate = "";
    },
    // 确定修改
    async updateClassSucess(id) {
      this.update["_id"] = id;
      if (this.update.power === "") {
        return this.$message.error("更新信息中不能为空");
      }
      console.log(this.update.power);
      if(this.update.power == '管理员'){
        this.update.power = 2
      } else if(this.update.power == '普通用户'){
        this.update.power = 3
      }
      let { data } = await updateAdminPass(this.update);
      if (data.code === 2002) {
        this.$message.success(data.msg);
        this.updateClassCancel();
        this.handlegetHeadTeacher();
        this.reload()
      } else {
        this.$message.error(data.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
