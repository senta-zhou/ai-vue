<template>
  <div class="frontend-layout">
    <div class="navbar-container">
      <div class="brand-section">
        <el-image
          style="width: 50px; height: 50px"
          :src="iconUrl"
          alt="logo"
        ></el-image>
        <h1 class="brand-name">心理健康AI助手</h1>
      </div>
      <div class="nav-section">
        <router-link to="/" class="nav-link" :class="{ active: isActive('/') }"
          >首页</router-link
        >
        <router-link
          to="/consultations"
          class="nav-link"
          :class="{ active: isActive('/consultations') }"
          v-if="isLoggedIn"
          >AI咨询</router-link
        >
        <router-link
          to="/emotion-diary"
          class="nav-link"
          :class="{ active: isActive('/emotion-diary') }"
          v-if="isLoggedIn"
          >情绪日记</router-link
        >
        <router-link
          to="/knowledge"
          class="nav-link"
          :class="{ active: isActive('/knowledge') }"
          >知识库</router-link
        >
        <el-button class="logout-btn" v-if="isLoggedIn" @click="handleLogout"
          >退出登录</el-button
        >
        <template v-else>
          <router-link to="/auth/login" class="nav-link">登录</router-link>
          <router-link to="/auth/register" class="nav-link">
            <el-button type="primary"> 注册 </el-button>
          </router-link>
        </template>
      </div>
    </div>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="footer-container">
      <div class="footer-bottom">
        <p>&copy; 2026 心理健康AI助手. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { logout } from "@/api/admin";
  import { useRouter, useRoute } from "vue-router";
  import { ElMessage, ElMessageBox } from "element-plus";

  const router = useRouter();
  const route = useRoute();
  const iconUrl = new URL("@/assets/images/机器人.png", import.meta.url).href;

  const isLoggedIn = ref(false);

  // 获取当前路由路径，用于判断高亮
  const currentPath = computed(() => route.path);

  // 判断是否为当前路由
  const isActive = (path) => {
    return currentPath.value === path;
  };

  // 退出登录
  const handleLogout = () => {
    ElMessageBox.confirm("确定退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      logout().then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        isLoggedIn.value = false;
        router.push("/auth/login");
        ElMessage.success("退出登录成功");
      });
    });
  };

  onMounted(() => {
    isLoggedIn.value = localStorage.getItem("token") !== null;
  });
</script>

<style lang="scss" scoped>
  .frontend-layout {
    background-color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .navbar-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(74, 144, 226, 0.08);
      margin-top: 12px;

      .brand-section {
        display: flex;
        align-items: center;
        gap: 12px;

        .brand-name {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1px;
        }
      }

      .nav-section {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(74, 144, 226, 0.06);
        padding: 6px;
        border-radius: 40px;

        .nav-link {
          color: #64748b;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 40px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;

          &:hover {
            color: #3b82f6;
            background: rgba(255, 255, 255, 0.8);
            box-shadow: 0 2px 8px rgba(74, 144, 226, 0.12);
          }

          &.active {
            color: #fff;
            background: linear-gradient(135deg, #3b82f6, #6366f1);
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
            font-weight: 600;
          }
        }

        .logout-btn {
          margin-left: 6px;
          border-radius: 40px;
          padding: 10px 22px;
          font-weight: 500;
          font-size: 14px;
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            color: #ef4444;
            border-color: rgba(239, 68, 68, 0.35);
            background: rgba(254, 242, 242, 0.8);
            box-shadow: 0 2px 12px rgba(239, 68, 68, 0.1);
          }
        }

        :deep(.el-button--primary) {
          border-radius: 40px;
          padding: 10px 22px;
          font-weight: 600;
          font-size: 15px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border: none;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            background: linear-gradient(135deg, #4f8bf7, #7578f5);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
            transform: translateY(-1px);
          }

          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
          }
        }
      }
    }

    .main-content {
      flex: 1;
      overflow: auto;
      min-height: 0;
    }

    .page-fade-enter-active,
    .page-fade-leave-active {
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .page-fade-enter-from {
      opacity: 0;
      transform: translateY(24px);
    }
    .page-fade-leave-to {
      opacity: 0;
      transform: translateY(-12px);
    }

    .footer-container {
      background: #1f2937;
      color: white;
      padding: 15px 0;
      flex-shrink: 0;
      .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 10px;
        text-align: center;
      }
    }
  }
</style>
