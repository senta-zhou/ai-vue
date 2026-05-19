import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/BackendLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";

// 路由配置
const backendRoutes = [
  {
    path: "/back",
    redirect: "/back/dashboard",
    component: BackendLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/Knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/Consultations.vue"),
        meta: {
          title: "咨询管理",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/Emotional.vue"),
        meta: {
          title: "情绪日志",
          icon: "User",
        },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/views/Login.vue"),
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: () => import("@/views/Register.vue"),
        meta: {
          title: "注册",
        },
      },
    ],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: backendRoutes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (userInfo.userType == 2) {
      // 后台页面
      if (to.path.startsWith("/back")) {
        next();
      } else {
        next("/back/dashboard");
      }
    } else if (userInfo.userType == 1) {
      // 前台页面
    }
  } else {
    if (to.path.startsWith("/back")) {
      next("/auth/login");
    } else {
      next();
    }
  }
});

// 导出路由实例
export default router;
