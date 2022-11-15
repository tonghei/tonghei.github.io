<template>
        <ul id="alertMsg"></ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// const aaa = ref<HTMLElement | null>(null)

// function createLi(val: string, type: number = 1) {
//     let li = document.createElement("li");
//     li.innerText = `${val}`;
//     li.style.opacity = '1';
//     (aaa.value as HTMLElement).appendChild(li)
//     if (!type) {
//         li.style.backgroundColor = "rgb(235, 61, 60)";
//     }
//     setTimeout(() => {
//         let set = setInterval(() => {
//             li.style.opacity = (Number(li.style.opacity) - 0.05) + '';
//             if (Number(li.style.opacity) <= 0) {
//                 (aaa.value as HTMLElement).removeChild(li)
//                 clearInterval(set)
//             }
//         }, 50);
//     }, 1500);
// }

</script>

<style lang="less">
#alertMsg {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-flow: column;
    z-index: 999999999999999;

    li {
        cursor: default;
        padding: 2px 15px;
        margin-bottom: 5px;
        font-size: 14px;
        border-radius: 5px;
        background-color: rgb(19, 199, 61);
        color: #fff;
    }
}
</style>