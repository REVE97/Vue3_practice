import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Design from '../pages/DesignPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home",
    },
    {
      path:'/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/design',
      name: 'design',
      component: Design,
    },
  ],
})

export default router
