import { createRouter, createWebHistory } from 'vue-router'
import AppLogin from '@/components/AppLogin.vue';
import AppRegister from '@/components/AppRegister.vue';
import AppTasks from '@/components/AppTasks.vue';

const routes = [
  {
    path: '/AppLogin',
    name: 'AppLogin',
    component: AppLogin
  },
  {
    path: '/AppRegister',
    name: 'AppRegister',
    component: AppRegister
  },
  {
    path: '/Tasks',
    name: 'Tasks',
    component: AppTasks
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router