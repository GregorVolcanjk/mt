import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios";
import Home from '../views/Home.vue'
import Compare from '../views/Compare.vue'
import Calculator from '../views/Calculator.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/compare',
    name: 'Compare',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Compare
  },
  {
    path: '/calculator',
    name: 'Calculator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Calculator.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router