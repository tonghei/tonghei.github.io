<template>
  <div class="navbar-left">
    <div class="userMessage">
      <div class="photo">
        <span>张</span>
      </div>
      <i class="userName">张三</i>
    </div>
    <div class="options">
      <ul>
        <li>
          <router-link to="/ToDoIndex">
            <span class="iconfont icon-check-item"></span>
            我的待办
          </router-link>
        </li>
        <li>
          <router-link to="/DataStatistical">
            <span class="iconfont icon-chart-bar"></span>
            数据统计
          </router-link>
        </li>
        <li>
          <router-link to="/MySetting">
            <span class="iconfont icon-setting"></span>
            设置
          </router-link>
        </li>
        <li>
          <router-link to="/AboutMe">
            <span class="iconfont icon-prompt"></span>
            关于
          </router-link>

        </li>
      </ul>
    </div>
    <div class="classify">
        <h1>分类</h1>
        <ul>
          <li>
            <span><i></i></span>紧急
          </li>
          <li>
            <span><i></i></span>重要
          </li>
          <li>
            <span><i></i></span>优先
          </li>
          <li>
            <span><i></i></span>普通
          </li>
          <li>
            <span><i></i></span>完成
          </li>
        </ul>
      </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="less">
.navbar-left {
  height: 100%;
  box-sizing: border-box;
  width: 260px;
  background-color: #fff;
  padding: 50px 30px;

  // 用户信息
  .userMessage {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    line-height: 50px;

    // 字体头像
    .photo span {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      border-radius: 50%;
      text-align: center;
      background: #3476f4;
    }

    i {
      font-size: 15px;
      margin-left: 10px;
    }
  }

  // 路由栏
  .options {
    margin-top: 20px;

    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-bottom: 15px;
      border-radius: 5px;

      &:hover {
        background-color: #edf6ff;
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        span {
          margin: 0 10px;
          vertical-align: middle;
          font-size: 21px;
        }
      }
    }
  }

  // 事件等级分类栏
  .classify {
    h1 {
      color: #85878c;
    }

    // 等级圆点列表
    ul {
      margin-top: 10px;

      li {
        position: relative;
        margin-left: 10px;
        margin-top: 10px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 35px;
        box-sizing: border-box;

        span {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }

        // 圆点
        &:nth-of-type(1) span {
          text-align: center;
          background-color: rgba(236, 61, 60, 0.3);

          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgb(235, 61, 60);
            border: 2px solid #fff;
          }
        }

        &:nth-of-type(2) span {
          text-align: center;
          background-color: rgba(248, 103, 22, 0.3);

          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgb(248, 103, 22);
            border: 2px solid #fff;
          }
        }

        &:nth-of-type(3) span {
          text-align: center;
          background-color: rgba(51, 118, 247, 0.3);

          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgb(51, 118, 247);
            border: 2px solid #fff;
          }
        }

        &:nth-of-type(4) span {
          text-align: center;
          background-color: rgba(17, 175, 116, 0.3);

          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgb(17, 175, 116);
            border: 2px solid #fff;
          }
        }

        &:nth-of-type(5) span {
          text-align: center;
          background-color: rgba(152, 146, 146, 0.3);

          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgb(152, 146, 146);
            border: 2px solid #fff;
          }
        }
      }
    }
  }
}
</style>