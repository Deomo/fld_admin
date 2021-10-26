<template>
  <div class="allUsers">
    <el-card shadow="never" class="search">
      <el-row>
        <el-col :span="10">
          <el-input v-model="params.keyword" placeholder="请输入内容" @change="getAllUsers"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" plain @click="getAllUsers">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="50"
          >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="客户姓名"
          width="140">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系方式"
          width="200">
        </el-table-column>
        <el-table-column
          prop="weixin"
          label="微信"
          width="160">
        </el-table-column>
        <el-table-column
          prop="dizhi"
          label="客户所在地"
          >
        </el-table-column>
        <el-table-column
          label="添加日期"
          width="160">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ getDate(scope.row.posttime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="kefu"
          label="客户专员"
          width="200">
        </el-table-column>
        <el-table-column
          prop="laiyuan"
          label="客户来源">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="updateUser(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="small" @click="delUser(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="naver">
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[20, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <Dialog ref="dialog"></Dialog>
  </div>
</template>

<script>
import { usersAxios, delUsersAxios } from "../network/network.js";
import { myDate } from '../untils/untils.js';
import Dialog from '../components/dialog.vue';
  export default {
    components:{
      Dialog
    },
    data() {
      return {
        tableData: [],
        total:0,
        params:{
          num:20,
          page:1,
          keyword: ''
        }
      };
    },
    mounted() {
      this.getAllUsers()
    },
    methods: {
      // 获取时间
      getDate(time){
        return myDate(time,0)
      },
      // 获取用户数据
      getAllUsers(){
        usersAxios(this.params).then(res=>{
          this.tableData = res.data.results;
          this.total = res.data.num;
      })
      },
      // 选择页数
      handleSizeChange(e){
        this.params.num = e;
        this.getAllUsers()
      },
      // 选择显示条目
      handleCurrentChange(e){
        this.params.page = e;
        this.getAllUsers()
      },
      // 删除一个用户
      delUser(id){
        this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          delUsersAxios(id).then(()=>{
            this.getAllUsers()
          })
        })
      },
      // 编辑用户资料
      updateUser(id){
        this.$refs.dialog.dialogFormVisible = true;
        this.$refs.dialog.id = id;
      }
    },
  }
</script>

<style lang="less" scoped>
.search{
  .el-button{
    width:80%;
    margin-left: 10px;
  }
}
.table{
  margin-top: 20px;
}
.pages{
  margin:20px auto 30px;
  text-align: center;
}
</style>