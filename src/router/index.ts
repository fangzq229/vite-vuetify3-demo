import { createRouter, createWebHistory } from 'vue-router';

// 路由信息
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    children: [
      {
        name: '/',
        path: '/',
        component: () => import('@/views/home.vue'),
      },
      // 商户
      {
        name: '/table/list',
        path: '/table/list',
        component: () => import('@/views/table/list.vue'),
      },
    ],
  },
];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
