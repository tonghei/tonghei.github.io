<template>
  <div class="diagram">
    <canvas id="canvas" width="200" height="200">您的浏览器不支持 HTML5 canvas 标签。</canvas>
    <h1>
      今日共<span>{{ all }}</span>项待办,已完成<span>{{ nowNumber }}</span>项
    </h1>
    <img src="/images/pic.png" />
  </div>
</template>
  
<script setup lang="ts">
import { useCalendarStore } from "@/stores/calendar";
import { useTodoListStores } from "@/stores/todolist";
import { computed } from "@vue/reactivity";
import { ref, onMounted, watch, watchEffect } from "vue";
const useDate = useCalendarStore()

const todo = useTodoListStores()

let all = computed(() => {
  let num
  let arr = todo.list
  num = arr.filter(item => item.date === useDate.nowDay).length
  return num
})


let nowNumber = computed(() => {
  let num
  let arr = todo.list
  num = arr.filter(item => item.date === useDate.nowDay && item.isChecked).length
  return num
})

onMounted(() => {
  let c: HTMLCanvasElement | undefined = document.querySelector("#canvas") as HTMLCanvasElement
  let ctx: CanvasRenderingContext2D = c.getContext("2d") as CanvasRenderingContext2D
  let precent = 1
  let num = ref(0.03)


  function drawTrack() {
    // 存储上下文
    (ctx as CanvasRenderingContext2D).save();
    // 开始绘制
    (ctx as CanvasRenderingContext2D).beginPath();
    // 规定线段末端为什么形状 圆形
    (ctx as CanvasRenderingContext2D).lineCap = "round";
    // 设置线段宽度
    (ctx as CanvasRenderingContext2D).lineWidth = 4;
    // 设置轮廓线段颜色 淡灰色
    (ctx as CanvasRenderingContext2D).strokeStyle = "#e5f1fa";
    // 画圆轮廓  前两个为圆心坐标(150,150)  半径100   起始度数  结束度数
    (ctx as CanvasRenderingContext2D).arc(100, 100, 95, 0, 2 * Math.PI);
    // 开始绘制
    (ctx as CanvasRenderingContext2D).stroke();
    // 结束绘制
    (ctx as CanvasRenderingContext2D).closePath();
    // 将各种颜色初始化
    (ctx as CanvasRenderingContext2D).restore();
  }
  drawTrack()
  function drawProgress(num: number) {
    (ctx as CanvasRenderingContext2D).save();
    (ctx as CanvasRenderingContext2D).beginPath();
    (ctx as CanvasRenderingContext2D).lineCap = "round";
    (ctx as CanvasRenderingContext2D).lineWidth = 5;
    (ctx as CanvasRenderingContext2D).strokeStyle = "#2ba0fb";
    // context.arc(x,y,r,sAngle,eAngle,counterclockwise);   //x坐标,y坐标,半径,起始角,结束角,顺时针/逆时针
    (ctx as CanvasRenderingContext2D).arc(
      100,
      100,
      95,
      -Math.PI / 2,
      -Math.PI / 2 + ((2 * num) / 100) * Math.PI
    );
    (ctx as CanvasRenderingContext2D).stroke();
    (ctx as CanvasRenderingContext2D).closePath();
    (ctx as CanvasRenderingContext2D).restore();
  }
  drawProgress(num.value)
  function draw() {
    num.value += 1;
    if (num.value < precent)
      window.requestAnimationFrame(() =>
        setTimeout(() => {
          draw();
        },20)
      );
    else {
      num.value = precent;
    }
    ctx.clearRect(0, 0, 300, 300);
    drawTrack();
    drawProgress(num.value);
  }
  draw()
  watch(() => precent, () => {
    draw()
  })

  watchEffect(() => {
    precent = Math.floor((nowNumber.value / all.value) * 100);
    draw()
  })

})
</script>
  
<style lang="less" scoped>
.diagram {
  position: relative;
  margin-top: 5px;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;
  border-radius: 5%;

  h1 {
    cursor: default;
    margin-top: 5px;
    font-size: 16px;
    line-height: 1.5em;

    span {
      color: #3476f4;
    }
  }

  img {
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
  }
}
</style>