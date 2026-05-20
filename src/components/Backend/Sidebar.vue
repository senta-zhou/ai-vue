<template>
  <el-aside :width="isCollapse ? '64px' : '224px'">
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      default-active="2"
      class="menu-style"
    >
      <div class="brand">
        <el-image style="width: 50px; height: 50px" :src="iconUrl" alt="logo" />
        <div class="info-card" v-show="!isCollapse">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="sub-title">管理后台</p>
        </div>
      </div>
      <el-menu-item
        v-for="item in router.options.routes[0].children"
        :index="item.path"
        :key="item.path"
        @click="selectMenu"
      >
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useAdminStore } from "@/stores/admin";
  import { computed } from "vue";

  const adminStore = useAdminStore();
  const router = useRouter();
  const isCollapse = computed(() => adminStore.isCollapse);

  const iconUrl = new URL("/src/assets/images/机器人.png", import.meta.url)
    .href;

  const selectMenu = (key) => {
    const currentRoute = router.options.routes[0];
    router.push(`${currentRoute.path}/${key.index}`);
  };
</script>

<style lang="scss" scoped>
  .menu-style {
    height: 100%;
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #e4e7ed;
      .info-card {
        margin-left: 10px;
        .brand-title {
          font-size: 20px;
          font-weight: bold;
          color: #303133;
          margin-bottom: 5px;
        }
        .sub-title {
          font-size: 14px;
          font-weight: normal;
          color: #909399;
        }
      }
    }
  }
</style>
