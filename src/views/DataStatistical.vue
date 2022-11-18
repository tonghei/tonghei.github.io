<template>
  <div id="echarts"></div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { inject, onMounted } from 'vue';

import { useCalendarStore } from "@/stores/calendar";
import { useTodoListStores } from "@/stores/todolist";

import { useMonthDay } from "@/hooks/useCalendar";
const nowDate = useCalendarStore()
const todo = useTodoListStores()
nowDate.initNowDay()
let echarts = inject('ec')

let weekArr = computed(() => {
  let nowday = Number(nowDate.nowDay.split(',')[2])

  let arr: string[] = []
  if (nowday - 6 >= 1) {
    //当前天不会小于月
    for (let i = 0; i < 7; i++) {
      let str = nowDate.nowDay.split(',')[0] + ',' + nowDate.nowDay.split(',')[1] + ',' + (nowday - i)
      arr.unshift(str)
    }
  } else {
    let year = Number(nowDate.nowDay.split(',')[0])
    let beforeyear = year
    let beforemonth = Number(nowDate.nowDay.split(',')[1]) - 1
    let month = Number(nowDate.nowDay.split(',')[1])
    let day = Number(nowDate.nowDay.split(',')[2])
    if (beforemonth < 1) {
      beforeyear--
      beforemonth = 12
    }
    let maxday = useMonthDay(beforeyear + "," + beforemonth + "," + 1)

    for (let i = 0; i < 7; i++) {
      if (day < 1) {
        month = beforemonth
        year = beforeyear
        day = maxday
      }

      let str = year + "," + month + "," + day
      day--
      arr.unshift(str)
    }

  }
  return arr
})

let allNum = computed(() => {
  let arr: number[] = []
  weekArr.value.forEach(item=>{
    let num = 0
    todo.list.forEach( i =>{
      if(i.date === item){
        num++
      }
    })
    arr.push(num)
  })
  return arr
})

let checkedNum = computed(() => {
  let arr: number[] = []

  weekArr.value.forEach(item=>{
    let num = 0
    todo.list.forEach( i =>{
      if(i.date === item && i.isChecked){
        num++
      }
    })
    arr.push(num)
  })
  return arr
  
})


onMounted(() => {
  let myChart = (echarts as any).init(document.querySelector("#echarts"))




  let option = {
    xAxis: {
      data: weekArr.value
    },
    yAxis: {},
    series: [
      {
        data: allNum.value,
        type: 'line',
        smooth: true
      },
      {
        data: checkedNum.value,
        type: 'line',
        smooth: true
      }
    ]
  };

  window.onresize = function () {
    myChart.resize()
  }
  option && myChart.setOption(option);
})
</script>
<style lang="less" scoped>
#echarts {
  height: 500px;
  background-color: #fff;
}
</style>