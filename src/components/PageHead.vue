<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: "页面标题",
    },
  });
</script>

<style lang="scss" scoped>
  .page-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
    .page-title {
      font-size: 24px;
      color: #212529;
    }
  }
</style>
