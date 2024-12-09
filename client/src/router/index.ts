import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NewView from '@/views/NewView.vue'
import RadioView from '@/views/RadioView.vue'

/**
 * Application router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/new',
      name: 'new',
      component: NewView,
    },
    {
      path: '/radio',
      name: 'radio',
      component: RadioView,
    },
  ],
})

export default router
