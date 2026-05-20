<template>
  <el-dialog
    :title="isEdit ? '编辑文章' : '新增文章'"
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
            <img
              v-if="imgUrl"
              :src="imgUrl"
              alt="封面图片"
              class="cover-image"
            />
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
          :max-char-count="5000"
          @change="handleContentChange"
          @created="handleEditorCreated"
          min-height="400px"
        />
      </el-form-item>
    </el-form>
    <div v-if="btnPreview" class="preview-container">
      <div class="preview-title">内容预览</div>
      <div class="preview-content">
        <div v-html="formData.content"></div>
      </div>
    </div>
    <template #footer>
      <el-button type="info" @click="btnPreview = !btnPreview">
        {{ btnPreview ? "隐藏预览" : "预览效果" }}</el-button
      >
      <el-button type="danger" @click="handleClose"> 取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        {{ isEdit ? "更新文章" : "创建文章" }}</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, computed, ref, reactive, nextTick, watch } from "vue";
import { UploadFile, AddArticle, UpdateArticle } from "@/api/admin";
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
  article: {
    type: Object,
    default: null,
  },
});
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.article?.id);
const emit = defineEmits(["update:modelValue", "success"]);

const handleClose = () => {
  formRef.value.resetFields();
  businessId.value = null;
  formData.tagArray = [];
  removeCover();
  emit("update:modelValue", false);
};

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
  content: [
    { required: true, message: "请输入文章内容", trigger: "blur" },
    {
      max: 5000,
      message: "文章内容长度必须在5000个字符以内",
      trigger: "blur",
    },
  ],
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
const businessId = ref(null);
// 上传成功
const handleRequest = async ({ file }) => {
  businessId.value = crypto.randomUUID();
  const res = await UploadFile(file, {
    businessId: businessId.value,
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
  formData.content = content.html;
};

// 富文本编辑器创建时触发
const editorInstance = ref(null);
const handleEditorCreated = (editor) => {
  editorInstance.value = editor;
  if (formData.content) {
    nextTick(() => {
      editorInstance.value.setHtml(formData.content);
    });
  }
};

const btnPreview = ref(false);

// 提交
const formRef = ref(null);
const loading = ref(false);
const handleSubmit = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
    }

    const submitData = {
      ...formData,
      tags: (formData.tagArray || []).join(","),
    };
    delete submitData.tagArray;

    if (!isEdit.value) {
      submitData.id = businessId.value;
      AddArticle(submitData).then((res) => {
        loading.value = false;
        emit("success");
        handleClose();
      });
    } else {
      UpdateArticle(submitData.id, submitData).then((res) => {
        loading.value = false;
        emit("success");
        handleClose();
      });
    }
  });
};

// 监听编辑的数据
watch(
  () => props.article,
  (newVal) => {
    nextTick(() => {
      if (newVal) {
        Object.assign(formData, newVal);
        businessId.value = newVal.id;
        imgUrl.value = newVal.coverImage ? baseUrl + newVal.coverImage : "";
      } else {
        removeCover();
      }
    });
  },
);
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
