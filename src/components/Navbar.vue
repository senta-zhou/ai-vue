<template>
  <div class="navbar">
    <!-- 导航栏左侧内容 -->
    <div class="flex-box">
      <el-button @click="handleCollapse">
        <el-icon><Expand /></el-icon
      ></el-button>
      <p class="page-title">{{ route.meta.title }}</p>
    </div>
    <!-- 导航栏右侧内容 -->
    <div class="flex-box">
      <el-dropdown @command="handleCommand">
        <!-- 触发下拉菜单区域 -->
        <div class="flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p class="user-name">admin</p>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from "@/stores/admin";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import { logout } from "@/api/admin";

const router = useRouter();
const route = useRoute();

const adminStore = useAdminStore();
const handleCommand = (command) => {
  if (command === "logout") {
    // 退出登录逻辑
    ElMessageBox.confirm("确定退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      // 退出登录逻辑
      logout().then(() => {
        // 清除本地存储中的用户信息
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        router.push("/auth/login");
      });
    });
  }
};
const handleCollapse = () => {
  adminStore.toggleCollapse();
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
  background-color: #fff;
  box-shadow: 0 0.0133rem 0.0533rem rgba(0, 21, 41, 0.08);
  border-bottom: 0.0133rem solid #e4e7ed;
  .flex-box {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 20px;
    .page-title {
      margin-left: 20px;
      font-size: 26px;
      font-weight: bold;
      color: #1f2937;
    }
    .user-name {
      margin: 0 5px;
      font-weight: bold;
    }
  }
}
</style>
