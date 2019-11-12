<template>
  <div class="top_option">
    <!-- 查询 -->
    <div class="optionclass">
      <el-form :inline="true" :data="onSubmit" :model="searchStudentdata" class="demo-form-inline">
        <el-form-item style="width:10.48%" label="">
          <el-input :disabled="true" v-model="searchStudentdata.classes" placeholder="班级名称"></el-input>
        </el-form-item>
        <el-form-item style="width:12.25%" label="">
          <el-input v-model="searchStudentdata.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item style="width:12.25%" label="">
          <el-input v-model="searchStudentdata.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item style="width:12.25%" label="">
          <el-input v-model="searchStudentdata.chengji" placeholder="已有成绩"></el-input>
        </el-form-item>
        <el-form-item style="width:12.25%" label="">
          <el-input v-model="searchStudentdata.graduation" placeholder="还差成绩"></el-input>
        </el-form-item>
        <el-form-item style="width:12.25%" label="">
          <el-input v-model="searchStudentdata.failss" placeholder="挂科次数"></el-input>
        </el-form-item>
        <el-form-item style="width:12.25%" label="">
          <el-input v-model="searchStudentdata.study" placeholder="学制"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="table_divs">
      <el-table
        v-loading="listLoading"
        :data="all"
        style="width: 100%"
        @selection-change="selsChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="classes"
          label="班级"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="sex"
          label="性别"
        />
        <el-table-column
          prop="age"
          label="年龄"
        />
        <el-table-column
          prop="major"
          label="专业"
        />
        <el-table-column
          prop="chengji"
          label="已有成绩"
        />
        <el-table-column
          prop="graduation"
          label="还差成绩"
        />
        <el-table-column
          prop="failss"
          label="挂科次数"
        />
        <el-table-column
          prop="study"
          label="学制"
        />
        <el-table-column
          label="操作"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="remove(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改 -->
      <el-dialog
        title="修改操作"
        :visible.sync="show"
        width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="班级" prop="classes">
            <el-input v-model="ruleForm.classes"></el-input>
          </el-form-item>
          <el-form-item label="已有成绩" prop="chengji">
            <el-input v-model="ruleForm.chengji"></el-input>
          </el-form-item>
          <el-form-item label="还差成绩" prop="graduation">
            <el-input v-model="ruleForm.graduation"></el-input>
          </el-form-item>
          <el-form-item label="挂科次数" prop="failss">
            <el-input v-model="ruleForm.failss"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="secede('ruleForm')">取 消</el-button>
          <el-button type="primary" size="small" @click="submitForm()">修 改</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 批量删除 -->
    <template>
      <el-button style="margin-top:10px" type="danger" size="small" @click="soamdelstudent()" :disabled="this.sels.length === 0">批量删除</el-button>
    </template>
    <!-- 添加 -->
    <template>
      <el-button style="margin-top:10px" type="primary" size="small" @click="addstudent()">添加学生</el-button>
    </template>
  </div>
</template>

<script>
// 引入接口函数
import { allstudent, updateAllstud, delallStudent, addallStudent } from '../../../api/api.js'
export default {
  data() {
    return {
      listLoading: true,
      show: false, // 弹窗
      classes: [], // 获取所有班级
      allstudent:[], //获取所有学生
      classstudents:[],
      all:[], //获取班级学生
      ruleForm: {
        classes:"",
        chengji:"",
        graduation:"",
        failss:"",
        id:""
      },
      rules: {
        classes: [
          { required: true, message: '请输入班级', trigger: 'blur' },
          { min: 5, max: 5, message: '输入错误', trigger: 'blur' }
        ],
        chengji: [
          { required: true, message: '请输入已有成绩', trigger: 'blur' },
          { min: 1, max: 5, message: '输入错误', trigger: 'blur' }
        ],
        graduation:[
          { required: true, message: '请输入还差成绩', trigger: 'blur' },
          { min: 1, max: 5, message: '输入错误', trigger: 'blur' }
        ],
        failss:[
          { required: true, message: '请输入挂科次数', trigger: 'blur' },
          { min: 1, max: 3, message: '输入错误', trigger: 'blur' }
        ]
      },
      rowlist:[], //修改旧值
      search:"", //查询
      formInline: {
        classname: '',
        createDate: '',
        major: '',
        lecturer: '',
        headteacher: ''
      },
      searchStudentdata:{
        classname: '',
        
      },
      path:"/example/tree",
      sels: [],//选中的值显示
    }
  },
  async mounted() {
    const { data } = await allstudent()
    this.allstudent = data.data
    this.listLoading = false
    // 接收存储数据
    this.all = JSON.parse(localStorage.getItem('data'));
    if(this.all == ""){
      return false
    }
    this.searchStudentdata.classes = this.all[0].classes
    console.log(this.all)
  },
  methods: {
    async getStudata() {
      this.all = JSON.parse(localStorage.getItem('data'));
    },
    // 删除学生
    remove(id) {
      console.log(id)
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '您确定要移除这个学生吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async res => {
        const { data } = await delallStudent(id)
        console.log(data)
        if (data.code === 200) {
          this.getStudata()
          return this.$message.success(data.msg)
        }
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改
    update(index, row) {
      // console.log(row)
      this.rowlist = row;
      this.show = true;
      this.ruleForm.classes = row.classes;
      this.ruleForm.chengji = row.chengji;
      this.ruleForm.graduation = row.graduation;
      this.ruleForm.failss = row.failss;
      this.ruleForm.id = row._id;
    },
    // 确定修改
    async submitForm() {
      // 默认值
      let obj = {
        classes:this.ruleForm.classes,
        chengji:this.ruleForm.chengji,
        graduation:this.ruleForm.graduation,
        failss:this.ruleForm.failss
      }
      let ID = this.ruleForm.id
      console.log(ID)
      // console.log(obj)
      // console.log(this.rowlist)
      let { data } = await updateAllstud(obj,ID);
      console.log(data.code)
      // 判断值是否改变
      if(
        obj.classes === this.rowlist.classes &&
        obj.chengji === this.rowlist.chengji &&
        obj.graduation === this.rowlist.graduation &&
        obj.failss === this.rowlist.failss
      ){
        this.$message.success('没有任何修改')
        this.show = false;
      }
      else if (data.code === 200) {
        console.log(obj)
        this.getStudata()
        this.$message.success("修改成功")
        this.show = false;
      }
      else {
        this.$message.error(data.msg);
        return false;
      }
    },
    // 取消修改
    secede(formName) {
      this.$refs[formName].resetFields();
      this.$message({
        type: 'info',
        message: '已取消修改'

      })
      this.show = false;
    },
    // 查询
    onSubmit() {
      console.log('submit!');
    },
    // 添加
    addstudent(){
      this.$router.push({
        path: this.path, // 跳转路由
      })
    },
    selsChange(sels) {
      this.sels = sels
    },
    soamdelstudent() {
      let path = this.sels.map(item => item.path).join()//获取所有选中行的path组成的字符串，以逗号分隔
      console.log(path)
      this.$confirm('此操作将永久删除该文件及其子文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.all({paths:path}).then(result => {
          let {data} = result
          console.log("批量删除")
          let flag = this.$config.executeResult(data)
          if (flag) {
            this.$message.success("ok")
            this.$emit('reloadTree')
          }
        })
      })
    } 
  }
}
</script>

<style scoped>
   @import "./asset.scss";
</style>
