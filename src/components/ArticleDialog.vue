<template>
  <el-dialog
    title="新增文章"
    v-model="dialogVisible"
    width="50%"
    @close="handleClose"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入文章标题"
          maxlength="20"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
  import { defineProps, computed, ref, reactive } from "vue";
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });
  const dialogVisible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });

  const emit = defineEmits(["update:modelValue"]);
  const handleClose = () => {};

  // 表单数据
  const formData = reactive({
    title: "",
    content: "",
    coverImage: "",
    categoryId: 0,
    summary: "",
    tags: "",
    id: "",
  });
  const rules = reactive({
    title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  });
</script>
