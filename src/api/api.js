import axios from 'axios'

// 修改密码
export function updateAdminPass(obj) {
  console.log(obj)
  return axios.post('http://132.232.89.22:8080/updateAdminPass', obj)
}
