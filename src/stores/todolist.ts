import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoListStores = defineStore('todoList',()=>{
    interface todo{
        id:string
        msg:string
        date:string
        priority:number
        isChecked:boolean
    }

    let list = ref<todo[]>(JSON.parse(localStorage.getItem('todoList') as string)) || ref([])
    
    //增
    function addListContext(obj:todo){
        let arr = JSON.parse(localStorage.getItem('todoList') as string) || []
        arr.push(obj)
        localStorage.setItem('todoList', JSON.stringify(arr))
        getListContext()
    }
    //删
    function removeListContext(id:string){
        localStorage.setItem('todoList',JSON.stringify(list.value.filter(item=>item.id !== id)))
        getListContext()
    }
    //初始化及刷新
    function getListContext(){
        list.value = JSON.parse(localStorage.getItem('todoList') as string) || []
    }




    return {list,addListContext,getListContext,removeListContext}

})