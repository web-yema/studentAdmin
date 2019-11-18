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

    <div class="table_div">
      <el-table v-loading="listLoading" :data="classes" style="width: 100%">
        <el-table-column prop="classname" label="班级名称" />
        <el-table-column prop="createDate" label="创建日期" />
        <el-table-column prop="major" label="专业" />
        <el-table-column prop="lecturer" label="讲师" />
        <el-table-column prop="headteacher" label="班主任" />
        <el-table-column label="班级成员">
          <template slot-scope="scope">
            <span class="go_student" @click="member(scope.row)">详 情</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.$index, scope.row)">修 改</el-button>
            <el-button type="danger" size="mini" @click="remove(scope.row,scope.row._id)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-dialog title="修改操作" :visible.sync="show" width="30%">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="讲师" prop="lecturer">
            <el-input v-model="ruleForm.lecturer" />
          </el-form-item>
          <el-form-item label="班主任" prop="headteacher">
            <el-input v-model="ruleForm.headteacher" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="secede('ruleForm')">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm()">修 改</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 转移学生 -->
    <el-dialog
      class="allstulog"
      title="转移学生"
      :visible.sync="zyStu"
      width="30%"
      :before-close="handleClose"
    >
      <el-table
        ref="multipleTable"
        highlight-current-row
        class="allstutab"
        :data="all"
        height="300"
        style="width: 100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <div style="height:100%">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="chengji" label="成绩">
          <template slot-scope="scope">
            <div>{{ scope.row.chengji }}</div>
          </template>
        </el-table-column>
      </el-table>
      <p class="allp">转移到</p>

      <div style="position:relative">
        <el-select
          v-model="value1"
          style="padding-left:10px"
          filterable
          placeholder="请选择"
          @change="changeClass"
        >
          <el-option
            v-for="item in classes"
            :key="item._id"
            :label="item.classname"
            :value="item.classname"
            :disabled="item.disabled"
          />
        </el-select>
        <br >
        <el-button
          style="margin:0px 10px;width:92%;position:absolute;bottom:0;"
          type="primary"
          @click="zyStus"
        >转移</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="zyStu = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口函数
import {
  getClass,
  delClass,
  updateClass,
  allstudent,
  getUpdate
} from '../../api/api.js';
export default {
  data() {
    return {
      zyStu: false,
      listLoading: true,
      show: false, // 弹窗
      classes: [], // 获取所有班级
      allstudent: [], // 获取所有学生
      classstudents: [],
      expands: [], // 要展开的行，数值的元素是row的key值
      xzmajor: '', // 选择专业
      options: [
        {
          value: '全部班级',
          label: '全部班级'
        },
        {
          value: 'WEB架构',
          label: 'WEB架构'
        },
        {
          value: '视觉设计',
          label: '视觉设计'
        }
      ],
      value: '全部班级',
      value1: '全部班级',
      path: '/form/classstudent',
      ruleForm: {
        lecturer: '',
        headteacher: '',
        id: ''
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
      rowlist: [], // 修改旧值
      all: [], // 班级内的学生
      zystuclass: [], // 转移学生
      play: false, // 控制显示隐藏
      changeStuClass: '', // 转移选择班级
      zyStuId: '', // 学生id
      multipleSelection: '',
      currentRow: null
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
    // 删除班级
    async remove(e, id) {
      const { data } = await allstudent()
      this.allstudent = data.data
      const classstudents = this.classstudents
      for (var i = 0; i < this.allstudent.length; i++) {
        if (e.classname === this.allstudent[i].classes) {
          classstudents.push(this.allstudent[i])
        }
      }
      this.allstudent = classstudents
      localStorage.setItem('datas', JSON.stringify(this.allstudent))
      this.all = JSON.parse(localStorage.getItem('datas'))
      console.log(this.all)
      // 判断班里是否有学生
      if (this.all[0]) {
        // 若有学生，转移学生
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [h('span', null, '删除班级前请先转移学生')]),
          showCancelButton: true,
          confirmButtonText: '转移',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async res => {
            this.zyStu = true
            // eslint-disable-next-line handle-callback-err
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        this.classstudents = []
      } else {
        // 若没有学生,直接删除
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [h('span', null, '您确定要移除这个班吗？')]),
          showCancelButton: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async res => {
            const { data } = await delClass(id)
            console.log(data)
            if (data.code === 200) {
              this.handlegetHeadTeacher()
              this.op_click(this.xzmajor)
              return this.$message.success(data.msg)
            }
            this.$message({
              message: data.msg,
              type: 'error'
            })
            // eslint-disable-next-line handle-callback-err
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 班级成员
    async member(e) {
      localStorage.setItem('data', JSON.stringify(e.classname))
      this.$router.push({
        path: this.path // 跳转路由
      })
    },
    // 选择专业
    async op_click(vel) {
      this.xzmajor = vel
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
      console.log(this.classes)
    },
    // 修改
    update(index, row) {
      console.log(row)
      this.rowlist = row
      this.show = true
      this.ruleForm.lecturer = row.lecturer
      this.ruleForm.headteacher = row.headteacher
      this.ruleForm.id = row._id
    },
    // 确定修改
    async submitForm() {
      const obj = {
        _id: this.ruleForm.id,
        lecturer: this.ruleForm.lecturer,
        headteacher: this.ruleForm.headteacher
      }
      console.log(obj)
      const { data } = await updateClass(obj)
      if (
        obj.lecturer === this.rowlist.lecturer &&
        obj.headteacher === this.rowlist.headteacher
      ) {
        this.$message.success('没有任何修改')
        this.show = false
      } else if (data.code === 200) {
        this.handlegetHeadTeacher()
        this.$message.success('修改成功')
        this.show = false
      } else {
        this.$message.error(data.msg)
        return false
      }
      this.op_click(this.xzmajor)
    },
    // 取消修改
    secede(formName) {
      this.$refs[formName].resetFields()
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.show = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 表格项
    handleCurrentChange(rows) {
      console.log(rows)
      this.zyStuId = rows
    },
    // 选择的班级
    changeClass(vel) {
      this.changeStuClass = vel
      console.log(this.classes)
    },
    // 点击转移
    async zyStus() {
      if (this.zyStuId === '') {
        this.$message({
          type: 'info',
          message: '请选择学生'
        })
        return false
      }
      if (this.changeStuClass === '') {
        this.$message({
          type: 'info',
          message: '请选择班级'
        })
        return false
      }
      const obj = {
        classes: this.changeStuClass
      }
      const _id = this.zyStuId._id
      const success = await getUpdate(_id, obj)
      if (success.data.code === 200) {
        const { data } = await allstudent()
        this.allstudent = data.data
        if (this.all[0].classes === this.changeStuClass) {
          this.$message({
            type: 'info',
            message: '不能转移到本班'
          })
          return false
        } else {
          var num = this.all.indexOf(this.zyStuId)
          this.all.splice(num, 1)
          this.$message.success('转移成功！')
          this.zyStuId = '';
        }
      }
      this.op_click(this.xzmajor)
    }
  }
}
</script>

<style scoped>
@import "./asset.scss";
</style>

