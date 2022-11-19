import type { } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/ToDoIndex',
            component: ()=>import("@/views/ToDoIndex/ToDoIndex.vue")
        },
        {
            path:'/DataStatistical',
            component:()=>import('@/views/DataStatistical.vue')
        },
        {
            path:'/MySetting',
            component:()=>import('@/views/MySetting.vue')
        },
        {
            path:'/AboutMe',
            component:()=>import('@/views/AboutMe.vue')
        },
        {
            path:'/',
            redirect:'/ToDoIndex'
        }
    ]
})

export default router
