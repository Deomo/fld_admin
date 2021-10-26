<template>
  <div class="welcome">
    <el-card>
      <div slot="header" class="header">
        <i class="el-icon-s-shop"></i>
        <span>欢迎使用房乐多客户数据分析系统</span>
      </div>
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <div class="calendar">
                <el-calendar>
                </el-calendar>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
              <el-card class="weather">
                <div slot="header" class="title">
                  <i class="el-icon-sunrise"></i>
                  <span>最近三天天气</span>
                </div>
                <div class="content">
                  <el-card shadow="hover" v-for="(item,index) in forecast" :key="index">
                    <div class="threeDays">
                      <div class="left">
                        <img :src='"@/assets/weather/W"+item.conditionIdDay+".png"'>
                        <div class="temperature">{{item.tempDay+"~"+item.tempNight}}</div>
                        <div class="describe">{{item.conditionDay+"/"+item.conditionNight}}</div>
                      </div>
                      <div class="right">
                        <div class="day">{{date[index]}}</div>
                        <div class="date">{{item.predictDate}}</div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </el-card>
              <el-card class="notice">
                <div slot="header" class="title">
                  <i class="el-icon-s-comment"></i>
                  <span>集团资讯</span>
                </div>
                <div class="info">
                  东岸蓝湾二期现已开盘。
                </div>
              </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { weatherAxios } from "../network/network.js";
  export default {
    data() {
      return {
        forecast: [],
        date:["今天","明天","后天"]
      };
    },
    methods: {
      // 获取天气
      getWeather(){
        weatherAxios().then(res=>{
          this.forecast = res.data.data.forecast;
          let weatherData = {sessList:this.forecast,time:Date.now()};
          weatherData = JSON.stringify(weatherData);
          window.localStorage.setItem("weatherData",weatherData);
        })
      },
      // 判断天气是否存在缓存并渲染
      showWeather(){
        let weatherData =  window.localStorage.getItem("weatherData");
        weatherData = JSON.parse(weatherData);
        if(!weatherData){
          return this.getWeather();
        }
        let now = Date.now();
        let passTime = now - weatherData.time;
        if(passTime<=3600000) {
          return this.forecast = weatherData.sessList;
        }
        this.getWeather();
      }
    },
    mounted() {
      this.showWeather();
    },
  }
</script>

<style lang="less" scoped>
.welcome{
  height: 100%;
  width: 100%;
}
.header{
  font-size: 30px;
  color: rgb(23,83,89);
  i{
    margin-right: 20px;
  }
  span{
    font-weight: bold;
    letter-spacing: 2px;
  }
}
.content{
    .title{
      font-size: 25px;
      color: #67C23A;
      font-weight: bold;
      letter-spacing: 2px;
      i{
        padding: 0 15px;
      }
    }
    .threeDays{
      display: flex;
      justify-content: space-between;
      letter-spacing: 2px;
      cursor: pointer;
      background-image: linear-gradient(to right, rgb(223,241,243) , #fff);
      .left{
        display: flex;
        align-items: center;
        img{
          height: 48px;
          width: 48px;
        }
        .temperature{
          font-size: 40px;
          font-weight: bolder;
          padding-left: 20px;
          position: relative;
          padding-right: 10px;
          &::after{
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            box-sizing: border-box;
            border: 2px solid;
            position: absolute;
            border-radius: 50%;
            top: 0;
            right: 0;
          }
        }
        .describe{
          padding-left: 10px;
          transform: translateY(8px);
          color: #409EFF;
        }
      }
      .right{
        text-align: right;
        .day{
          font-size: 35px;
          color: rgb(23,83,89);
          font-weight: bolder;
          padding-bottom: 5px;
        }
        .date{
          color: #aaa;
          font-weight: bold;
        }
      }
    }
    .notice{
      margin-top: 20px;
      .info{
        height: 115px;
        text-align: center;
        font-size: 20px;
      }
    }
  }
</style>