<template>
  <div class="navbar">
    <!-- 导航栏左侧内容 -->
    <div class="flex-box">
      <el-button @click="handleCollapse">
        <el-icon><Expand /></el-icon
      ></el-button>
      <p class="page-title">导航栏</p>
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
  const adminStore = useAdminStore();
  const handleCommand = (command) => {
    if (command === "logout") {
      // 退出登录逻辑
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
    padding: 0 15px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #e4e7ed;
    .flex-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .page-title {
      font-size: 26px;
      margin-left: 20px;
      font-weight: bold;
      color: #303133;
    }
  }
</style>
