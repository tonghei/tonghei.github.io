<template>
  <div class="calendar">
      <!-- 日历容器 -->
      <ul v-if="toggleCalendarSizeFlag">
        <li v-for="item in weekDayArr" :key="item.date" @click="changeNowDay(item.date)">
          <h3>{{ weekday(item.weekDay) }}</h3>
          <i :class="{ active: useData.nowDay === item.date }">{{ item.date.split(',')[2] }}</i>
        </li>
      </ul>
    <div v-show="!toggleCalendarSizeFlag" class="calendartitle">
      <em class="iconfont icon-zuoce" @click="changeMonth(-1)"></em>
      <h1>{{ useData.nowDay.split(',')[0] }}年{{ useData.nowDay.split(',')[1] }}月</h1>
      <em class="iconfont icon-youce" @click="changeMonth(1)"></em>
    </div>
      <ul v-show="!toggleCalendarSizeFlag">
        <li v-for="(item, index) in monthDayArr" :key="item.date"
          @click="changeNowDay(item.date, item.date.split(',')[1] === useData.nowDay.split(',')[1], true)">
          <h3 v-show="index <= 6">{{ weekday(item.weekDay) }}</h3>
          <i :class="{
            active: useData.nowDay === item.date,
            forbid: useData.nowDay.split(',')[1] != item.date.split(',')[1]
          }">{{ item.date.split(',')[2] }}</i>
        </li>
      </ul>
    <!-- 下拉栏 -->
    <span @click="changeCalendarSize"></span>
    <!-- 查看数组输出 -->
    <button id="homeBtn" v-show="!toggleCalendarSizeFlag" @click="returnHome">回到今天</button>
  </div>
</template>
  
<script setup lang="ts">
//引入sotre
import { reactive, ref, watch } from "vue";
import { useCalendarStore, } from "@/stores/calendar";
import { useLeapmonth, useMonthDay, weekday } from "@/hooks/useCalendar";
import { transform } from "@vue/compiler-core";
interface DayObj {
  // 格式为年,月,日 如2022,10,01
  date: string
  //
  weekDay: number

}

//初始化store
const useData = useCalendarStore()
//初始化起始天
useData.initNowDay()


//#region 周视图
let weekDayArr = reactive<DayObj[]>([])

function changeWeekDayArr(weekStartDay: string, weekEndDay: string) {
  //格式化 数组
  weekDayArr.length = 0

  // 定义数据
  let startYear = Number(weekStartDay.split(',')[0])
  let startMonth = Number(weekStartDay.split(',')[1])
  let startDay = Number(weekStartDay.split(',')[2])
  let endYear = Number(weekEndDay.split(',')[0])
  let endMonth = Number(weekEndDay.split(',')[1])
  let endDay = Number(weekEndDay.split(',')[2])

  //不为同一月按起始月计算
  let maxDay = useMonthDay(weekStartDay)
  for (let i = 0; i < 7; i++) {
    if (startDay > maxDay) {
      startDay = 1
      startMonth++
      if (startMonth > 12) {
        startMonth = 1
        startYear++
      }
    }
    //拼接字符串格式化数据
    let month = startMonth >= 10 ? startMonth : '0' + startMonth
    let day = startDay >= 10 ? startDay : '0' + startDay

    let obj: DayObj = {
      date: startYear + ',' + month + ',' + day,
      weekDay: i
    }
    startDay++
    weekDayArr.push(obj)
  }
}

//beforeCreate 初始化数组
changeWeekDayArr(useData.weekStartDay as string, useData.weekEndDay)

//监听起始天 有变化重新调用
watch(() => useData.weekStartDay, () => {
  changeWeekDayArr(useData.weekStartDay as string, useData.weekEndDay)
})
//#endregion



//#region   日历 月视图
let monthDayArr = reactive<DayObj[]>([])
function changeMonthDayArr(monthStartDay: string, monthEndDay: string) {
  //格式化 数组
  monthDayArr.length = 0
  // 定义数据
  let startYear = Number(monthStartDay.split(',')[0])
  let startMonth = Number(monthStartDay.split(',')[1])
  let startDay = Number(monthStartDay.split(',')[2])
  let endYear = Number(monthEndDay.split(',')[0])
  let endMonth = Number(monthEndDay.split(',')[1])
  let endDay = Number(monthEndDay.split(',')[2])

  //调用
  const maxDay = calcAllDayNum(monthStartDay, monthEndDay)
  let maxMonthDay = 0
  let weekDay = 0
  for (let i = 0; i < maxDay; i++) {
    maxMonthDay = useMonthDay(`${startYear},${startMonth},${startDay}`)
    if (startDay > maxMonthDay) {
      startDay = 1
      startMonth++
      if (startMonth > 12) {
        startMonth = 1
        startYear++
      }
    }

    if (weekDay > 6) {
      weekDay = 0
    }

    let day = startDay >= 10 ? startDay : '0' + startDay
    let month = startMonth >= 10 ? startMonth : '0' + startMonth
    let obj: DayObj = {
      date: startYear + ',' + month + ',' + day,
      weekDay
    }
    startDay++
    weekDay++
    monthDayArr.push(obj)
  }


}
//计算最大天数
function calcAllDayNum(monthStartDay: string, monthEndDay: string): number {
  //最大天数

  let maxDay = 0

  let startYear = Number(monthStartDay.split(',')[0])
  let startMonth = Number(monthStartDay.split(',')[1])
  let startDay = Number(monthStartDay.split(',')[2])
  let endYear = Number(monthEndDay.split(',')[0])
  let endMonth = Number(monthEndDay.split(',')[1])
  let endDay = Number(monthEndDay.split(',')[2])
  // 跨年标记
  let diffYear = true
  let diffMonth = undefined

  if (startMonth === endMonth) {
    return 28
  } else {
    diffYear = startYear === endYear ? true : false
    if (diffYear) {
      diffMonth = endMonth - startMonth + 1
    } else {
      diffMonth = endMonth - startMonth + 13
    }

    for (let i = 1; i <= diffMonth; i++) {
      if (i === diffMonth) {
        maxDay = maxDay + endDay
      } else {
        let year = startYear
        let month = startMonth + i - 1
        let day = 1

        if (month > 12) {
          month = 1
          year++
        }
        let maxMonthDay = useMonthDay(year + ',' + month + ',' + day)

        if (i === 1) {
          maxDay = maxDay + maxMonthDay - startDay + 1
        } else {
          maxDay = maxDay + maxMonthDay
        }

      }
    }
  }

  return maxDay
}


// 初始化日历月视图
changeMonthDayArr(useData.monthStartDay, useData.monthEndDay)
//监听数据 
watch(() => useData.monthStartDay, () => {
  changeMonthDayArr(useData.monthStartDay, useData.monthEndDay)

})
//#endregion 



//#region 切换大小日历
let toggleCalendarSizeFlag = ref(true)
function changeCalendarSize() {
  toggleCalendarSizeFlag.value = !toggleCalendarSizeFlag.value
}
//#endregion


//#region 点击日历切换当前天
function changeNowDay(data: string, disable: boolean = true, type: boolean = false) {
  if (disable) {
    useData.$patch({
      nowDay: data
    })

    if (type) changeCalendarSize()
  }
}

//#endregion

//#region 切换月份
function changeMonth(num: number) {
  let arr = useData.nowDay.split(',')
  let month: string | number = Number(arr[1]) + num
  let year: string | number = Number(useData.nowDay.split(',')[0])
  if (month > 12) {
    month = 1
    year++
  }

  if (month < 1) {
    month = 12
    year--
  }


  month = month >= 10 ? month + '' : '0' + month;
  year = year + ''
  arr = [year, month, '01']

  useData.$patch({
    nowDay: arr.join(',')
  })

}


//#endregion


//#region 回到今天
function returnHome() {
  useData.$patch({
    nowDay: ''
  })

  useData.initNowDay()
  changeCalendarSize()
}
//#endregion
</script>
  
<style lang="less" scoped>

// 选中状态
.active {
  color: #fff;
  background-color: #3476f4 !important;

  &::after {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    width: 6px;
    height: 6px;
    background: #3476f4;
    border-radius: 50%;
  }
}

// 禁用状态
.forbid {
  cursor: not-allowed !important;
  color: #fff;
  background-color: #94b9ff;
}

.calendar {
  position: relative;
  z-index: 999;
  padding: 10px 0;

  #homeBtn {
    position: absolute;
    top: 20px;
    right: 5%;
    width: 60px;
    height: 25px;
    font-size: 8px;
    background-color: #3476f4;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  .calendartitle {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    height: 70px;
    line-height: 50px;
    color: rgb(136, 136, 136);

    h1 {
      vertical-align: middle;
      margin: 0 50px;
      display: inline-block;
    }

    em {
      vertical-align: middle;
      font-size: 28px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      position: relative;
      width: 14%;
      margin-bottom: 25px;
      text-align: center;

      i {
        display: inline-block;
        width: 46px;
        height: 46px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        border-radius: 50%;
        line-height: 46px;
      }

      h3 {
        line-height: 10px;
        height: 10px;
        font-size: 12px;
        color: #85878c;
        margin-bottom: 15px;
      }
    }
  }

  // 下拉栏
  span {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25px;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      width: 40px;
      height: 4px;
      background-color: #ccc;
      border-radius: 2px;
    }
  }
}
</style>