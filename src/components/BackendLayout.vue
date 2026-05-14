<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <!-- 侧边栏 -->
      <Sidebar />
      <!-- 主内容区域 -->
      <el-container>
        <!-- 导航栏 -->
        <el-header><Navbar /></el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
  import Sidebar from "./Sidebar.vue";
  import Navbar from "./Navbar.vue";
</script>

<style lang="scss" scoped>
  .backend-layout {
    // 高度占满全屏, 包含header, aside, main
    // 100vh 表示视口高度, 即浏览器窗口高度
    // 100% 表示父元素高度
    height: 100vh;
    .main-container {
      height: 100%;
    }
  }
</style>
