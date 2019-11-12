import Axios from 'axios'
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
export const updateAllstud = (obj, id) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/updateAllstud', {
    obj: obj,
    id: id
  })
}
// 删除学生
export const delallStudent = (id) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/delallStudent', { _id: id })
}
// 添加学生
export const addallStudent = (data) => {
  // eslint-disable-next-line no-undef
  return Axios.post('http://132.232.89.22:8080/addallStudent', { data })
}
// 获取专业
export const getMajor = () => {
  // eslint-disable-next-line no-undef
  return Axios.get('http://132.232.89.22:8080/getMajor')
}

