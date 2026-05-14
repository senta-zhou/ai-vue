<template>
  <el-aside width="264px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item
        v-for="item in router.options.routes[0].children"
        :index="item.path"
        :key="item.path"
      >
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  console.log(router, "router");

  const handleOpen = () => {};
  const handleClose = () => {};
</script>
