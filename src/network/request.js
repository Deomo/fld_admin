import axios from 'axios';
import { Loading } from 'element-ui';

// vueadmin登录接口
export function adminRequest(config){
  const instance = axios.create({
    baseURL: "https://ku.qingnian8.com/dataApi/vueadmin",
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(function(config){
    Loading.service();
    return config
  })
  // 返回拦截
  instance.interceptors.response.use(function(response){
    Loading.service().close();
    return response
  })
  return instance(config)
}

// vueadmin鉴权接口
export function authorize(obj){
  const instance = axios.create({
    baseURL:"https://ku.qingnian8.com/dataApi/vueadmin",
    timeout:5000,
  })
  // 请求拦截
  instance.interceptors.request.use(function(config){
    Loading.service();
    config.headers["X-Token"] = window.sessionStorage.getItem("token")
    return config
  })
  // 返回拦截
  instance.interceptors.response.use(function(response){
    Loading.service().close();
    return response
  })
  return instance(obj)
}
