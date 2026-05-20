import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/Backend/BackendLayout.vue";
import FrontendLayout from "@/components/Frontend/FrontendLayout.vue";
import AuthLayout from "@/components/Auth/AuthLayout.vue";

// 后台路由配置
const backendRoutes = [
  {
    path: "/back",
    redirect: "/back/dashboard",
    component: BackendLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Backend/Dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/Backend/Knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/Backend/Consultations.vue"),
        meta: {
          title: "咨询管理",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/Backend/Emotional.vue"),
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
        component: () => import("@/views/Auth/Login.vue"),
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: () => import("@/views/Auth/Register.vue"),
        meta: {
          title: "注册",
        },
      },
    ],
  },
];

// 前台路由配置
const frontendRoutes = [
  {
    path: "/",
    component: FrontendLayout,
    children: [
      {
        path: "",
        component: () => import("@/views/Frontend/Home.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/Frontend/Consultations.vue"),
        meta: {
          title: "咨询管理",
        },
      },
      {
        path: "/emotion-diary",
        component: () => import("@/views/Frontend/EmotionDiary.vue"),
        meta: {
          title: "情绪日志",
        },
      },
      {
        path: "/knowledge",
        component: () => import("@/views/Frontend/Knowledge.vue"),
        meta: {
          title: "知识文章",
        },
      },
    ],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [...backendRoutes, ...frontendRoutes],
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
