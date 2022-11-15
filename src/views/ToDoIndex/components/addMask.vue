<template>
    <!-- 遮罩层 -->
    <div class="mask" v-if="prop.maskIsShow">
        <div class="mask_box">
            <div class="title">
                <h1>新建待办</h1>
                <span @click="addMessage(true)">确定</span>
                <span @click="addMessage(false)">取消</span>
            </div>
            <textarea placeholder="想做点什么?" v-model="msg"></textarea>
            <div class="mask_bottom">
                <i class="text">选择分类 :</i>
                <ul>
                    <div class="box">
                        <li>
                            <span @click="changeColor(0)"><i></i></span>
                        </li>
                        <li>
                            <span @click="changeColor(1)"><i></i></span>
                        </li>
                        <li>
                            <span @click="changeColor(2)"><i></i></span>
                        </li>
                        <li>
                            <span @click="changeColor(3)"><i></i></span>
                        </li>
                    </div>
                </ul>

                <span class="iconfont icon-jishiben" :class="{
                    emergency: priority === 0,
                    important: priority === 1,
                    priority: priority === 2,
                    common: priority === 3,
                }"></span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createLi } from "@/hooks/useAlertMsg";
import { useCalendarStore } from "@/stores/calendar";
import { useTodoListStores } from "@/stores/todolist";
import { nanoid } from "nanoid";

// 添加待办事项对象
interface todo {
    id: string
    msg: string
    date: string
    priority: number
    isChecked: boolean
}

const useDate = useCalendarStore()
const useToDoList = useTodoListStores()
const emit = defineEmits(['changemaskIsShow'])
const prop = defineProps(['maskIsShow'])
let msg = ref('')

// 添加信息
function addMessage(type: boolean) {
    if (type) {
        // 确定触发事件
        if (!msg.value) {
            createLi("未填写内容哦", 0)
            return
        } else {
            let obj: todo = {
                id: nanoid(),
                msg: msg.value,
                date: useDate.nowDay as string,
                priority: priority.value,
                isChecked: false
            }
            //store 存储
            useToDoList.addListContext(obj)
            //格式化  并关闭
            msg.value = ''
            priority.value = 0
            emit('changemaskIsShow')
            createLi("填写成功,记得完成事件哦")
        }
    } else {
        msg.value = ''
        priority.value = 0
        emit('changemaskIsShow')
        createLi("取消填写内容哦", 0)
    }
}

// 改变 priority颜色
let priority = ref(0)
function changeColor(type: number) {
    priority.value = type
}




</script>

<style lang="less">
// 创建内容遮罩层
.mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(136, 136, 136, 0.3);
    z-index: 9999;

    .mask_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        padding: 20px 50px;
        background-color: #fff;
        border-radius: 20px;
        box-sizing: border-box;

        .title {
            height: 50px;
            line-height: 50px;

            h1 {
                font-size: 22px;
                font-weight: 700;
                float: left;
            }

            span {
                font-size: 15px;
                float: right;
                margin-left: 40px;
                cursor: pointer;

                &:nth-of-type(1) {
                    color: #3476f4;
                }

                &:nth-of-type(2) {
                    color: #888888;
                }
            }
        }

        textarea {
            width: 100%;
            height: 180px;
            border: none;
            outline: none;
            font-size: 14px;
            // 取消拖拽
            resize: none;
            padding: 10px;
            box-sizing: border-box;
            font-family: weiruanyahei;
        }

        .mask_bottom {
            color: #888;

            ul {
                width: 120px;
                height: 30px;
                float: left;
                overflow: hidden;

                .box {
                    position: relative;
                    width: 300px;

                    li {
                        position: relative;
                        width: 30px;
                        height: 30px;
                        float: left;

                        span {
                            position: absolute;
                            left: 0;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            cursor: pointer;
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
                                width: 8px;
                                height: 8px;
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
                                width: 8px;
                                height: 8px;
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
                                width: 8px;
                                height: 8px;
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
                                width: 8px;
                                height: 8px;
                                border-radius: 50%;
                                background-color: rgb(17, 175, 116);
                                border: 2px solid #fff;
                            }
                        }
                    }
                }
            }

            .text {
                float: left;
                margin-top: -2px;
                margin-right: 10px;
            }

            .icon-jishiben {
                float: right;
                margin-top: -12px;
                font-size: 28px;
            }
        }
    }

    .emergency {
        color: rgba(235, 61, 60);
    }

    .important {
        color: rgba(248, 103, 22);
    }

    .priority {
        color: rgba(51, 118, 247);
    }

    .common {
        color: rgba(17, 175, 116);
    }
}
</style>