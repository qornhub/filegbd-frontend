import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Notes from '../pages/Notes.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/notes', component: Notes },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
