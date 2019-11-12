<template>
  <div class="top_option">

    <el-select v-model="value" class="why_select" @change="op_click">
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
      />
    </el-select>

    <div class="optionclass">
      <el-form :inline="true" :data="onSubmit" :model="searchClassdata" class="demo-form-inline">
        <el-form-item style="width:14.24%" label="">
          <el-input v-model="searchClassdata.classname" placeholder="班级名称"></el-input>
        </el-form-item>
        <el-form-item style="width:14.24%" label="" required>
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="searchClassdata.createDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item style="width:14.24%" label="">
          <el-select v-model="searchClassdata.major" placeholder="专业">
            <el-option label="Web架构" value="Web架构"></el-option>
            <el-option label="UI设计" value="UI设计"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:14.24%" label="">
          <el-input v-model="searchClassdata.lecturer" placeholder="讲师"></el-input>
        </el-form-item>
        <el-form-item style="width:14.24%" label="">
          <el-input v-model="searchClassdata.headteacher" placeholder="班主任"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">查 询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:7px" type="success" size="mini" v-if="play" @click="returndata">返 回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table_div">
      <el-table
        v-loading="listLoading"
        :data="classes"
        style="width: 100%"
      >
        <el-table-column
          prop="classname"
          label="班级名称"
        />
        <el-table-column
          prop="createDate"
          label="创建日期"
        />
        <el-table-column
          prop="major"
          label="专业"
        />
        <el-table-column
          prop="lecturer"
          label="讲师"
        />
        <el-table-column
          prop="headteacher"
          label="班主任"
        />
        <el-table-column
          label="班级成员"
        >
        <template slot-scope="scope">
          <span class="go_student" @click="member(scope.row)">详 情</span>
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.$index, scope.row)">修 改</el-button>
            <el-button type="danger" size="mini" @click="remove(scope.row,scope.row._id)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="修改操作"
        :visible.sync="show"
        width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="讲师" prop="lecturer">
            <el-input v-model="ruleForm.lecturer"></el-input>
          </el-form-item>
          <el-form-item label="班主任" prop="headteacher">
            <el-input v-model="ruleForm.headteacher"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="secede('ruleForm')">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm()">修 改</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog
      title="转移学生"
      :visible.sync="zyStu"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="zyStu = false">取 消</el-button>
        <el-button type="primary" @click="zyStu = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口函数
import { getClass, delClass, updateClass, allstudent,searchClass } from '../../api/api.js'
export default {
  data() {
    return {
      zyStu : false,
      listLoading: true,
      show: false, // 弹窗
      classes: [], // 获取所有班级
      allstudent:[], //获取所有学生
      classstudents:[],
      options: [{
        value: '全部班级',
        label: '全部班级'
      }, {
        value: 'WEB架构',
        label: 'WEB架构'
      }, {
        value: '视觉设计',
        label: '视觉设计'
      }],
      value: '全部班级',
      path: '/form/classstudent',
      ruleForm: {
        lecturer:"",
        headteacher:"",
        id:""
      },
      rules: {
        lecturer: [
          { required: true, message: '请输入讲师', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        headteacher: [
          { required: true, message: '请输入班主任', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      rowlist:[], //修改旧值
      searchClass:[],
      list:[],
      all:[],
      searchClassdata:{
        classname: '',
        // createDate:'',
        // major:'',
        // lecturer:'',
        // headteacher:''
      }, //查询
      play: false
    }
  },
  async mounted() {
    const { data } = await getClass()
    this.classes = data.data
    this.listLoading = false
  },
  methods: {
    async handlegetHeadTeacher() {
      const { data } = await getClass()
      this.classes = data.data
      if (data.code === 200) {
        this.listLoading = false
      }
    },
    // 删除用户
    async remove(e,id) {
      const { data } = await allstudent()
      this.allstudent = data.data
      const classstudents = this.classstudents
      for(var i = 0;i<this.allstudent.length;i++){
        if(e.classname === this.allstudent[i].classes){
          classstudents.push(this.allstudent[i])
        }
      }
      this.allstudent = classstudents
      localStorage.setItem("datas",JSON.stringify(this.allstudent))
      this.all = JSON.parse(localStorage.getItem('datas'));
      console.log(this.all)
      // 判断班里是否有学生
      if(this.all[0]){
        // 若有学生，转移学生
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '删除班级前请先转移学生')
          ]),
          showCancelButton: true,
          confirmButtonText: '转移',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          console.log(1)
          this.zyStu = true


        }).catch(err => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        this.classstudents = []
      }else{
        // 若没有学生,直接删除
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您确定要移除这个班吗？')
          ]),
          showCancelButton: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          const { data } = await delClass(id)
          console.log(data)
          if (data.code === 200) {
            this.handlegetHeadTeacher()
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
      }
      
    },
    // 班级成员
    async member(e) {
      const { data } = await allstudent()
      this.allstudent = data.data
      const classstudents = this.classstudents
      for(var i = 0;i<this.allstudent.length;i++){
        if(e.classname === this.allstudent[i].classes){
          classstudents.push(this.allstudent[i])
        }
      }
      this.allstudent = classstudents
      localStorage.setItem("data",JSON.stringify(this.allstudent))
      this.$router.push({
        path: this.path, // 跳转路由
      })
    },
    // 选择专业
    async op_click(vel) {
      const { data } = await getClass()
      this.classes = data.data
      // 筛选专业
      var list = []
      for (var i = 0; i < this.classes.length; i++) {
        if (this.classes[i].major === vel || vel === '全部班级') {
          list.push(this.classes[i])
        }
      }
      this.classes = list
    },
    // 修改
    update(index, row) {
      console.log(row)
      this.rowlist = row;
      this.show = true;
      this.ruleForm.lecturer = row.lecturer;
      this.ruleForm.headteacher = row.headteacher;
      this.ruleForm.id = row._id;
    },
    // 确定修改
    async submitForm() {
      let obj = {
        _id:this.ruleForm.id,
        lecturer:this.ruleForm.lecturer,
        headteacher:this.ruleForm.headteacher
      }
      console.log(obj)
      let { data } = await updateClass(obj);
      if(
        obj.lecturer === this.rowlist.lecturer &&
        obj.headteacher === this.rowlist.headteacher
      ){
        this.$message.success('没有任何修改')
        this.show = false;
      }
      else if (data.code === 200) {
        this.handlegetHeadTeacher()
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
    async onSubmit() {
      let { data } = await searchClass(this.searchClassdata);
      const classes = data.data
      console.log(classes)
      if(this.searchClassdata.classname === "" || this.searchClassdata.createDate === "" || this.searchClassdata.major === "" || this.searchClassdata.lecturer === "" || this.searchClassdata.headteacher === ""){
        this.play = false
        return false
      }
      this.classes = classes
      console.log(this.classes)
      this.play = true
    },
    // 返回
    async returndata(){
      // this.searchClassdata.classname = ""
      // this.searchClassdata.createDate = ""
      // this.searchClassdata.major = ""
      // this.searchClassdata.lecturer = ""
      // this.searchClassdata.headteacher = ""
      const { data } = await getClass()
      this.list = data.data
      this.classes = this.list
      this.play = false
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  }
}
</script>

<style scoped>
   @import "./asset.scss";
</style>

