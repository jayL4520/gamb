import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "index",
    meta: { title: "index", name: "index" },
    component: () => import("../views/index/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        meta: { title: "home", name: "Home" },
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "mark/:id",
        name: "mark",
        meta: { title: "mark", name: "Mark" },
        component: () => import("../views/mark/index.vue"),
      },
      {
        path: "markKa/:id",
        name: "markKa",
        meta: { title: "mark", name: "MarkKa" },
        component: () => import("../views/markKa/index.vue"),
      },
      {
        path: "sevenstar",
        name: "sevenstar",
        meta: { title: "七星彩", name: "SevenStar" },
        component: () => import("../views/sevenstar/index.vue"),
      },
    ],
  },
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: "/",
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//     const userStore = new useUserStore()
//     // 检查是否需要登录
//     if (to.meta.requiresAuth && !userStore.isLogin()) {
//         // 如果需要登录但未登录，重定向到登录页
//         next({
//             name: 'AuthLogin',
//             query: {redirect: to.fullPath} // 保存目标路由，登录后可以跳转回来
//         })
//         return
//     }
//
//
//     // 其他情况正常放行
//     next()
// })

export default router;
