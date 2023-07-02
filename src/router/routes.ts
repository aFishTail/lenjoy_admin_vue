import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { staticRoutes } from './staticRoutes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    meta: {
      title: 'home'
    },
    redirect: '/topic',
    children:   staticRoutes}
]
