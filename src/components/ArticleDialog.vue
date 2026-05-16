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
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input
          type="textarea"
          v-model="formData.summary"
          placeholder="请输入文章摘要"
          maxlength="2000"
          show-word-limit
          :rows="4"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="formData.tagArray"
          placeholder="请选择标签"
          multiple
          filterable
          allow-create
          width="100%"
        >
          <el-option
            v-for="tag in commonTags"
            :key="tag"
            :label="tag"
            :value="tag"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload
            class="avatar-uploader"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handleRequest"
            accept="image/*"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面图片</p>
            </div>
            <img v-else :src="imgUrl" alt="封面图片" class="cover-image" />
          </el-upload>
        </div>
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
    categoryOptions: {
      type: Array,
      default: () => [],
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
    categoryId: 1,
    summary: "",
    tags: "",
    id: "",
  });
  const rules = reactive({
    title: [
      { required: true, message: "请输入文章标题", trigger: "blur" },
      {
        min: 1,
        max: 20,
        message: "文章标题长度必须在1到20个字符之间",
        trigger: "blur",
      },
    ],
    categoryId: [{ required: true, message: "请选择分类", trigger: "change" }],
  });
  const commonTags = [
    "情绪管理",
    "焦虑",
    "抑郁",
    "压力",
    "睡眠",
    "冥想",
    "正念",
    "放松",
    "心理健康",
    "自我成长",
    "人际关系",
    "工作压力",
    "学习方法",
    "生活技巧",
  ];

  // 上传
  const imgUrl = ref("");
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      ElMessage.error("请上传图片文件");
      return false;
    }
    if (file.size > 1024 * 1024 * 5) {
      ElMessage.error("图片大小不能超过5MB");
      return false;
    }
    return true;
  };
  // 上传成功
  const handleRequest = () => {};
</script>

<style lang="scss" scoped>
  .cover-placeholder {
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #8b949e;
    background-color: #f6f8fa;
  }
</style>
