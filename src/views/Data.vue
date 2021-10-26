<template>
  <div class="data">
    <el-card shadow="never">
      <el-row class="title" type="flex" justify="space-between">
        <el-col :span="10">
          <i class="el-icon-s-data"></i>
          <span>用户数据分析系统</span>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange"
            value-format="timestamp">
    </el-date-picker>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="table">
      <el-row :gutter="50">
        <el-col :span='12'>
          <Dataone :timestamp="pullTime"></Dataone>
        </el-col>
        <el-col :span='12'>
          <Datatow :timestamp="pullTime"></Datatow>
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>

<script>
import Dataone from '../components/echart/dataone.vue';
import Datatow from '../components/echart/datatow.vue';

  export default {
    data() {
      return {
        value:'',
        pullTime:[]
      }
    },
    components:{
      Dataone,
      Datatow,
    },
    methods: {
      // 获取时间戳
      dateChange(e){
        this.pullTime = e
      }
    },
  }
</script>

<style lang="less" scoped>
.title{
  font-size: 26px;
  font-weight: bolder;
  color: rgb(23,83,89);
  color: rgb(79, 156, 163);

  letter-spacing: 1px;
  i{
    margin-right: 20px;
  }
}
.table {
  margin-top: 20px;
  padding: 30px 0;
}
</style>