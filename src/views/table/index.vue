<template>
  <div>
    <!-- 查询模块 -->
    <div v-show="searchShow===1" class="searchbox-bs-002">
      <li>
        <el-input v-model="search.serName" size="mini" placeholder="姓名" />
      </li>
      <li>
        <el-select v-model="search.serStudy" size="mini" placeholder="学制">
          <el-option v-for="item in upstudys" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </li>
      <li>
        <el-select v-model="search.serMajor" size="mini" placeholder="专业">
          <el-option v-for="item in upmajors" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </li>
      <li>
        <el-select v-model="search.serClasses" size="mini" placeholder="班级">
          <el-option v-for="item in upclasses" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </li>
      <li>
        <el-select v-model="search.sercityCenter" size="mini" placeholder="市场部">
          <el-option v-for="item in upcityCenters" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </li>
      <li>
        <el-input v-model="search.serchengji" size="mini" placeholder="当前成绩" />
      </li>
      <li>
        <el-input v-model="search.sergraduation" size="mini" placeholder="还差成绩" />
      </li>
      <li>
        <el-select v-model="search.serFailss" size="mini" placeholder="挂科次数">
          <el-option v-for="item in searFail" :key="item.value" size="mini" :value="item.value" />
        </el-select>
      </li>
      <li style="display:flex;">
        <el-button size="small" type="success" @click="searchAll">确定</el-button>
        <el-button size="small" type="info" @click="searchQ">清空</el-button>
      </li>
    </div>
    <!-- 显示模块 -->
    <div style="margin-left:95%;">
      <el-button size="small" type="text" @click="chekout">{{ chekShow?'取消':'批量删除' }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 150%"
      @selection-change="checks"
    >
      <!--@select-all='checkall' === > 选中当前页全部的时候触发的函数-->
      <el-table-column v-if="chekShow" :reserve-selection="true" type="selection" width="80" />
      <!-- 这里用v-if不能用v-show -->
      <!-- 多选框 -->
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="upname"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow" style="display:flex;">
            <el-radio v-model="upsex" label="男">男</el-radio>
            <el-radio v-model="upsex" style="margin-left:-15px;" label="女">女</el-radio>
          </div>
          <div v-else>{{ tableData[scope.$index].sex }}</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-input
              v-if="scope.$index===updateShow"
              v-model="upage"
              size="mini"
              placeholder="请输入内容"
            />
          </div>
          <div v-else>{{ tableData[scope.$index].age }}</div>
        </template>
      </el-table-column>
      <el-table-column label="学制">
        <template slot-scope="scope">
          <div>{{ tableData[scope.$index].study }}</div>
        </template>
      </el-table-column>
      <el-table-column label="专业">
        <template slot-scope="scope">
          <div>{{ tableData[scope.$index].major }}</div>
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upclass" size="mini" placeholder="班级">
              <el-option v-for="item in upclasses" :key="item" size="mini" :value="item" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].classes }}</div>
        </template>
      </el-table-column>
      <el-table-column label="市场部">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upcityCenter" size="mini" placeholder="市场部">
              <el-option v-for="item in upcityCenters" :key="item" size="mini" :value="item" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].citycenter }}</div>
        </template>
      </el-table-column>
      <el-table-column label="当前成绩">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="upchengji"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].chengji }}</div>
        </template>
      </el-table-column>
      <el-table-column label="还差成绩">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="upgraduation"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].graduation }}</div>
        </template>
      </el-table-column>
      <el-table-column label="挂科次数/次">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="upFail"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].failss }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">操作</template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="modify(scope,scope.$index,tableData[scope.$index]._id)">修改</el-button>
          <!--弹出框-->
          <el-dialog
            title="修改学生信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <div>
              专业:<el-input v-model="input1" placeholder="请输入专业" />
              班级:<el-input v-model="input2" placeholder="请输入班级" />
              当前成绩:<el-input v-model="input3" placeholder="请输入当前成绩" />
              还差成绩:<el-input v-model="input4" placeholder="请输入还差成绩" />
              挂科次数:<el-input v-model="input5" placeholder="请输入挂科次数" />
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ok">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button v-if="searchShow===1" type="primary" size="small" @click="quxiaoSearch">返回</el-button>
          <el-button v-else type="success" size="small" @click="searchshow">查询</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="scope.$index===updateShow"
            size="mini"
            type="primary"
          >确定</el-button>
          <el-button
            v-else
            size="mini"
            type="danger"
            style="margin-top:3px;"
            @click="deleteIndividual(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量删除按钮 -->
    <div v-show="chekShow" style="margin-top:20px;margin-left:5px;">
      <el-button size="big" type="danger" @click="pilDelete">批量删除</el-button>
    </div>
    <!-- 分页模块 -->
    <el-pagination
      v-show="pageShow"
      style="position:absolute;top:520px;"
      :current-page="currentPage"
      @current-change="current_change"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
    <div style="position:absolute;right:0;top:520px;right:10px;">
      <el-button size="mini" type="warning" round @click="excelShow">{{ excelshow?"取消导入":"导入excel" }}</el-button>
      <el-button
        size="mini"
        :loading="exportLodding"
        type="success"
        round
        @click="outExcel"
      >导出当页excel</el-button>
    </div>
    <!-- 导入Excel模块 -->
    <div v-show="excelshow" class="app-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getList } from '@/api/table'
=======
// 引入接口函数
import {
  getUpdate, // 修改学生信息
  delAllStudent, // 删除学生
  selectAllstud, // 查询学生信息
  getPage, // 分页和学生
  getMajor, // 获取所有专业
  getMarketing, // 获取所有市场部
  getClass, // 获取所有班级
  getExcel // 获取excel表
} from '../../api/api.js'

//引入vuex
import { mapGetters } from "vuex";

import UploadExcelComponent from '../../components/UploadExcel/index'

>>>>>>> f29887c0981d9415b15f9c6e22496267f99f7fb0
export default {
  name: 'UploadExcel',
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      input1: '', // 弹框里的专业状态
      input2: '', // 弹框里的班级状态
      input3: '', // 弹框里的当前成绩状态
      input4: '', // 弹框里的还差成绩状态
      input5: '', // 弹框里的挂科次数状态
      exportLodding: false,
      dialogVisible: false, // 弹出框状态
      listLoading: false, //  加载状态
      excelshow: false, //  导入Excel模块是否显示
      tableData: [], //  所有学生数据v
      searchShow: 2, //  搜索模块是否显示 不为1就是不显示
      //  ·················································· 分页数据
      total: 8, //  数据总条数，默认给1
      pageSize: 7, //  每页展示条数 用来让total进行切割，算出来一共的页数
      currentPage: 1, //  当前在第几页,默认在第一页
      updateShow: 100000, //  当前展示的修改弹出项，给这么大是为了一开始谁也匹配不到
      pageShow: true, //  分页是否显示
      daochuexcel: false, //  在导出excel的时候需要进行的判断，判断当你是搜索状态时为true(点击了搜索按钮才为true)才能导出
      search: {
        //  搜索的v-model绑定值
        serName: '', // 姓名
        serStudy: '', // 学制
        serMajor: '', // 专业
        serClasses: '', // 班级
        sercityCenter: '', // 市场部
        serchengji: '', // 当前成绩
        sergraduation: '', // 还差成绩
        serFailss: '' // 挂科次数
      },
      upstudys: [
        // 学制选项
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
      upmajors: [], // 专业选项
      upclasses: [], // 班级选项
      upcityCenters: [], // 市场部选项
      searFail: [
        //  搜索挂科次数选项
        {
          value: '0次'
        },
        {
          value: '1次'
        },
        {
          value: '2次'
        },
        {
          value: '3次及以上'
        }
      ],
      checkeds: [], // 批量删除中存放每一项_id的容器
      chekShow: false, // 多选框(批量删除)是否显示
      index: 0, // 学生的下标
      id: '' // 学生的id值
    }
  },
  mounted() {
    this.getPage(this.currentPage) // 分页加学生接口调用
    this.Majors() // 专业接口调用
    this.Classs() // 班级接口调用
    this.CityCenters() // 市场部调用
  },
  methods: {
    // 分页加学生接口调用
    async getPage(page){
      let { data } =  await getPage(page)
      this.tableData = data.data
      this.total = data.total
    },
    async Majors() {
      // 获取专业
      const { data } = await getMajor()
      for (let i = 0; i < data.data.length; i++) {
        this.upmajors.push({
          value: data.data[i].majorname
        })
      }
    },
    async Classs() {
      // 获取班级
      const { data } = await getClass()
      for (let i = 0; i < data.data.length; i++) {
        this.upclasses.push({
          value: data.data[i].classname
        })
      }
    },
    async CityCenters() {
      // 获取市场部
      const { data } = await getMarketing()
      for (let i = 0; i < data.data.length; i++) {
        this.upcityCenters.push({
          value: data.data[i].marketname
        })
      }
    },
    // 弹框是否弹出的方法
    modify(scope, index, id) {
      this.index = index
      this.id = id
      if (this.dialogVisible = true) {
        this.input1 = this.tableData[scope.$index].major
        this.input2 = this.tableData[scope.$index].classes
        this.input3 = this.tableData[scope.$index].chengji
        this.input4 = this.tableData[scope.$index].graduation
        this.input5 = this.tableData[scope.$index].failss
      }
    },
    // 弹框确定的方法(修改学生信息)
    async ok() {
      this.dialogVisible = false
      if (
        this.input1 === this.tableData[this.index].major &&
        this.input2 === this.tableData[this.index].classes &&
        this.input3 === this.tableData[this.index].chengji &&
        this.input4 === this.tableData[this.index].graduation &&
        this.input5 === this.tableData[this.index].failss
      ) {
        this.$message.error('您没有做任何更改!')
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.upchengji)) {
        // 判断不带汉字的正则
        this.$message.error('成绩不必带单位!')
        return false
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.upFail)) {
        // 判断不带汉字的正则
        this.$message.error('挂科次数不必带单位!')
        return false
      } else {
        const obj = {
          major: this.input1,
          classes: this.input2,
          chengji: this.input3,
          graduation: this.input4,
          failss: this.input5
        }
        const _id = this.id
        const success = await getUpdate(_id, obj)
        if (success.data.code === 200) {
          this.$message.success(success.data.msg);
          getPage(this.currentPage).then(res => {
            this.tableData = res.data.data;
          })
        } else {
          this.$message.error('修改失败，请重试!')
          return false
        }
      }
    },
    // 删除一项
    async deleteIndividual(index) {
      if (this.searchShow === 1) {
        if (
          this.search.serName === "" &&
          this.search.serStudy === "" &&
          this.search.serMajor === "" &&
          this.search.serClasses === "" &&
          this.search.sercityCenter === "" &&
          this.search.serchengji === "" &&
          this.search.sergraduation === "" &&
          this.search.serFailss === ""
        ) {
          this.$message.error("搜索不能全部为空!")
          this.excelshow = false // 不在则不显示导入框
          return false
        }
      }
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消!",
        type: "warning"
      })
        .then(() => {
          let Id = this.tableData[index]._id
          delAllStudent(Id).then(res => {
            if (res.data.code === 201) {
              this.$message.error(res.data.msg)
            } else {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              if (this.searchShow === 1) {
                let __index = this.tableData.indexOf(
                  this.tableData.find(item => {
                    return this.tableData[index]._id === item._id
                  })
                );
                this.tableData.splice(__index, 1)
                setTimeout(() => {
                  this.$message.success("根据搜索项自动为您过滤!")
                  this.searchAll()
                  this.currentPage = 1
                }, 500)
              } else {
                getPage(this.currentPage).then(res => {
                  if (res.data.code === 202) {
                    // 如果说删除的是当前页的最后一条数据，那么如果参数还发送currentPage就会走后台配置好的超过当前最大页数的操作，状态码是202，就要重新发送请求并且将参数减一
                    getPage(this.currentPage - 1).then(res => {
                      this.tableData = res.data.data
                      this.currentPage = res.data.delpage
                      this.total = res.data.total
                    })
                    return false
                  } // 否则正常删除、赋值
                  this.tableData = res.data.data
                  this.total = res.data.total
                })
              }
            }
          })
        })
        .catch(() => {
          this.$message({
          type: "info",
          message: "已取消!"
        })
      })
    },
    // 弹窗关闭箭头按钮
    handleClose(done) {
      this.$confirm('确认关闭?')
        .then(_ => {
          done()
        })
        .catch(_ => {
          this.$message('已取消!')
        })
    },
    // 查询按钮(搜索模块显示)
    searchshow() {
      if (this.excelshow) {
        this.excelshow = false
      }
      this.searchShow = 1
    },
    // 返回按钮(取消搜索)
    async quxiaoSearch() {
      this.searchShow = 2
      this.daochuexcel = true
      this.pageShow = true
      const allList = await getPage(1)
      this.tableData = allList.data.data
      this.total = allList.data.total
      // 返回的时候默认展示第一页的数据
      this.currentPage = 1 
      this.excelshow = false
    },
    // 查询函数
    async searchAll() {
      if (
        this.search.serName === '' &&
        this.search.serStudy === '' &&
        this.search.serMajor === '' &&
        this.search.serClasses === '' &&
        this.search.sercityCenter === '' &&
        this.search.serchengji === '' &&
        this.search.sergraduation === '' &&
        this.search.serFailss === ''
      ) {
        this.$message.error('搜索不能全部为空!')
        this.excelshow = false // 不在则不显示导入框
        return false
      }
      if (/.*[\u4e00-\u9fa5]+.*$/.test(this.search.serchengji)) {
        // 判断不带汉字的正则
        this.$message.error('成绩不要带单位!')
        return false
      } else {
        this.daochuexcel = true
        const obj = {}
        for (const key in this.search) {
          if (this.search.hasOwnProperty(key)) {
            if (this.search[key] !== '') {
              obj[key.slice(3).toLowerCase()] = this.search[key]
            }
          }
        }
        const searchSuc = await selectAllstud(1, obj)
        this.pageShow = true
        this.tableData = searchSuc.data.data
        this.currentPage = 1
        this.total = searchSuc.data.total
      }
    },
    // 清空搜索框
    searchQ() {
      this.search.serName = ''
      this.search.serStudy = ''
      this.search.serMajor = ''
      this.search.serClasses = ''
      this.search.sercityCenter = ''
      this.search.serchengji = ''
      this.search.sergraduation = ''
      this.search.serFailss = ''
    },
    // 批量操作显示
    chekout() {
      if (!this.chekShow) {
        if (this.searchShow === 1) {
          // 当前在搜索框显示的情况下
          if (
            this.search.serName === '' &&
            this.search.serStudy === '' &&
            this.search.serMajor === '' &&
            this.search.serClasses === '' &&
            this.search.sercityCenter === '' &&
            this.search.serchengji === '' &&
            this.search.sergraduation === '' &&
            this.search.serFailss === ''
          ) {
            this.$message.error('搜索不能全部为空!')
            return false
          } else {
            this.$message.success('已根据搜索项为您搜索出对应内容!')
            this.searchAll()
            this.chekShow = !this.chekShow
          }
        } else {
          this.chekShow = !this.chekShow
        }
      } else {
        this.chekShow = false
      }
    },
    // 批量选中
    checks(selection) {
      // 数组用来放最终的条件: [{id:xxx},{id:xxx}]
      const all_Id = [] 
      for (let i = 0; i < selection.length; i++) {
        all_Id.push(selection[i]._id)
      }
      this.checkeds = all_Id
    },
    getRowKey(row) {
      return row._id
    },
    // 批量删除函数
    pilDelete() {
      this.$confirm('此操作将永久删除这几项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        delAllStudent(this.checkeds).then(res => {
          if (res.data.code === 201) {
            this.$message.error(res.data.msg)
        } else {
            this.$message({
              message: res.data.msg,
              type: 'success'
        })
          if (this.searchShow === 1) {
            // 如果是在搜索里进行的批量删除
            this.$message.success('根据搜索项自动为您过滤!')
            this.searchAll()
            this.updateShow = 10000
            this.currentPage = 1
        } else {
          getPage(this.currentPage).then(res => {
            if (res.data.code === 202) {
            getPage(this.currentPage - 1).then(res => {
              this.tableData = res.data.data
              this.currentPage = res.data.delpage
              this.total = res.data.total
        })
         return false
      } else {
          this.tableData = res.data.data
          this.total = res.data.total
          }
        })
      }
    }
  })
})
  .catch(() => {
    this.$message({
    type: 'info',
    message: '已取消删除'
    })
  })
},
// 导出Excel
outExcel() {
  if (this.searchShow === 1) {
  // 处于搜索情况下
    if (
      this.search.serName === '' &&
      this.search.serStudy === '' &&
      this.search.serMajor === '' &&
      this.search.serClasses === '' &&
      this.search.sercityCenter === '' &&
      this.search.serchengji === '' &&
      this.search.sergraduation === '' &&
      this.search.serFailss === ''
  ) {
    this.$message.error('搜索不能全部为空!')
    this.excelshow = false // 不在则不显示导入框
    return false
  } else if (!this.daochuexcel) {
      this.$message.error('请完成搜索后再进行导出!')
  } else {
    this.exportExcel()
  }
  } else {
    this.exportExcel()
  }
},
// 导出函数
exportExcel() {
  this.exportLodding = true
  import('../../excel/Export2Excel.js').then(excel => {
  const tHeader = [
    '姓名',
    '性别',
    '年龄',
    '学制',
    '专业',
    '班级',
    '市场部',
    '当前成绩',
    '还差成绩',
    '挂科次数'
  ]
  const filterVal = [
    'name',
    'sex',
    'age',
    'study',
    'major',
    'classes',
    'citycenter',
    'chengji',
    'graduation',
    'failss'
  ]
  const data = this.formatJson(filterVal, this.tableData)
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: '学生信息',
      autoWidth: true,
      bookType: 'xlsx'
    })
    this.exportLodding = false
  })
},
// 导出需要配合的函数，进行头部和数据的一一对应赋值
formatJson(filterVal, jsonData) {
  return jsonData.map(v =>
    filterVal.map(j => {
      return v[j]
    })
  )
},
// :on-success="handleSuccess"调用
handleSuccess({ results, header }) {
  let obj
  const arrs = []
  results.map(item => {
  obj = {
    name: item['姓名'],
    sex: item['性别'],
    age: item['年龄'],
    study: item['学制'],
    major: item['专业'],
    classes: item['班级'],
    citycenter: item['市场部'],
    chengji: item['当前成绩'],
    graduation: item['还差成绩'],
    failss: item['挂科次数']
  }
    arrs.push(obj)
})
getExcel(arrs).then(res => {
  if (res.data.code === 201) {
    this.$message.error(res.data.msg)
  } else {
    this.$message({
      message: res.data.msg,
      type: 'success'
  })
  getPage(this.currentPage).then(res => {
    // 导入的时候先请求一下实时获取最新的tableData数据进行赋值，再进行判断当前页数是否超过了七条
    this.tableData = res.data.data
    if (Math.ceil(res.data.total / this.currentPage) > 7) {
    // 如果说你拿到的数据总长度除去当前页数得到的值大于7了，就说明当前页数据条数超过7条了，就请求下一页的数据
    getPage(this.currentPage + 1).then(ress => {
      this.tableData = ress.data.data
      this.currentPage = this.currentPage + 1
      this.total = ress.data.total
      if (this.currentPage !== ress.data.delpage) {
    // 如果你下一页的页数还是不等于后端返回给你的总数据的最大页数，就请求总数据的最大页数并且重新给页数赋值
    getPage(ress.data.delpage).then(ress => {
      this.tableData = ress.data.data
      this.currentPage = ress.data.delpage
      this.total = ress.data.total
    })
  }
})
  } else {
        this.tableData = res.data.data
        this.currentPage = res.data.delpage // 拿取到后端传输的最新的currentPage以及总条数tota实现分页的对应
        this.total = res.data.total
        }
      })
    }
  })
},
// Excel上传方法
  beforeUpload(file) {
  const isLt1M = file.size / 1024 / 1024 < 1
  if (isLt1M) {
    return true;
  }
  this.$message({
    message: "Please do not upload files larger than 1m in size.",
    type: "warning"
  });
    return false
},
  handleSuccess({ results, header }) {
    let obj
    const arrs = []
    results.map(item => {
    obj = {
      name: item['姓名'],
      sex: item['性别'],
      age: item['年龄'],
      study: item['学制'],
      major: item['专业'],
      classes: item['班级'],
      citycenter: item['市场部'],
      chengji: item['当前成绩'],
      graduation: item['还差成绩'],
      failss: item['挂科次数']
    }
    arrs.push(obj)
  })
  getExcel(arrs).then(res => {
    if (res.data.code === 201) {
      this.$message.error(res.data.msg)
    } else {
      this.$message({
        message: res.data.msg,
        type: "success"
    })
    getPage(this.currentPage).then(res => {
    // 导入的时候先请求一下实时获取最新的tableData数据进行赋值，再进行判断当前页数是否超过了七条
      this.tableData = res.data.data
      if (Math.ceil(res.data.total / this.currentPage) > 7) {
      // 如果说你拿到的数据总长度除去当前页数得到的值大于7了，就说明当前页数据条数超过7条了，就请求下一页的数据
      getPage(this.currentPage + 1).then(ress => {
        this.tableData = ress.data.data
        this.currentPage = this.currentPage + 1
        this.total = ress.data.total
          if (this.currentPage !== ress.data.delpage) {
            // 如果你下一页的页数还是不等于后端返回给你的总数据的最大页数，就请求总数据的最大页数并且重新给页数赋值
            getPage(ress.data.delpage).then(ress => {
              this.tableData = ress.data.data
              this.currentPage = ress.data.delpage
              this.total = ress.data.total
          })
        }
      })
    } else {
        this.tableData = res.data.data
        // 拿取到后端传输的最新的currentPage以及总条数tota实现分页的对应
        this.currentPage = res.data.delpage 
        this.total = res.data.total
        }
      })
    }
  })
},
  // 导入excel表
  excelShow() {
    // 向上取整通过总条数拿到最大页数
    let maxPage = Math.ceil(this.total / this.pageSize) 
    if (this.searchShow === 1) {
      this.$message.error("不可再搜索状态下进行导入!")
      return false
  } else if (this.currentPage === maxPage) {
    // 判断当前是否在最后一页
    this.excelshow = !this.excelshow
  } else {
      this.$message.error("请去最后一页操作!")
      return false
    }
  },
  // 分页中拿到当前所在页数的函数
  async current_change(currentPage) {
    if (
      this.searchShow === 1 &&
      this.search.serName === "" &&
      this.search.serStudy === "" &&
      this.search.serMajor === "" &&
      this.search.serClasses === "" &&
      this.search.sercityCenter === "" &&
      this.search.serchengji === "" &&
      this.search.sergraduation === "" &&
      this.search.serFailss === ""
    ) {
    this.$message.error("您搜索框已打开，请不要为空!")
    this.currentPage = 1
    this.pageShow = false
      return false
    } else {
    if (this.searchShow === 1) {
      if (
        this.searchShow === 1 &&
        this.search.serName === "" &&
        this.search.serStudy === "" &&
        this.search.serMajor === "" &&
        this.search.serClasses === "" &&
        this.search.sercityCenter === "" &&
        this.search.serchengji === "" &&
        this.search.sergraduation === "" &&
        this.search.serFailss === ""
    ) {
        this.$message.error("您搜索框已打开，请不要为空!")
        this.currentPage = 1
        this.pageShow = false
          return false
    } else {
        const obj = {}
        for (let key in this.search) {
          if (this.search.hasOwnProperty(key)) {
            if (this.search[key] != "") {
              obj[key.slice(3).toLowerCase()] = this.search[key]
            }
          }
        }
        let searchSuc = await selectAllstud(
          currentPage === 1 ? 1 : currentPage,
          obj
      )
      this.pageShow = true
      this.currentPage = currentPage
      this.total = searchSuc.data.total
        if (currentPage > Math.ceil(this.total / this.pageSize)) {
          selectAllstud(Math.ceil(this.total / this.pageSize), obj).then(
          res => {
          this.currentPage = Math.ceil(this.total / this.pageSize)
          this.tableData = res.data.data
        }
      )
    } else {
          this.tableData = searchSuc.data.data
        }
      }
    } else {
      this.pageShow = true
      // 向上取整通过总条数拿到最大页数
      let maxPage = Math.ceil(this.tableData.length / this.pageSize)
      if (this.currentPage != maxPage) {
      // 判断当前是否在最后一页
      this.currentPage = currentPage
      let allList = await getPage(currentPage)
      this.tableData = allList.data.data
      this.excelshow = false // 不在则不显示导入框
    } else {
          this.currentPage = currentPage
          const allList = await getPage(currentPage)
          this.tableData = allList.data.data
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.searchbox-bs-002 {
  width: 100%;
  display: flex;
  align-items: center;
}
.searchbox-bs-002 > li {
  width: 10%;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  list-style: none;
}
</style>
