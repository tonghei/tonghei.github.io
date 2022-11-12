// 日历组件store
// 向外暴露当前天  起始天
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLeapyear,useLeapmonth } from "@/hooks/useCalendar";


// 定义当前天 stroe
export const useCalendarStore = defineStore('counter', () => {
  //定义当前天
  let nowDay = ref<String>('')
  // 初始化nowDay
  function initNowDay(falg: boolean = false) {
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : Number('0' + (date.getMonth() + 1))
    let day = date.getDate() >= 10 ? date.getDate() : Number('0' + date.getDate())
    // 当前nowday无值时  或需要初始化时 初始化nowDay
    if (!nowDay.value || falg) {
      nowDay.value = year + ',' + month + ',' + day
    }
  }

  // 依赖nowday计算startday
  // 返回值为 起始天 年,月,日  如 2022,10,11
  let weekStartDay = computed(() => {
    let weekStartDay = undefined
    // 时间戳
    const data = new Date(nowDay.value as string)
    
    // 周几
    const weekday = data.getDay()
    // 年月日
    const day = data.getDate()
    const month = data.getMonth() + 1
    const year = data.getFullYear()

    let startDay = undefined
    let startMonth = undefined
    let startYear = undefined
    let week = undefined
    weekday === 0 ? week = 6 : week = weekday - 1
    
    if (day < 7) {
      // 起始天可能为负值时
      if (day - week < 1) {
        // 为负
        startDay = day - week
        startMonth = month - 1
        if (startMonth <= 0) {
          startMonth = 12
          startYear = year - 1
        } else {
          startYear = year
        }
        //初始化天
        if (useLeapmonth(startMonth)) {
          // 31天月
          startDay = 31 + startDay
        } else if (startMonth === 2) {
          if (useLeapyear(startYear)) {
            //为闰年时
            startDay = 29 + startDay
          } else {
            //非闰年
            startDay = 28 + startDay
          }
        } else {
          // 普通月
          startDay = 30 + startDay
        }
      }else{
        startDay = day - week
        startMonth = month
        startYear = year
      }
    }else {
      startDay = day - week
      startMonth = month
      startYear = year
    }
    startMonth = startMonth >= 10 ? startMonth : '0' + startMonth

    startDay = startDay >= 10 ? startDay : '0' + startDay
    
    weekStartDay = startYear + ',' + startMonth + ',' + startDay
    
    return weekStartDay
  })

  // 获取月 起始日
  let monthStartDay = computed(() => {
    let monthStartDay = undefined
    const data = new Date(nowDay.value as string)
    // 周几
    let weekday = undefined
    // 年月日
    let day = data.getDate()
    const month = data.getMonth() + 1
    const year = data.getFullYear()

    let startDay = undefined
    let startMonth = undefined
    let startYear = undefined
    let week = undefined

    day = 1
    
    weekday = new Date(`${year},${month},${day}`).getDay()
    week = weekday === 0 ? 6 : weekday - 1
    
    if (weekday === 1) {
      startDay = day
      startMonth = month
      startYear = year
    } else {
      // 为负
      startDay = day - week
      startMonth = month - 1
      if (startMonth <= 0) {
        startMonth = 12
        startYear = year - 1
      } else {
        startYear = year
      }
      
      //初始化天
      if (useLeapmonth(startMonth)) {
        // 31天月
        startDay = 31 + startDay
      } else if (startMonth === 2) {
        if (useLeapyear(startYear)) {
          //为闰年时
          startDay = 29 + startDay
        } else {
          //非闰年
          startDay = 28 + startDay
        }
      } else {
        // 普通月
        startDay = 30 + startDay
      }
    }
    
    startMonth = startMonth >= 10 ? startMonth : '0' + startMonth
    return monthStartDay = startYear + ',' + startMonth + ',' + startDay

  })


  let weekEndDay = computed(() => {
    let weekEndDay = undefined
    // 时间戳
    const data = new Date(nowDay.value as string)
    // 周几
    const weekday = data.getDay()
    // 年月日
    const day = data.getDate()
    const month = data.getMonth() + 1
    const year = data.getFullYear()

    // 存储结束天数据
    let endYear = undefined
    let endMonth = undefined
    let endDay = undefined
    // 计算距周结束剩余天数
    let week = undefined
    weekday === 0 ? week = 0 : week = 7 - weekday
    // 存储最大天数
    let maxDay = undefined
    endDay = day + week

    // 获取当前月最大天数
    if (month === 2) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        maxDay = 29
      } else {
        maxDay = 28
      }
    } else if (useLeapmonth(month)) {
      maxDay = 31
    } else {
      maxDay = 30
    }

    if (endDay > maxDay) {
       endDay = (endDay - maxDay) >10 ? (endDay - maxDay) : '0' + (endDay - maxDay)
      
      endMonth = month + 1
      if (endMonth > 12) {
        endMonth = '01'
        endYear = year + 1
      } else {
        endMonth = (month + 1) >= 10 ? (month + 1) : '0' + (month+ 1)
        endYear = year
      }
    } else {
      endYear = year
      endMonth = month < 10 ? '0' + month : month
      endDay = endDay < 10 ? '0' + endDay : endDay
    }

    return weekEndDay = endYear + ',' + endMonth + ',' + endDay
  })

  // 获取月 结束日
  let monthEndDay = computed(() => {
    let monthEndDay = undefined
    // 时间戳
    const data = new Date(nowDay.value as string)
    // 周几
    let weekday = undefined
    // 年月日
    let day = data.getDate()
    const month = data.getMonth() + 1
    const year = data.getFullYear()

    let endYear = undefined
    let endMonth = undefined
    let endDay = undefined
    let week = undefined

    if (month === 2) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        day = 29
      } else {
        day = 28
      }
    } else if (useLeapmonth(month)) {
      day = 31
    } else {
      day = 30
    }


    weekday = new Date(`${year},${month},${day}`).getDay()
    weekday === 0 ? week = 0 : week = 7 - weekday

    endDay = day + week

    if (weekday === 0) {
      endMonth = month > 10 ? month : '0' + month
      endYear = year
    } else {
      endDay = (endDay - day) > 10 ? (endDay - day) : '0' + (endDay - day)
      endMonth = month + 1
      if (endMonth > 12) {
        endMonth = '01'
        endYear = year + 1
      } else {
        endMonth = (month + 1) > 10 ? month + 1 : '0' + (month + 1)
        endYear = year
      }
    }

    return monthEndDay = endYear + ',' + endMonth + ',' + endDay
  })


  return { nowDay, weekStartDay, monthStartDay, weekEndDay, monthEndDay, initNowDay }
})
