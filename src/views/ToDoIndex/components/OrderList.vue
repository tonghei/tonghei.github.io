<template>
  <div class="things clearfix">
    <ul>
      <li :class="{ isachieve: item.isChecked }" v-for="item in list">
        <span :class="{
          emergency: 0 == item.priority,
          important: 1 == item.priority,
          priority: 2 == item.priority,
          common: 3 == item.priority,
        }" v-if="!item.isChecked"></span>
        <span :class="{ achieve: item.isChecked }" v-else>
        </span>
        <input type="checkbox" v-model="item.isChecked" @click="changeCheck(item.id)" />
        <p>{{item.msg}}</p>
        <em class="iconfont icon-close" @click="remove(item.id)"></em>
      </li>
      <div class="box" v-show="!list.length">
        <img :src="`/images/list${random}.png`" alt="努力变得优秀哦" />
        <div class="text">
          <h1>快创建今天的待办吧~~</h1>
          <p class="oneSentence">{{ onesentence }}</p>
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoListStores } from "@/stores/todolist";
import { useCalendarStore } from "@/stores/calendar";

import { createLi } from "@/hooks/useAlertMsg";

import { reqOneSentence } from "@/api/idnex";
import { computed } from '@vue/reactivity';

// store
const useTodoList = useTodoListStores()
const useDate = useCalendarStore()

useTodoList.getListContext()

// 数组排序
let list = computed(() => {
  let arr = null
  arr = useTodoList.list.filter(item=>item.date === useDate.nowDay)
  
  return  arr.sort((a, b) => a.priority - b.priority)
})


// 随机图片
let random = ref(`${Math.floor(Math.random() * 9)}`)

// 一言请求
let onesentence = ref<string | undefined>(undefined)

async function oneSentence() {
  const req = await reqOneSentence()
  if (req.status === 200) {
    onesentence.value = (req.data as string).split('"')[1]
  }
}

onMounted(() => {
  try {
    oneSentence()
  } catch (error) {
    createLi("请求超时啦,请稍后再试哦", 0)
  }

})

// 改变状态
function changeCheck(id: string) {
  useTodoList.list.forEach(item => {
    if (item.id === id) {
      item.isChecked = !item.isChecked
    }
  })
}

//移除对应item
function remove(id:string){
  console.log(1);
  
  useTodoList.removeListContext(id)
}
</script>

<style lang="less" scoped>
.things {
  margin-top: 40px;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 10px;

  .box {
    img {
      float: left;
      margin-left: 20px;
    }

    .text {
      width: 400px;
      line-height: 2em;
      float: left;

      h1 {
        color: rgb(23, 50, 111);
        font-size: 20px;
        margin-top: 30px;
        margin-left: 30px;
      }

      .oneSentence {
        margin-top: 40px;
        margin-left: 50px;
        color: rgb(23, 50, 111);
      }
    }
  }

  li {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
    line-height: 60px;
    padding: 0 5px;

    &:hover {
      border-radius: 5px;
      background-color: #ccc;

      em {
        display: block;
      }
    }

    span {
      display: inline-block;
      width: 6px;
      height: 35px;
      border-radius: 3px;
    }

    input {
      margin-left: 15px;
      margin-right: 20px;
      width: 20px;
      height: 20px;
    }

    em {
      display: none;
      position: absolute;
      top: 0;
      right: 3%;
    }
  }
}

.emergency {
  background-color: rgba(235, 61, 60);
}

.important {
  background-color: rgba(248, 103, 22);
}

.priority {
  background-color: rgba(51, 118, 247);
}

.common {
  background-color: rgba(17, 175, 116);
}

.achieve {
  background-color: rgba(152, 146, 146);
}

.isachieve {
  background: rgb(204, 204, 204);
  border-radius: 5px;
}
</style>