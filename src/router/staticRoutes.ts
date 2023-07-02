import { RouteRecordRaw } from 'vue-router';

export const staticRoutes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '内容管理'
      },
      redirect: '/topic',
      children: [
        {
          path: '/topic',
          name: 'topic',
          component: () => import('@/views/topic/index.vue'),
          meta: {
            title: '帖子管理'
          }
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/views/category/index.vue'),
          meta: {
            title: '类型管理'
          }
        },
      ]
    }
  ]