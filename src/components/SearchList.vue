<template>
  <div class="search">
    <h1>{{searchList.length}}</h1>
    <div class="search-box">
      <input type="text" placeholder="搜索待办" v-model="searchText" />
      <ul v-if="searchText">
        <li v-if="searchList.length === 0"><span style="color:red">当前检索下无内容哦~</span></li>
        <li v-for="item in searchList" :key="item.id" @click="changeNowDay(item.date)"><span>{{ item.msg }}</span> <em>日期
            :{{ item.date.split(',')[0] }}年{{ item.date.split(',')[1] }}月{{ item.date.split(',')[2] }}日</em></li>
      </ul>
    </div>
    <span id="add">+</span>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import { useTodoListStores } from "@/stores/todolist";
import { useCalendarStore } from "@/stores/calendar"
import { createLi } from "@/hooks/useAlertMsg";
const todo = useTodoListStores()
const nowDate = useCalendarStore()
let searchText = ref('')

let searchList = computed(() => {
  if (searchText.value) {
    let arr = todo.list
    arr = arr.filter(item => {
      return item.msg.indexOf(searchText.value) !== -1
    })
    return arr
  } else {
    return []
  }

})

function changeNowDay(date:string) {
  nowDate.$patch({
    nowDay:date
  })
  searchText.value = ''
  createLi("已跳转到对应日期")
}

</script>
  
<style lang="less" scoped>
// 搜索栏
.search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 80px;

  .search-box {
    position: relative;

    input {
      margin-right: 30px;
      width: 400px;
      height: 40px;
      border: 0;
      border-radius: 20px;
      outline: none;
      padding: 0 20px;
      box-sizing: border-box;
    }

    ul {
      position: absolute;
      width: 360px;
      padding: 20px 10px 10px;
      z-index: 9999;
      margin-top: 3px;
      margin-left: 8px;
      background-color: #fff;
      border-radius: 10px;

      li {
        display: flex;
        height: 30px;
        line-height: 30px;
        color: rgb(52, 118, 244);
        margin-bottom: 10px;
        padding: 0 10px;
        border-radius: 5px;

        span {
          width: 150px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        em {
          margin-left: 50px;
        }

        &:hover {
          background-color: rgb(237, 246, 255);
        }
      }
    }
  }

  // 字体头像
  #add {
    display: block;
    cursor: pointer;
    margin-right: 60px;
    width: 35px;
    height: 35px;
    line-height: 33px;
    font-size: 30px;
    color: #3476f4;
    border-radius: 50%;
    text-align: center;
    background: #eef0f4;
    border: 3px solid #3476f4;
  }
}
</style>