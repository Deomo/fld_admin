<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../assets/logo1.png" alt="">
          <router-link to="/welcome">
            <p>后台管理·客户数据分析系统</p>
          </router-link>
        </div>
        <div class="logout">
          <el-popconfirm title="确定已保存数据并退出账户？" @confirm="logout">
            <el-button slot="reference" type="danger">退出登录</el-button>
          </el-popconfirm>
        </div>
      </el-header>

      <el-container class="container">
        <el-aside :width="isCollapse ? '64px':'180px'">
          <el-tooltip effect="dark" :content="isCollapse ? '展开':'折叠'" placement="right">
          <div class="flod" @click="flod">
            <i class="el-icon-arrow-left" v-show="!isCollapse"></i>
            <i class="el-icon-arrow-right" v-show="isCollapse"></i>
          </div>
          </el-tooltip>
          <el-menu
            default-active="2"
            background-color="rgb(34, 113, 121)"
            text-color="rgba(255,255,255,0.7)"
            active-text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="flodTransition"
            router
            >
            <el-menu-item index="/allusers">
              <i class="el-icon-s-custom"></i>
              <span slot="title">意向客户</span>
            </el-menu-item>
            <el-menu-item index="/addUsers">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">添加客户</span>
            </el-menu-item>
            <el-menu-item index="/data">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        flodTransition: false
      };
    },
    methods: {
      logout(){
        window.sessionStorage.removeItem("token");
        this.$message.success("退出成功");
        this.$router.push({name:"login"});
      },
      flod(){
        this.isCollapse = !this.isCollapse
      },
    },
  }
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.el-header{
  background: rgb(23,83,89);
  height:100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  .logo{
    height: 100%;
    display: flex;
    align-items: center;
    img{
      height: 70%;
    }
    p{
      color: rgba(255,255,255,.8);
      font-size: 22px;
      font-weight: bold;
      margin-left: 30px;
      cursor: pointer;
    }
  }
}
.el-container{
  width: 100%;
  height: 100%;
  background: rgb(248, 248, 248);
  .container{
    height: calc(100% - 60px);
  }
  .el-aside{
    background: rgb(34, 113, 121);
    position: relative;
    .el-menu{
      border-right: none;
      .el-menu-item{
        font-size: 18px;
      }
    }
    .flod{
      width: 40px;
      line-height: 50px;
      font-size: 30px;
      text-align: center;
      color:#FFF;
      background: rgba(193, 231, 231, 0.521);
      position: absolute;
      top: 50%;
      right: 0;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
}
</style>