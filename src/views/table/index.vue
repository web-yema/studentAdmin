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
      <li class="chengji">
        <el-input v-model="search.serchengji.$gte" type="number" min="0" max="39" size="mini" placeholder=">0" />
        <span>-</span>
        <el-input v-model="search.serchengji.$lte" type="number" min="1" max="40" size="mini" placeholder="<40" />
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
    <el-table
      :data="tableData"
      style="width: 150%"
    >
      <el-table-column label="学号">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="studentID"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].studentID }}</div>
        </template>
      </el-table-column>
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
      <el-table-column label="籍贯">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="nativeplace"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].nativeplace }}</div>
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
          <div v-else style="text-align:center">{{ tableData[scope.$index].chengji }}</div>
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
          <div v-else style="text-align:center">{{ tableData[scope.$index].graduation }}</div>
        </template>
      </el-table-column>
      <el-table-column label="挂科次数">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index===updateShow"
            v-model="upFail"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else style="text-align:center">{{ tableData[scope.$index].failss }}</div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.$index===updateShow"
            size="mini"
            type="primary"
          >确定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模块 -->
    <Pageoption style="position:fixed;left:205px;bottom:20px;" :total="total" :page-size="pageSize" :current-page="currentPage" @getcurrentPage="getcurrentPage" />
    <!-- 导出excel表 -->
    <el-button
      size="mini"
      :loading="exportLodding"
      type="success"
      round
      style="position:fixed;right:5px;bottom:20px;"
      @click="outExcel"
    >导出当页excel
    </el-button>
  </div>
  </div>
  </div>
</template>

<script>
// 引入接口函数
import {
  selectAllstud, // 查询学生信息
  getPage, // 分页和学生
  getMajor, // 获取所有专业
  getMarketing, // 获取所有市场部
  getClass // 获取所有班级
} from '../../api/api.js'

// 引入vuex
// import { mapGetters } from 'vuex'

// 引入分页模板
import Pageoption from '../../components/Pagination'

// 引入excel依赖文件
import UploadExcelComponent from '../../components/UploadExcel/index'

export default {
  name: 'Table',
  components: {
    Pageoption,
    // eslint-disable-next-line vue/no-unused-components
    UploadExcelComponent
  },
  data() {
    return {
      exportLodding: false,
      tableData: [], // 所有学生数据
      searchShow: 1, // 搜索模块是否显示 不为1就是不显示
      //  ·················································· 分页数据
      selectflag: false, // 标识, 用来给查询使用
      total: 1, // 数据总条数，默认给1
      pageSize: 7, // 每页展示条数 用来让total进行切割，算出来一共的页数
      currentPage: 1, // 当前在第几页,默认在第一页
      updateShow: 100000, // 当前展示的修改弹出项，给这么大是为了一开始谁也匹配不到
      search: {
        // 搜索的v-model绑定值
        serName: '', // 姓名
        serStudy: '', // 学制
        serMajor: '', // 专业
        serClasses: '', // 班级
        sercityCenter: '', // 市场部
        serchengji: {
          $gte: 0, // 当前成绩 (>3,只是比喻,具体多少根据情况定)
          $lte: 40 // 当前成绩 (>15,只是比喻,具体多少根据情况定)
        },
        sergraduation: '', // 还差成绩
        serFailss: '' // 挂科次数
      },
      // 学制选项
      upstudys: [
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
      upmajors: [],
      // 班级选项
      upclasses: [],
      // 市场部选项
      upcityCenters: [],
      //  搜索挂科次数选项
      searFail: [
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
      // 学生的下标
      index: 0,
      // 学生的id值
      id: '',
      // 查询到的对象
      objselect: {}
    }
  },
  mounted() {
    // 分页加学生接口调用
    this.getPage(this.currentPage)
    // 专业接口调用
    this.Majors()
    // 班级接口调用
    this.Classs()
    // 市场部接口调用
    this.CityCenters()
  },
  methods: {
    async selectallstud(page, obj) {
      const searchSuc = await selectAllstud(page, obj)
      this.tableData = searchSuc.data.data
      this.currentPage = page
      this.total = searchSuc.data.total
    },
    // 调用子组件传过来的事件
    getcurrentPage(currentPage) {
      this.currentPage = currentPage
      // 如果selectflag为true就调用查询函数
      if (this.selectflag) {
        this.selectallstud(currentPage, this.objselect)
        // 否则就调用获取学生加分页接口
      } else {
        this.getPage(currentPage)
      }
    },
    // 分页加学生接口调用
    async getPage(page) {
      const { data } = await getPage(page)
      this.tableData = data.data
      this.total = data.total
    },
    // 获取专业
    async Majors() {
      const { data } = await getMajor()
      for (let i = 0; i < data.data.length; i++) {
        this.upmajors.push({
          value: data.data[i].majorname
        })
      }
    },
    // 获取班级
    async Classs() {
      const { data } = await getClass()
      for (let i = 0; i < data.data.length; i++) {
        this.upclasses.push({
          value: data.data[i].classname
        })
      }
    },
    // 获取市场部
    async CityCenters() {
      const { data } = await getMarketing()
      for (let i = 0; i < data.data.length; i++) {
        this.upcityCenters.push({
          value: data.data[i].marketname
        })
      }
    },
    // 查询函数(确定按钮)
    async searchAll() {
      this.selectflag = true
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
      }
      if (/.*[\u4e00-\u9fa5]+.*$/.test(this.search.serchengji)) {
        // 判断不带汉字的正则
        this.$message.error('成绩不要带单位!')
        return false
      } else {
        const obj = {}
        for (const key in this.search) {
          if (this.search.hasOwnProperty(key)) {
            if (this.search[key] !== '') {
              obj[key.slice(3).toLowerCase()] = this.search[key]
            }
          }
        }
        this.objselect = obj
        this.selectallstud(1, this.objselect)
      }
    },
    // 清空搜索框
    async searchQ() {
      this.selectflag = false
      this.search.serName = ''
      this.search.serStudy = ''
      this.search.serMajor = ''
      this.search.serClasses = ''
      this.search.sercityCenter = ''
      this.search.sergraduation = ''
      this.search.serFailss = ''
      const allList = await getPage(1)
      this.tableData = allList.data.data
      this.total = allList.data.total
      // 返回的时候默认展示第一页的数据
      this.currentPage = 1
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
            this.search.serchengji === '' &&
            this.search.sercityCenter === '' &&
            this.search.serFailss === ''
        ) {
          this.$message.error('搜索不能全部为空!')
          this.excelshow = false // 不在则不显示导入框
          return false
        } else if (this.daochuexcel) {
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
            '学号',
            '姓名',
            '籍贯',
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
            'studentID',
            'name',
            'nativeplace',
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  }
}
</script>

<style>
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
.chengji{
  display:flex;
}
.chengji span{
  display:inline-block;
  margin:5px 0 0 0;
}
.chengji .el-input__inner{
  padding:0 0 0 0;
}
.cell div{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
