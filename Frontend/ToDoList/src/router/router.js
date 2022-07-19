import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Views/Login/Login.vue'
import Register from '@/Views/Register/Register.vue'
import ListToDo from '@/Views/ListToDo/ListToDo.vue'

const route = [
    {
        path:'/',
        name :'Register',
        component:Register
    },
    {
        path:'/Login',
        name :'Login',
        component: Login 
    },
    {
        path:'/todolist',
        name:'todo',
        component: ListToDo
    },
    

]
const router = createRouter({
    history: createWebHistory(),
    routes: route
})

export default router

