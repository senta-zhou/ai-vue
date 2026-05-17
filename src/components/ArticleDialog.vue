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
            :show-file-list="false"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面图片</p>
            </div>
            <img v-else :src="imgUrl" alt="封面图片" class="cover-image" />
          </el-upload>
          <el-button
            v-if="imgUrl"
            type="danger"
            class="cover-remove"
            @click="removeCover"
            >移除封面</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <RichTextEditor
          v-model="formData.content"
          placeholder="请输入文章内容,支持富文本格式,可使用加粗，斜体，下划线，删除线，列表，代码块，图片，链接，引用等格式"
          max-char-count="5000"
          @change="handleContentChange"
          @created="handleEditorCreated"
          min-height="400px"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
  import { defineProps, computed, ref, reactive } from "vue";
  import { UploadFile } from "@/api/admin";
  import { ElMessage } from "element-plus";
  import { baseUrl } from "@/config";
  import RichTextEditor from "./RichTextEditor.vue";

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
  const handleRequest = async ({ file }) => {
    const businessId = crypto.randomUUID();
    const res = await UploadFile(file, {
      businessId: businessId,
    });
    imgUrl.value = baseUrl + res.filePath;
    formData.coverImage = res.filePath;
  };

  // 移除封面
  const removeCover = () => {
    imgUrl.value = "";
    formData.coverImage = "";
  };

  // 文章内容改变时触发
  const handleContentChange = (content) => {
    formData.content = content;
  };

  // 富文本编辑器创建时触发
  const handleEditorCreated = (editor) => {
    formData.editor = editor;
  };
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
  .cover-image {
    width: 200px;
    height: 120px;
    display: block;
  }
</style>
