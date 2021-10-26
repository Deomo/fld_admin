import { adminRequest, authorize } from './request.js'

// 登录用户验证请求
export function logAxios(config) {
  return adminRequest({
    url:"/login.php",
    params: config
  })
}
// 用户鉴权,获取天气信息
export function weatherAxios() {
  return authorize({
    url:"/tianqi3day.php"
  })
}
// 获取意向客户信息
export function usersAxios(config) {
  return authorize({
    url:"/yxList.php",
    params:config
  })
}
// 删除客户信息
export function delUsersAxios(id) {
  return authorize({
    url:"/yxDelRow.php",
    params:{
      id:id
    }
  })
}

// 添加客户信息
export function addUserAxios(userInfo) {
  return authorize({
    url:"/yxAdd.php",
    params:userInfo
  })
}

// 获取客服人员信息
export function getkefuAxios() {
  return authorize({
    url:"/yxLoad.php",
  })
}

// 验证电话 微信 是否重复
export function validateAxios(info) {
  return authorize({
    url:"/yxValidate.php",
    params:info
  })
}

// 根据id获取一条用户信息
export function getByIdAxios(userId) {
  return authorize({
    url:"/yxRow.php",
    params:{
      id:userId
    }
  })
}

// 修改一条用户信息
export function updataAxios(userInfo) {
  return authorize({
    url:"/yxUpdata.php",
    params:userInfo
  })
}


// 获取最近客户录入排名
export function getBordAxios(pullTime) {
  return authorize({
    url:"/dataPaiming.php",
    params:{
      pullTime:pullTime
    }
  })
}

// 获取客服录入总量
export function totalAxios(pullTime) {
  return authorize({
    url:"/dataKefu.php",
    params:{
      pullTime:pullTime
    }
  })
}
