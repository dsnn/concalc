import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../features/calculations')
  },
  {
    path: '/assignment/:id',
    name: 'assignment',
    component: () => import('../features/assignments/AssignmentView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
