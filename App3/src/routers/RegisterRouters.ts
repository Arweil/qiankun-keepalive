import { createRouter, createWebHistory } from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';
import Layout from '@/layouts/Index.vue';
import { isQiankun } from '@/utils/isQiankun';

const isLogin = () => true; // TODO:
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: Layout,
    children: [
      // TODO: 改为动态注册路由；meta等信息，目前接口的结构暂无法满足
      {
        path: 'home',
        component: () => import('@/pages/Home/Index.vue'),
        meta: {
          getTabTitle: () => '首页',
        },
        name: 'home',
        meta: {
          keepAlive: true,
        }
      },
      {
        path: 'child/page',
        component: () => import('@/pages/ChildPage/Index.vue'),
        name: 'tagIndex',
        meta: {
          keepAlive: true,
        }
      },
      {
        path: 'nokeep',
        component: () => import('@/pages/NoKeep/Index.vue'),
        name: 'nokeep',
      },
      {
        path: ':otherPath',
        component: () => import('@/errorPages/NotFoundPage.vue'),
      },
    ],
  },
];

export const routerHistory = createWebHistory(isQiankun ? '/app3' : '');

const router = createRouter({
  history: routerHistory,
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  // if(to.fullPath.startsWith('/crm-web')) {
  // 阻止路由监听pushState导致跳不出子应用
  // window.history.pushState(null, to.fullPath, to.fullPath)
  // return false;
  // }
  if (to.meta.type == 'view' && to.query.isView == '1') {
    to.meta.keepAlive = false;
  }
  if (to.meta.requireAuth) {
    if (isLogin()) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
