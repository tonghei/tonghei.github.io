<template>
  <div class="things clearfix">
    <ul>
      <li
        :class="{ isachieve: true }"
      >
        <span
          :class="{
            emergency: true
          }"
        ></span>
        <input
          type="checkbox"
          :checked="true"
        />
        <p>1</p>
        <em class="iconfont icon-close"></em>
      </li>
      <div class="box" v-show="true">
        <img src="/images/list0.png" alt="" />
        <div class="text">
          <h1>快创建今天的待办吧~~</h1>
          <p class="oneSentence">1</p>
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">

// import { mapState } from "vuex";
// import { reqOneSentence} from "../api/index.js";

// export default {
//   name: "TodolistOrderList",

//   data() {
//     return {
//       nowdater: undefined,
//       oneSentence: "",
//     };
//   },
//   computed: {
//     ...mapState(["todolist"]),
//     nowList() {
//       // 筛选当天数组
//       let list = this.todolist.filter((item) => {
//         return item.dater == this.nowdater;
//       });
//       let complete = list.filter((item) => {
//         return item.isChecked;
//       });
//       let type = list.filter((item) => {
//         return !item.isChecked;
//       });

//       type.sort((a, b) => {
//         return a.priority - b.priority;
//       });
//       list = type.concat(complete);
//       return list;
//     },
//     // 随机数
//   },
//   methods: {
//     changeChecked(id) {
//       this.$store.dispatch("changeChecked", id);
//     },
//     removeList(id) {
//       this.$store.dispatch("removeList", id);
//     },
//     getorderDater(dater) {
//       this.nowdater = dater;
//     },
//     // 计算一个随机数返回 生成随机图
//     getRandom() {
//       return Math.floor(Math.random() * 9) + "";
//     },
//   },
//   mounted() {
//     // 全局时间总线接收参数
//     this.$bus.$on("getorderDater", this.getorderDater);


//     //  天气api
//     reqOneSentence().then(
//       (res) => {
//         this.oneSentence = res.data.split('"')[1];
//       },
//       (rej) => {
//         console.log(rej.message);
//       }
//     );
//   },
// };
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