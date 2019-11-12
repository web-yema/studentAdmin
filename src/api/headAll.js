import Axios from 'axios'

// 获取所有班主任
export const getHeadAll = () => {
  return Axios.get('http://132.232.89.22:8080/getHeadTeacher')
}

// 添加一名班主任
export const addHead = (person) => {
  return Axios.post('http://132.232.89.22:8080/addHeadTeacher', {
    ...person
  })
}

// 修改班主任信息
export const updateHead = (id, upmajor) => {
  return Axios.post('http://132.232.89.22:8080/updateHeadTeacher', {
    _id: id,
    position: upmajor
  })
}

// 删除一名班主任
export const deleteHead = (id) => {
  return Axios.post('http://132.232.89.22:8080/delHeadTeacher', {
    _id: id
  })
}

// 获取所有讲师
export const getTeacherAll = () => {
  return Axios.get('http://132.232.89.22:8080/getLecturer')
}

// 添加一名讲师
export const addTeacher = (person) => {
  return Axios.post('http://132.232.89.22:8080/addLecturer', {
    ...person
  })
}

// 修改讲师信息
export const updateTeacher = (id, upmajor) => {
  return Axios.post('http://132.232.89.22:8080/updateLecturer', {
    _id: id,
    position: upmajor
  })
}

// 删除一名讲师
export const deleteTeacher = (id) => {
  return Axios.post('http://132.232.89.22:8080/delLecturer', {
    _id: id
  })
}

// 获取所有市场部
export const getMarketAll = () => {
  return Axios.get('http://132.232.89.22:8080/getMarket')
}

// 添加市场部
export const addMarket = (marketname) => {
  return Axios.post('http://132.232.89.22:8080/addMarket', marketname)
}

// 获取专业
export const getMajor = () => {
  return Axios.get('http://132.232.89.22:8080/getMajor')
}

// 添加专业
export const addMajor = (majorname) => {
  return Axios.post('http://132.232.89.22:8080/addMajor', majorname)
}
