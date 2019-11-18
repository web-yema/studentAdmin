<template>
    <div style="width=:100%; height:100px;text-align:center;">
      <el-pagination
        style="width=:90%; height:100px;margin:25px auto;"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="total1"
        @current-change="current_change"
      />
    </div>
</template>

<script>
export default {
  name:'Pagination',
  props: {
    total: Number,
    pageSize: Number,
    currentPage: Number
  },
  data() {
    return {
      total1: this.total
    }
  },
  watch: {
    total(newValue) {
      this.total1 = newValue
    }
  },
  methods: {
    // 分页中拿到当前所在页数的函数
    async current_change(currentPage) {
      // 发送事件给父组件
      this.$emit('getcurrentPage', currentPage)
    }
  }
}
</script>
