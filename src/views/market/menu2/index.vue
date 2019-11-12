<template>
  <div style="padding:30px;">
    <el-alert :closable="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="市场部名称" prop="name">
          <el-input v-model="ruleForm.name" />
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
import { addMarket } from '../../../api/headAll'
export default {
  data() {
    return {
      ruleForm: {
        name: '' // 市场部名称
      },
      rules: {
        // 判断添加市场部名称格式
        name: [
          { required: true, message: '请输入市场部名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确定
    async submitForm(formName) {
      const marketname = {
        marketname: this.ruleForm.name
      }
      // 获取市场部信息
      const { data } = await addMarket(marketname)
      // 判断如果填写空格，就提示用户提交信息中存在空项
      if (marketname.marketname.trim() === '') {
        return this.$message.error('提交信息中存在空项!')
      } else if (data.code === 200) {
        // 如果code码为200时，提示用户添加成功，并清空信息
        this.$message.success(data.message)
        this.$refs[formName].resetFields()
      } else if (data.code === 203) {
        // 如果code码为203时，提示用户该讲师已经存在，清空信息
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
