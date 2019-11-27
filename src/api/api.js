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
// 获取分页和班级
export const classPage = (page, major) => {
  return Axios.post('http://132.232.89.22:8080/classPage', {
    page: page,
    major: major
  })
}
// 查询学生
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
// 获取班级
export const getClass = () => {
  return Axios.get('http://132.232.89.22:8080/getClass')
}
// 创建班级
export const createClass = (data) => {
  return Axios.post('http://132.232.89.22:8080/createClass', data)
}
// 删除班级
export const delClass = (id) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/delClass', { _id: id })
}
// 修改班级
export const updateClass = (obj) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/updateClass', obj)
}
// 查询班级
export const searchClass = (data) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/searchClass', data)
}
// 获取学生
export const allstudent = () => {
  // eslint-disable-next-line no-undef
  return Axios.get('http://132.232.89.22:8080/allstudent')
}
// 修改学生
export const updateAllstud = (id, obj) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/updateAllstud', {
    id: id,
    upstud: obj
  })
}
// 批量修改学生
export const updateStudent = (id, obj) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/updateStudent', {
    ids: id,
    updateObj: obj
  })
}
// 添加学生
export const addallStudent = (data) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/addallStudent', { data })
}

// 学生根据学号查询个人信息
export const selectOneStudent = (data) => {
  return Axios.post('http://132.232.89.22:8080/selectOneStudent', data)
}
