<template>
  <div class="dataone" ref="dataone">
  </div>
</template>

<script>
import { getBordAxios } from "../../network/network.js";
var echarts = require('echarts');

  export default {
    props:['timestamp'],
    data() {
      return {
        kefu: [],
        series:[],
        dateM:[]
      };
    },
    mounted() {
      // 获取最近一周排名
      this.bord()
    },
    methods: {
      bord(){
        getBordAxios(this.timestamp).then(res=>{
          this.kefu = res.data.kefu;
          this.series = res.data.zong;
          this.dateM = res.data.dateM
          this.initEcharts();
      })
      },
      initEcharts(){
         // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.dataone);
        // 绘制图表
        myChart.setOption({
          title: {
            text: '最近一周客户量排名',
            textStyle:{
              color: 'rgb(23,83,89)',
              fontSize:'25',
              fontWeight: 600
            },
            left:'center',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.kefu,
            bottom:0,
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '6%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateM
          },
          yAxis: {
            type: 'value'
          },
          series: this.series
        });
      }
    },
    watch:{
      timestamp:function(newvalue){
        this.bord()
      }
    }
  }
</script>

<style lang="less" scoped>
.dataone{
  height: 600px;
  width: 100%;
}
</style>