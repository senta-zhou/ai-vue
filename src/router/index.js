import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/BackendLayout.vue";

// 路由配置
const backendRoutes = [
  {
    path: "/back",
    component: BackendLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
    ],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: backendRoutes,
});

// 导出路由实例
export default router;
