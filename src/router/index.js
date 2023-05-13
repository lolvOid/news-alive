import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true,
    },
    {
      path: '/article/:id',
      name: 'article.show',
      component: ()=>import('@/views/Details.vue')
      ,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404Error',
      component:()=>import('@/views/404Error.vue')

    }
  ],
})

export default router
