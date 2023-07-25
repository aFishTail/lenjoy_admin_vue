import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { routes, whiteRoutes } from './routes'
import storage from '@/utils/storage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  NProgress.start();
  const userInfo = storage.getItem('userInfo')
  if (whiteRoutes.some(e => e.path === to.path) || userInfo) {
    next()
  } else {
    next('/login')
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router
