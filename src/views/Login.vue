<template>
  <div class='login'>
    <div class="box">
      <div class="logo">
        <img src="../assets/logo.png" alt="房乐多">
      </div>
      <div class="table-body">
        <el-form
          label-width="80px"
          :model="loginForm"
          :rules="loginRules"
          status-icon
          ref="loginForm"
          >

          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              clearable
              ></el-input>
          </el-form-item>
          
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              clearable
              show-password
              ></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {logAxios} from "../network/network.js"
  export default {
    data() {
      return {
        loginForm:{
          username:"",
          password:""
        },
        loginRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度必须为 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度必须为 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submit(){
        this.$refs["loginForm"].validate((valid) =>{
          if(!valid){
            // 验证失败
            this.$message.error("用户名/密码校验未通过！");
            return
          }
          // 校验成功
          logAxios(this.loginForm)
            .then(res => {
              if(res.data.code == 401) {
                this.$message.error(res.data.txt)
              }
              if(res.data.code == 200) {
                window.sessionStorage.setItem("token",res.data.token);
                this.$message.success("校验通过，正在进入管理系统...",);
                this.$router.push("/welcome")
                // 跳转进入home
              }
            })
        })
      },
      reset(){
        this.$refs["loginForm"].resetFields()
      }
    },
  }
</script>

<style lang="less" scoped>
.login{
  height: 100%;
  background: rgb(13,63,103);
  display: flex;
  align-items: center;
  justify-content: center;
}
.box{
  width: 600px;
  height: 430px;
  background: white;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
  padding: 140px 0 60px 0;
}
.logo{
  position: absolute;
  height: 130px;
  width: 130px;
  border-radius: 50%;
  background: rgb(23,83,89);
  padding: 16px;
  top:-60px;
  left:50%;
  transform: translateX(-50%);
  img{
    height: 100%;
    width:100%;
  }
}
.table-body{
  height: 100%;
  width: 100%;
  /* border: 2px solid red; */
  box-sizing: border-box;
  padding:0 50px 0;
}
.el-button{
  font-size: 18px;
  margin-right: 30px;
}
</style>