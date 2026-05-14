<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <!-- 侧边栏 -->
      <Sidebar />
      <!-- 主内容区域 -->
      <el-container>
        <!-- 导航栏 -->
        <el-header>
          <Navbar />
        </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view class="content-container" />
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
    height: 100vh;
    .main-container {
      height: 100%;
      .el-header {
        height: 74px !important;
      }
      .content-container {
        padding: 20px;
        background-color: #fff;
        min-height: calc(100% - 74px);
      }
    }
  }
</style>
