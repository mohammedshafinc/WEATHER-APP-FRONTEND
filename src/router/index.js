import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import signup from '../views/signup.vue'
import cityView from '../views/cityView.vue'
import asyncview from '../views/asynccityview.vue'
import login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'register',
      component: signup
    },
    {
      path:'/home',
      name:'home',
      component:HomeView
    },
    {
      path:'/city/:state/:city',
      name:'city',
      component:cityView
    },
    {
      path:'/async',
      name:'asyncview',
      component:asyncview
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
   
  ]
})

export default router
