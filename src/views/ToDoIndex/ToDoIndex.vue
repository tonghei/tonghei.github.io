<template>
  <div id="main">
    <div class="indexLeft">
      <div class="title">
        <h1>我的待办</h1>
        <button @click="maskIsShow = !maskIsShow">新建待办</button>
      </div>
      <!-- 日历组件 -->
      <div class="box">
        <MyCalendar />
      </div>
      <OrderList />
    </div>
    <!-- 右侧栏主体 -->
    <div class="indexRight">
      <div class="title">
        <h1>概览</h1>
      </div>
      <!-- 圆形进度条组件 -->
      <CircularDiagram />

      <DailyWeather />
    </div>
    <Teleport to="#mask">
    <addMask :maskIsShow="maskIsShow" />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CircularDiagram from "@/views/ToDoIndex/components/CircularDiagram.vue";
import DailyWeather from "@/views/ToDoIndex/components/DailyWeather.vue";
import OrderList from "@/views/ToDoIndex/components/OrderList.vue";
import MyCalendar from "@/views/ToDoIndex/components/MyCalendar.vue";
import addMask from "@/views/ToDoIndex/components/addMask.vue";


let maskIsShow = ref(false)
</script>
<style lang="less">
#main {
  display: flex;

  // 主体内容区
  .indexLeft {
    flex: 1;

    // 主体 标题区域
    .title {
      cursor: default;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      h1 {
        font-size: 20px;
        font-weight: 700;
      }

      button {
        border: none;
        width: 150px;
        height: 36px;
        border-radius: 18px;
        color: #fff;
        background-color: #3476f4;
      }
    }

    position: relative;

    // 日历区域
    .box {
      height: 100px;

      .calendar {
        position: absolute;
        margin-top: 5px;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
      }
    }
  }

  // 统计区
  .indexRight {
    margin-left: 30px;
    width: 300px;
    height: 100%;

    // 统计标题区
    .title {
      cursor: default;
      height: 50px;
      line-height: 50px;

      h1 {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}

@media (min-width:1200px) {
  .indexRight {
    display: block;
  }
}

@media (max-width:1200px) {
  .indexRight {
    display: none;
  }
}
</style>