<template>
    <div class="search">
      <div class="search-box">
        <input type="text"  placeholder="搜索待办" />
        <ul v-if="false">
          <li v-if="false"><span style="color:red">当前检索下无内容哦~</span></li>
          <li><span>test</span> <em>日期 :2022年12月20日</em></li>
        </ul>
      </div>
      <span id="add">+</span>
    </div>
  </template>
  
  <script setup lang="ts">
//   import { mapState } from "vuex";
//   export default {
//     name: "SearchList",
  
//     data() {
//       return {
//         searchText: "",
//       };
//     },
//     computed: {
//       ...mapState(['todolist']),
//       searchList(){
//           let res = this.todolist.filter(item=>{
//               return item.msg.indexOf(this.searchText) != -1
//           })
//           return res
//       }
//     },
//     methods: {
//       // 右上字体图标打开创建弹出框
//       showMask() {
//         this.$store.dispatch("changeMaskShow", true);
//       },
//       // 跳转到当前日
//       skipList(dater){
//         this.$router.push({
//           path:'/index/list',
//           params:{
//             nowdater:dater
//           }
//         })
//       },
//       emptyText(){
//         setTimeout(()=>{
//           this.searchText = ''
//         },120)
//       }
//     },
//   };
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
        z-index: 999;
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
  
          span{
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