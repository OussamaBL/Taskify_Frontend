import { createRouter, createWebHistory } from 'vue-router'
import AppLogin from '@/components/AppLogin.vue';
import AppRegister from '@/components/AppRegister.vue';
import AppTasks from '@/components/AppTasks.vue';

import { useAuthStore } from '@/store/auth.js';

function checkIfLogged() {
  const store = useAuthStore();
  if (store.getUser) return '/Tasks';
}
function checkIfNotLogged() {
  const store = useAuthStore();
  if (!store.getUser) return '/AppLogin';
}
const routes = [
  {
    path: '/AppLogin',
    name: 'AppLogin',
    component: AppLogin,
    beforeEnter: [checkIfLogged],
  },
  {
    path: '/AppRegister',
    name: 'AppRegister',
    component: AppRegister,
    beforeEnter: [checkIfLogged],
  },
  {
    path: '/Tasks',
    name: 'Tasks',
    component: AppTasks,
    beforeEnter: [checkIfNotLogged],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router