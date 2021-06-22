import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

Vue.use(VueRouter)

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/Login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/',
            name: 'Main',
            component: () => import('@/views/Main.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (store.state.TOKEN) {
        to.name === 'Login' ? next({ name: 'Main' }) : next()
    } else {
        to.name === 'Login' ? next() : next({ name: 'Login' })
    }
})

export default router