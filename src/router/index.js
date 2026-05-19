import { createRouter, createWebHistory } from 'vue-router'
import Beranda from '../view/Beranda.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beranda',
      component: Beranda
    },
    {
      path: '/prediksi',
      name: 'prediksi',
      component: () => import('../view/Prediksi.vue')
    },
    {
      path: '/hasil-prediksi',
      name: 'hasilPrediksi',
      component: () => import('../view/HasilPrediksi.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../view/Dashboard.vue')
    }
  ]
})

export default router