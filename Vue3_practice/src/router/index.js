import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Table from '../pages/TablePage.vue'
import Select from '../pages/SelectPage.vue'
import Input from '../pages/InputPage.vue'
import Axios from '../pages/AxiosPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/table',
      name: 'table',
      component: Table,
    },
    {
      path: '/select',
      name: 'select',
      component: Select,
    },
    {
      path: '/input',
      name: 'input',
      component: Input,
    },
    {
      path: '/axios',
      name: 'axios',
      component: Axios,
    }
  ],
})

export default router
