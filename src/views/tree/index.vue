<template>
  <!-- 添加的显示模块 -->
  <div v-show="addshow" class="demo-input-size">
    <div class="demo-input-smallsize">
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:20px;"
      >
        <div>姓名：</div>
        <el-input v-model="newName" size="mini" placeholder="姓名" />
      </div>
      <div style="margin-left:15px;margin-top:30px;">
        <!-- 性别模块 -->
        <span style="margin-right:50px;">性别：</span>
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女">女</el-radio>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>年龄：</div>
        <el-input-number v-model="newAge" style="width:20%;height:28px;margin-right:460px;" :step="1" step-strictly :min="1" :max="100" label="当前成绩" />
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>学制：</div>
        <el-select v-model="study" size="mini" placeholder="学制">
          <el-option v-for="item in studys" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>专业：</div>
        <el-select v-model="major" size="mini" placeholder="专业">
          <el-option v-for="item in majors" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>班级：</div>
        <el-select v-model="newclass" size="mini" placeholder="班级">
          <el-option v-for="item in classs" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>市场部:</div>
        <el-select v-model="cityCenter" size="mini" placeholder="市场部">
          <el-option v-for="item in cityCenters" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>当前成绩：</div>
        <el-input-number v-model="chengji" style="width:20%;height:28px;margin-right:460px;" :step="1" step-strictly :min="0" :max="40" label="当前成绩" />
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>还差成绩：</div>
        <el-input-number v-model="Stillbad" style="width:20%;height:28px;margin-right:460px;" :step="1" step-strictly :min="0" :max="40" label="还差成绩" />
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>挂科次数：</div>
        <el-input v-model="Fail" size="mini" placeholder="挂科次数/次" />
      </div>
      <div>
        <el-button
          type="primary"
          style="width:90px;height:38px;line-height:0;margin-left:500px;margin-top:20px;"
          @click="Determine"
        >确定</el-button>
        <el-button
          type="warning"
          style="width:90px;height:38px;line-height:0;margin-left:10px;margin-top:20px;"
          @click="clearList"
        >清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入接口函数
import { getMajor, getMarketing, getClass, getStudent } from '@/api/api'

export default {
  data() {
    return {
      addshow: true, // 添加模块是否显示
      newName: '', // 姓名
      sex: '', // 性别单选框
      newAge: '', // 年龄
      study: '', // 学制选项
      major: '', // 专业选项
      newclass: '', // 班级选项
      cityCenter: '', // 市场部选项
      chengji: '', // 已有成绩
      Stillbad: '', // 还差成绩
      Fail: '', // 挂科次数
      // select中value才是选中的那个值
      // 学制选项
      studys: [
        {
          value: '一年制'
        },
        {
          value: '两年制'
        },
        {
          value: '三年制'
        }
      ],
      // 专业选项
      majors: [],
      // 班级选项
      classs: [],
      // 市场部选项
      cityCenters: []
    }
  },
  mounted() {
    this.Majors()// 专业接口调用
    this.Classs()// 班级接口调用
    this.CityCenters()// 市场部调用
  },
  methods: {
    async Majors() {
      // 获取专业
      const { data } = await getMajor()
      for (let i = 0; i < data.data.length; i++) {
        this.majors.push({
          value: data.data[i].majorname
        })
      }
    },
    async Classs() {
      // 获取班级
      const { data } = await getClass()
      for (let i = 0; i < data.data.length; i++) {
        this.classs.push({
          value: data.data[i].classname
        })
      }
    },
    async CityCenters() {
      // 获取市场部
      const { data } = await getMarketing()
      for (let i = 0; i < data.data.length; i++) {
        this.cityCenters.push({
          value: data.data[i].marketname
        })
      }
    },
    // 确定(添加学生)
    async Determine() {
      // 添加一项
      const obj = {
        name: this.newName,
        sex: this.sex,
        age: this.newAge,
        study: this.study,
        major: this.major,
        classes: this.newclass,
        citycenter: this.cityCenter,
        chengji: this.chengji,
        graduation: this.Stillbad,
        failss: this.Fail
      }
      if (/.*[\u4e00-\u9fa5]+.*$/.test(this.chengji)) {
        // 判断不带汉字的正则
        this.$message.error('成绩不必带单位!')
        return false
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.Fail)) {
        // 判断不带汉字的正则
        this.$message.error('挂科次数不必带单位!')
        return false
      } else {
        const success = await getStudent(obj)
        if (success.data.code === 201) {
          this.$message.error(success.data.msg)
        } else {
          this.newName = ''
          this.sex = ''
          this.newAge = ''
          this.study = ''
          this.major = ''
          this.newclass = ''
          this.cityCenter = ''
          this.chengji = ''
          this.Stillbad = ''
          this.Fail = ''
          this.$confirm(`${success.data.msg},是否跳转至学生列表页`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$router.push({
                name: 'All',
                params: { maxpage: success.data.maxpages }
              }) // 如果想在push里传递params参数，就必须用路由对应的name跳转
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消跳转'
              })
            })
        }
      }
    },
    // 清空信息
    clearList() {
      this.newName = ''
      this.sex = ''
      this.newAge = ''
      this.study = ''
      this.major = ''
      this.newclass = ''
      this.cityCenter = ''
      this.chengji = ''
      this.Stillbad = ''
      this.Fail = ''
    }
  }
}
</script>
<style scoped>
.demo-input-size {
  width: 100%;
  height: 650px;
  margin-top: 15px;
}
.demo-input-smallsize {
  width: 1000px;
  height: 650px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 30px;
}
.el-input--mini {
  width: 600px;
}
.el-radio {
  margin-right: 2px;
}
.el-select {
  width: 600px;
}
</style>

