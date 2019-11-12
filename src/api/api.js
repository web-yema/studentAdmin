import Axios from 'axios'

// 修改密码
export function updateAdminPass(obj) {
  return Axios.post('http://132.232.89.22:8080/updateAdminPass', obj)
  // eslint-disable-next-line no-unused-vars
}
// 添加学生信息
export const getStudent = (studentlist) => {
  return Axios.post('http://132.232.89.22:8080/addallStudent', {
    ...studentlist
  })
}

// 修改学生信息
export const getUpdate = (_id, obj) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/updateAllstud', {
    id: _id,
    upstud: obj
  })
}

// 删除学生信息
export const delAllStudent = (_id) => {
  return Axios.post('http://132.232.89.22:8080/delallStudent', { id: _id })
}

// 获取班级
export const getClass = () => {
  return Axios.get('http://132.232.89.22:8080/getClass')
}

// 获取专业
export const getMajor = () => {
  return Axios.get('http://132.232.89.22:8080/getMajor')
}

// 获取市场部
export const getMarketing = () => {
  return Axios.get('http://132.232.89.22:8080/getMarket')
}

// 获取分页和学生
export const getPage = (page) => {
  return Axios.post('http://132.232.89.22:8080/allstudentPage', {
    page: page
  })
}

// 获取查询
export const selectAllstud = (page, obj) => {
  return Axios.post('http://132.232.89.22:8080/selectAllstud', {
    page: page,
    obj: obj
  })
}

// 导入Excel
export const getExcel = (excarr) => {
  return Axios.post('http://132.232.89.22:8080/inExcel', {
    excarr
  })
}
