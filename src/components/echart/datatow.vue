<template>
  <div class="datatow" ref="datatow">
    echars
  </div>
</template>

<script>
import { totalAxios } from "../../network/network.js";
var echarts = require('echarts');

  export default {
    props:['timestamp'],
    data() {
      return {
        kefu: [],
        num:[],
      };
    },
    mounted() {
      this.getTotal()
    },
    methods: {
      getTotal(){
        // 获取客服总量
        totalAxios(this.timestamp).then(res=>{
          this.kefu = res.data.kefu;
          this.num = res.data.num;
          // 渲染echarts
          this.initEcharts();
        })
      },
      initEcharts(){
        // var myChart = echarts.init(this.$refs.datatow).dispose();
         // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.datatow);
        // 绘制图表
        myChart.setOption({
          title: {
            text: '客服录入总量',
            textStyle:{
              color: 'rgb(23,83,89)',
              fontSize:'25',
              fontWeight: 600
            },
            left:'center',
          },
          color: ['rgb(23,83,89)'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.kefu,
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
              {
                  name: '直接访问',
                  type: 'bar',
                  barWidth: '60%',
                  data: this.num
              }
          ]
        });
      }
    },
    watch:{
      timestamp:function(newValue){
        this.getTotal()
      }
    }
  }
</script>

<style lang="less" scoped>
.datatow{
  height: 600px;
  width: 100%;
}
</style>