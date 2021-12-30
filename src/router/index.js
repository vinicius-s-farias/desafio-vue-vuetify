import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Streaming from '../views/Streaming.vue'
import Pokedex from '../views/Pokedex.vue'
import Cripto from '../views/Cripto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/streaming',
    name: 'Streaming',
    component: Streaming
  },
  {
    path: 'pokedex',
    name: 'Pokedex',
    component: Pokedex
  },
  {
    path: '/cripto',
    name: 'Cripto',
    component: Cripto
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
