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
      <router-view></router-view>
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
    .navbar-container {
      max-width: 1200px;
      height: 100%;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .brand-section {
        display: flex;
        align-items: center;
        .brand-name {
          margin-left: 10px;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }
      }
      .nav-section {
        display: flex;
        align-items: center;
        gap: 40px;
        .nav-link {
          color: #4b5563;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          &:hover {
            color: #4a90e2;
            background-color: rgba(74, 144, 226, 0.1);
          }
          &.active {
            color: #4a90e2;
            background-color: rgba(74, 144, 226, 0.15);
            font-weight: 600;
          }
        }
      }
    }

    .footer-container {
      background: #1f2937;
      color: white;
      padding: 15px 0;
      margin-top: auto;
      .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 10px;
        text-align: center;
      }
    }
  }
</style>
