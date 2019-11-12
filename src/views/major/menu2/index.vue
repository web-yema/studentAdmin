<template>
  <div style="padding:30px;">
    <el-alert :closable="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="专业" prop="major">
          <el-input v-model="ruleForm.major" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-form>
    </el-alert>
  </div>
</template>

<script>
import { addMajor } from '../../../api/headAll'
export default {
  data() {
    return {
      ruleForm: {
        major: '' // 专业
      },
      rules: {
        // 专业
        major: [
          { required: true, message: '请输入专业', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 添加讲师
    async submitForm(formName) {
      const person = {
        majorname: this.ruleForm.major
      }
      const { data } = await addMajor(person)
      // 判断如果所填项是否为空或为空格，提示用户提交信息中存在空项
      if (person.majorname.trim() === '') {
        return this.$message.error('提交信息中存在空项!')
      } else if (data.code === 200) {
        // 判度code码如果为200，提示用户添加成功，并清空信息
        this.$message.success(data.message)
        this.$refs[formName].resetFields()
      } else if (data.code === 203) {
        // 判度code码如果为203，提示用户该专业已经存在，并清空信息
        this.$message.error(data.message)
        this.$refs[formName].resetFields()
        return false
      }
    },
    // 清空信息
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
