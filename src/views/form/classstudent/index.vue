<template>
  <div class="top_option">
<<<<<<< HEAD
=======

>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
    <!-- 列表 -->
    <div class="table_divs">
      <el-table
        v-loading="listLoading"
        :data="all"
        style="width: 100%"
        @selection-change="selsChange"
      >
<<<<<<< HEAD
        <el-table-column :reserve-selection="true" type="selection" width="55" />
        <el-table-column prop="classes" label="班级" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="major" label="专业" />
        <el-table-column prop="citycenter" label="市场部" />
        <el-table-column prop="chengji" label="已有成绩" />
        <el-table-column prop="graduation" label="还差成绩" />
        <el-table-column prop="failss" label="挂科次数" />
        <el-table-column prop="study" label="学制" />
        <el-table-column prop="nativeplace" label="籍贯" />
        <el-table-column prop="studentID" label="学号" />
        <el-table-column label="操作" min-width="180">
=======
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="55"
        />
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
          prop="citycenter"
          label="市场部"
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
          prop="nativeplace"
          label="籍贯"
        />
        <el-table-column
          prop="studentID"
          label="学号"
        />
        <el-table-column
          label="操作"
          min-width="180"
        >
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="remove(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改 -->
<<<<<<< HEAD
      <el-dialog title="修改操作" :visible.sync="show" width="30%">
=======
      <el-dialog
        title="修改操作"
        :visible.sync="show"
        width="30%"
      >
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="班级" prop="classes">
            <el-input v-model="ruleForm.classes" />
          </el-form-item>
          <el-form-item label="已有成绩" prop="chengji">
<<<<<<< HEAD
            <el-input
              v-model="ruleForm.chengji"
              oninput="value=value.replace(/[^\d.]/g,'')"
              maxlength="2"
            />
          </el-form-item>
          <el-form-item label="还差成绩" prop="graduation">
            <el-input
              v-model="ruleForm.graduation"
              oninput="value=value.replace(/[^\d.]/g,'')"
              maxlength="2"
            />
          </el-form-item>
          <el-form-item label="挂科次数" prop="failss">
            <el-input
              v-model="ruleForm.failss"
              oninput="value=value.replace(/[^\d.]/g,'')"
              maxlength="2"
            />
=======
            <el-input v-model="ruleForm.chengji" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="2" />
          </el-form-item>
          <el-form-item label="还差成绩" prop="graduation">
            <el-input v-model="ruleForm.graduation" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="2" />
          </el-form-item>
          <el-form-item label="挂科次数" prop="failss">
            <el-input v-model="ruleForm.failss" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="2" />
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="secede('ruleForm')">取 消</el-button>
          <el-button type="primary" size="small" @click="submitForm()">修 改</el-button>
        </span>
      </el-dialog>
    </div>

    <div style="position:fixed;bottom:20px;margin-left:20px;">
      <!-- 批量删除 -->
      <template>
<<<<<<< HEAD
        <el-button
          style="margin-top:10px"
          type="danger"
          size="small"
          :disabled="this.sels.length === 0"
          @click="soamdelstudent()"
        >批量删除</el-button>
      </template>
      <!-- 批量修改 -->
      <template>
        <el-button
          style="margin-top:10px"
          type="success"
          size="small"
          :disabled="this.sels.length === 0"
        >批量修改</el-button>
=======
        <el-button style="margin-top:10px" type="danger" size="small" @click="soamdelstudent()">批量删除</el-button>
      </template>
      <!-- 批量修改 -->
      <template>
        <el-button style="margin-top:10px" type="success" size="small">批量修改</el-button>
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
      </template>
      <!-- 添加 -->
      <template>
        <el-button style="margin-top:10px" type="primary" size="small" @click="addstudent()">添加学生</el-button>
      </template>
    </div>

    <div style="position:fixed;right:50px;bottom:20px;">
      <!-- 导出 -->
<<<<<<< HEAD
      <el-button
        size="mini"
        type="success"
        round
        :loading="downloadLoading"
        @click="handleDownload"
      >导出当页excel</el-button>
      <!-- 导入 -->
      <label class="fileinp">
        <input type="button" class="btn" value="导入excel" round @click="handleInter" >
        <input
          type="file"
          class="fileinpd"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          @change="importfxx(this)"
        >
=======
      <el-button size="mini" type="success" round :loading="downloadLoading" @click="handleDownload">
        导出当页excel
      </el-button>
      <!-- 导入 -->
      <label class="fileinp">
        <input type="button" class="btn" value="导入excel" round @click="handleInter">
        <input type="file" class="fileinpd" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importfxx(this)">
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
      </label>
    </div>
  </div>
</template>

<script>
// 引入接口函数
// eslint-disable-next-line no-unused-vars
<<<<<<< HEAD
import {
  allstudent,
  updateAllstud,
  delallStudent,
  // eslint-disable-next-line no-unused-vars
  addallStudent,
  getExcel
} from '../../../api/api.js';
// eslint-disable-next-line no-unused-vars
import UploadExcel from '../../../components/UploadExcel/index';
=======
import { allstudent, updateAllstud, delallStudent, addallStudent, getExcel } from '../../../api/api.js'
// eslint-disable-next-line no-unused-vars
import UploadExcel from '../../../components/UploadExcel/index'
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
export default {
  data() {
    return {
      listLoading: true,
      downloadLoading: false,
      downloadLoading2: false,
      show: false, // 弹窗
      classes: [], // 获取所有班级
      allstudent: [], // 获取所有学生
      classstudents: [],
      getClass: [],
      all: [], // 获取班级学生
      createClass: [], // 导入
      ruleForm: {
        classes: '',
        chengji: '',
        graduation: '',
        failss: '',
        id: ''
      },
      rowlist: [], // 修改旧值
      path: '/example/tree',
      sels: [], // 选中的值显示
      checkeds: [], // 批量删除选中id
      updateShow: 100000 // 最大匹配的值
    }
  },
  async mounted() {
    const { data } = await allstudent()
    this.allstudent = data.data
    this.listLoading = false
    // 接收存储数据
    this.getClass = JSON.parse(localStorage.getItem('data'))
    for (var i = 0; i < this.allstudent.length; i++) {
      if (this.getClass === this.allstudent[i].classes) {
        this.classstudents.push(this.allstudent[i])
      }
    }
    this.all = this.classstudents
    this.classstudents = []
    console.log(this.all)
    // eslint-disable-next-line eqeqeq
    if (this.all == '') {
      return false
    }
  },
  methods: {
    async getStudata() {
      const { data } = await allstudent()
      this.all = data.data
      for (var i = 0; i < this.allstudent.length; i++) {
        if (this.getClass === this.allstudent[i].classes) {
          this.classstudents.push(this.allstudent[i])
        }
      }
      this.all = this.classstudents
      this.classstudents = []
      // console.log(this.all)
    },
    // 删除学生
    remove(id) {
      console.log(id)
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [h('span', null, '您确定要移除这个学生吗？')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
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
          // eslint-disable-next-line handle-callback-err
        })
<<<<<<< HEAD
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
=======
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '已取消删除'
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
        })
    },
    // 修改
    update(index, row) {
      console.log(row)
      this.rowlist = row
      this.show = true
      this.ruleForm.classes = row.classes
      this.ruleForm.chengji = row.chengji
      this.ruleForm.graduation = row.graduation
      this.ruleForm.failss = row.failss
      this.ruleForm.id = row._id
    },
    // 确定修改
    async submitForm() {
      // 默认值
      const obj = {
        classes: this.ruleForm.classes,
        chengji: this.ruleForm.chengji,
        graduation: this.ruleForm.graduation,
        failss: this.ruleForm.failss
      }
      const ID = this.ruleForm.id
      const { data } = await updateAllstud(ID, obj)
      // 判断值是否改变
      if (
        obj.classes === this.rowlist.classes &&
        obj.chengji === this.rowlist.chengji &&
        obj.graduation === this.rowlist.graduation &&
        obj.failss === this.rowlist.failss
      ) {
        this.$message.info('没有任何修改')
        this.show = false
      } else if (data.code === 200) {
        this.$message.success('修改成功')
        this.show = false
      } else {
        this.$message.error(data.msg)
        return false
      }
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
    // 添加
    addstudent() {
      this.$router.push({
        path: this.path // 跳转路由
      })
    },
    // 批量删除
    selsChange(sels) {
      this.sels = sels
      const all_Id = []
      for (let i = 0; i < sels.length; i++) {
        all_Id.push(sels[i]._id)
      }
      this.checkeds = all_Id
    },
    soamdelstudent() {
      this.$confirm('此操作将永久删除这几项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delallStudent(this.checkeds).then(res => {
          console.log(res.data)
          if (res.data.code === 201) {
            this.$message.error(res.data.msg)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('../../../excel/Export2Excel.js').then(excel => {
<<<<<<< HEAD
        const tHeader = [
          '班级',
          '姓名',
          '性别',
          '年龄',
          '专业',
          '市场部',
          '已有成绩',
          '还差成绩',
          '挂科次数',
          '学制',
          '籍贯',
          '学号'
        ] // excel 表头
        const filterVal = [
          'classes',
          'name',
          'sex',
          'age',
          'major',
          'citycenter',
          'chengji',
          'graduation',
          'failss',
          'study',
          'nativeplace',
          'studentID'
        ] // 获取的数据字段名
=======
        const tHeader = ['班级', '姓名', '性别', '年龄', '专业', '市场部', '已有成绩', '还差成绩', '挂科次数', '学制', '籍贯', '学号'] // excel 表头
        const filterVal = ['classes', 'name', 'sex', 'age', 'major', 'citycenter', 'chengji', 'graduation', 'failss', 'study', 'nativeplace', 'studentID'] // 获取的数据字段名
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
        const list = this.all // 所要生成Excel数据源
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    },
    handleInter() {
      this.downloadLoading2 = true
    },
    importfxx(obj) {
      const _this = this
      // eslint-disable-next-line no-unused-vars
      const inputDOM = this.$refs.inputer
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0]
      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
<<<<<<< HEAD
        var binary = '';
=======
        var binary = ''
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
        var rABS = false // 是否将文件读取为二进制字符串
        // eslint-disable-next-line no-unused-vars
        var pt = this
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
<<<<<<< HEAD
          }
          var XLSX = require('xlsx')
          if (rABS) {
            // eslint-disable-next-line no-undef
            wb = XLSX.read(btoa(fixdata(binary)), {
              // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // outdata就是你想要的东西
          this.da = [...outdata]
          const arr = []
          this.da.map(v => {
            const obj = {}
            obj.classes = v.班级
            obj.name = v.姓名
            obj.sex = v.性别
            obj.age = v.年龄
            obj.major = v.专业
            obj.citycenter = v.市场部
            obj.chengji = v.已有成绩
            obj.graduation = v.还差成绩
            obj.failss = v.挂科次数
            obj.study = v.学制
            obj.nativeplace = v.籍贯
            obj.studentID = v.学号
            arr.push(obj)
          })
          console.log(arr)
          getExcel(arr).then(res => {
            // eslint-disable-next-line no-empty
            if (res.data.code === 201) {
              // eslint-disable-next-line no-empty
            } else {
            }
          })
          // eslint-disable-next-line no-unused-vars
          const para = {
            withList: arr
          }
=======
          }
          var XLSX = require('xlsx')
          if (rABS) {
            // eslint-disable-next-line no-undef
            wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // outdata就是你想要的东西
          this.da = [...outdata]
          const arr = []
          this.da.map(v => {
            const obj = {}
            obj.classes = v.班级
            obj.name = v.姓名
            obj.sex = v.性别
            obj.age = v.年龄
            obj.major = v.专业
            obj.citycenter = v.市场部
            obj.chengji = v.已有成绩
            obj.graduation = v.还差成绩
            obj.failss = v.挂科次数
            obj.study = v.学制
            obj.nativeplace = v.籍贯
            obj.studentID = v.学号
            arr.push(obj)
          })
          console.log(arr)
          getExcel(arr).then(res => {
            // eslint-disable-next-line no-empty
            if (res.data.code === 201) {

              // eslint-disable-next-line no-empty
            } else {
            }
          })
          // eslint-disable-next-line no-unused-vars
          const para = {
            QwithList: arr
          }
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
          _this.$message({
            message: '请耐心等待导入成功',
            type: 'success'
          })
          window.location.reload()
<<<<<<< HEAD
        };
        reader.readAsArrayBuffer(f)
      };
=======
        }
        reader.readAsArrayBuffer(f)
      }
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    }
  }
}
</script>

<style scoped>
<<<<<<< HEAD
@import "./asset.scss";
=======
   @import "./asset.scss"
>>>>>>> 869d48dbf3fda4f91a44b5b033f267b0a56c90c1
</style>
