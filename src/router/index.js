// import { createRouter, createWebHistory } from 'vue-router'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Report from "@/components/Report";
import Thanks from "@/components/Thanks";
import Demo from "@/components/Demo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/report/:name',
        name: 'report',
        component: Report
    },
    {
        path: '/thanks',
        name: 'thanks',
        component: Thanks
    },
    {
        path: '/demo/:name',
        name: 'demo',
        component: Demo
    },
]

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })

const router = new VueRouter({
    routes,
})

export default router

// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title
//     next()
// })
