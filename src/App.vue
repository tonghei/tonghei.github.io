<template>
  <div id="app">
    <NavBarLeft />
    <NavBarRight />
  </div>
  <div id="mask"></div>
</template>
<script setup lang="ts">
import NavBarLeft from "@/components/NavBarLeft/index.vue";
import NavBarRight from "@/components/NavBarRight/index.vue";

</script>

<style lang="less">
#app{
  display: flex;
  width: 100%;
  .navbar-right{
    flex: 1;
  }
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* em 和 i 斜体的文字不倾斜 */
em,
i {
  font-style: normal;
}

/* 去掉li 的小圆点 */
li {
  list-style: none;
}

img {
  /* border 0 照顾低版本浏览器 如果 图片外面包含了链接会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 当我们鼠标经过button 按钮的时候，鼠标变成小手 */
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: none;
  }
}

button,
input {
  /* "\5B8B\4F53" 就是宋体的意思 这样浏览器兼容性比较好 */
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
}

body {
  /* CSS3 抗锯齿形 让文字显示的更加清晰 */
  -webkit-font-smoothing: antialiased;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  background-color: #eef0f4;
  height: 100%;
}

.hide,
.none {
  display: none;
}

/* 清除浮动 */
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

html {
  height: 100%;
}

#app {
  display: flex;
  height: 100%;
}
</style>