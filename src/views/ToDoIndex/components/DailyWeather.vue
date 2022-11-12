<template>
    <div class="weather">
      <h1>当前天气</h1>
      <i :class="'qi-514'" id="icon"></i>
      <ul>
        <li>
          当前城市:<span>郑州{{ weatherMsg.text }}</span>
        </li>
        <li>
          当前温度:<span>12{{ weatherMsg.temp }}℃</span>
        </li>
        <li>
          体感温度:<span>14{{ weatherMsg.feelsLike }}℃</span>
        </li>
        <li>
          当前风向:<span>北风{{ weatherMsg.windDir }}</span>
        </li>
        <li>
          当前风速:<span>3{{ weatherMsg.windScale }}级</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  // import { reqWeatherMessage } from "../api/index";
  
  export default {
    name: "DailyWeather",
  
    data() {
      return {
        weatherMsg: {},
      };
    },
  
    mounted() {
      // reqWeatherMessage().then(
      //   (res) => {
      //     if (res.data.code == 200) {
      //       this.weatherMsg = res.data.now;
      //     }
      //   },
      //   (rej) => {
      //     console.log(rej);
      //   }
      // );
    },
  
    methods: {},
  };
  </script>
  
  <style lang="less" scoped>
  .weather {
    margin-top: 20px;
    padding: 30px;
    box-sizing: border-box;
    width: 300px;
    height: 270px;
    border-radius: 10px;
    background-color: #fff;
    line-height: 2em;
  
    h1{
      float: left;
      color: #17326f;
      font-size: 20px;
    }
  
    #icon {
      float: right;
      color: #3476f4;
      font-size: 30px;
    }
  
    ul {
      margin-top: 40px;
      padding: 20px 0 0;
      li {
        margin-left: 30px;
        color: #17326f;
  
        span {
          margin-left: 10px;
          color: #3476f4;
          font-style: 18px;
        }
      }
    }
  }
  </style>