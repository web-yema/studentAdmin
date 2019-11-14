<template>
  <div style="padding:30px;">
    <el-alert :closable="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="ruleForm.age" :min="1" :max="100" label="请输入年龄" />
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-select v-model="ruleForm.college" placeholder="请选择学院">
            <el-option label="数字媒体学院" value="数字媒体学院" />
            <el-option label="软工学院" value="软工学院" />
            <el-option label="建工学院" value="建工学院" />
            <el-option label="移动学院" value="移动学院" />
            <el-option label="大数据学院" value="大数据学院" />
            <el-option label="计算机学院" value="计算机学院" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select v-model="ruleForm.major" placeholder="请选择专业">
            <el-option v-for="item in major" :key="item._id" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input v-model="ruleForm.job" />
        </el-form-item>
        <el-form-item label="入职时间" required>
          <el-col :span="11">
            <el-form-item prop="time">
              <el-date-picker v-model="ruleForm.time" type="date" placeholder="日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm'), btn">确定</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-form>
    </el-alert>
  </div>
</template>

<script>
import { addTeacher, getMajor } from '../../../api/headAll'
export default {
  data() {
    return {
      ruleForm: {
        name: '', // 姓名
        age: 1, // 年龄
        college: '', // 学院
        time: '', // 入职时间
        job: '', // 职业
        sex: '' // 性别
      },
      major: [], // 专业
      rules: {
        // 姓名
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        // 年龄
        age: [
          { required: true, message: '请输入年龄', trigger: 'change' }
        ],
        // 学院
        college: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        // 时间
        time: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        // 职位
        job: [
          { required: true, message: '请输入职位', trigger: 'change' }
        ],
        // 性别
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        // 专业
        major: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getmajor()
  },
  methods: {
    btn() {
      // 入职时间格式
      return new Date(this.ruleForm.time).getFullYear() + '-' + (new Date(this.ruleForm.time).getMonth() + 1) + '-' + new Date(this.ruleForm.time).getDate()
    },
    // 添加讲师
    async submitForm(formName) {
      const person = {
        lecturername: this.ruleForm.name,
        lecturerage: this.ruleForm.age,
        lecturersex: this.ruleForm.sex,
        college: this.ruleForm.college,
        entryDate: this.btn(),
        position: this.ruleForm.job,
        major: this.ruleForm.major
      }
      // 获取所有讲师
      const { data } = await addTeacher(person)
      // 判断如果所填项是否为空或为空格，提示用户提交信息中存在空项
      if (person.lecturername.trim() === '' || person.lecturersex === '' || person.college === '' || person.major === '' || person.lecturerage === '' || person.entryDate === '' || person.position.trim() === '') {
        return this.$message.error('提交信息中存在空项!')
      } else if (data.code === 200) {
        // 判度code码如果为200，提示用户添加成功，并清空信息
        this.$message.success(data.message)
        this.$refs[formName].resetFields()
      } else if (data.code === 203) {
        // 判断code码如果为203，提示用户该讲师已经存在，并清空信息
        this.$message.error(data.message)
        this.$refs[formName].resetFields()
        return false
      }
    },
    // 清空信息
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取专业
    async getmajor() {
      const { data } = await getMajor()
      for (let i = 0; i < data.data.length; i++) {
        this.major.push({
          value: data.data[i].majorname
        })
      }
    }
  }
}
</script>
