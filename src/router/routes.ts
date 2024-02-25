// 对外暴露配置路由 常量路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由 以后做权限使用
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    // 任意路由重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
