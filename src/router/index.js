import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import signup from '../views/signup.vue'
import cityView from '../views/cityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
   
  ]
})

export default router
