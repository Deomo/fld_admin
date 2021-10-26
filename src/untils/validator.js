import { myDate } from "./untils.js"
import { validateAxios } from "../network/network";
 // 重复信息验证
export var dataCheck = function (rule, value, callback) {
  if(value === ""){
    return callback();
  }
  //根据缓存判断是否修改了数据
  let userRes = window.sessionStorage.getItem("userRes");
  userRes = JSON.parse(userRes);
  if(userRes){
    if(rule.field == "contact" && userRes.contact == value){
      return callback()
    } else if (rule.field == "weixin" && userRes.weixin == value){
      return callback()
    }
  }

  if(rule.field == "contact"){
    if (!(/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value))) {
      return callback(new Error("请输正确的手机号"));
    }
  } else if(rule.field == "weixin"){
    if (!/^[a-zA-Z0-9]([-_a-zA-Z0-9]{5,19})+$/.test(value)) {
      return callback(new Error("请输正确的微信号"));
    }
  }
  validateAxios({
      keyword:value,
      field:rule.field
    }).then(res=>{
      if(res.data.code==403){
        callback(new Error(`客户:"${res.data.content.nickname}" 已存在，录入时间为：${myDate(res.data.content.posttime,1)}`));
      } else{
        return callback();
      }
    });
};