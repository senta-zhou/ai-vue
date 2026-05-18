<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit({})">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
    <el-table :data="tableData" style="width: 100% margin-top=25px">
      <el-table-column label="文章标题" width="170" fixed="left">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Timer /></el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="150">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Timer /></el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="authorName"
        label="作者"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="readCount"
        label="阅读量"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            text
            v-if="scope.row.status === 0 || scope.row.status === 2"
            type="success"
            @click="handlePublish(scope.row)"
            >发布</el-button
          >
          <el-button
            text
            v-if="scope.row.status === 1"
            type="warning"
            @click="handleUnpublish(scope.row)"
            >下线</el-button
          >
          <el-button text type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pagination.size"
      :pager-count="11"
      layout="prev, pager, next"
      :total="pagination.total"
      @change="handleChange"
      style="margin-top: 25px"
    />
    <ArticleDialog
      v-model:modelValue="dialogVisible"
      :categoryOptions="categoryOptions"
      :article="currentArticle"
      @success="handleSuccess"
    ></ArticleDialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  CategoryTree,
  ArticlePage,
  getArticleDetail,
  ChangeArticleStatus,
  DeleteArticle,
} from "@/api/admin";
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import ArticleDialog from "@/components/ArticleDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";

const formItem = [
  {
    comb: "input",
    prop: "title",
    label: "文章标题",
    placeholder: "请输入文章标题",
  },
  {
    comb: "select",
    prop: "category",
    label: "分类",
    placeholder: "请选择分类",
  },
  {
    comb: "select",
    prop: "status",
    label: "状态",
    placeholder: "请选择状态",
    options: [
      {
        label: "草稿",
        value: 0,
      },
      {
        label: "已发布",
        value: 1,
      },
      {
        label: "已下线",
        value: 2,
      },
    ],
  },
];

// 分页数据
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});

// 表格数据
const tableData = ref([]);
// 搜索文章
const handleSearch = async (formData) => {
  const params = {
    ...pagination,
    ...formData,
  };
  const { records, total } = await ArticlePage(params);
  tableData.value = records;
  pagination.total = total;
};

// 分页效果
const handleChange = (page) => {
  pagination.currentPage = page;
  handleSearch();
};

// 分类映射
const categoryMap = reactive({});
// 分类选项
const categoryOptions = ref([]);
onMounted(async () => {
  const res = await CategoryTree();
  categoryOptions.value = res.map((item) => {
    categoryMap[item.id] = item.categoryName;
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
  formItem[1].options = categoryOptions.value;

  // 获取列表
  handleSearch();
});

// 新增文章弹窗
const dialogVisible = ref(false);
// 当前文章
const currentArticle = ref(null);
// 编辑文章
const handleEdit = (row) => {
  if (!row.id) {
    // 新增文章
    currentArticle.value = {};
    dialogVisible.value = true;
  } else {
    // 编辑文章
    getArticleDetail(row.id).then((res) => {
      currentArticle.value = res;
      dialogVisible.value = true;
    });
  }
};
// 新增文章成功
const handleSuccess = () => {
  dialogVisible.value = false;
  handleSearch();
};

// 发布文章
const handlePublish = (row) => {
  ElMessageBox.confirm(`确认发布文章${row.title}吗？`, "发布确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ChangeArticleStatus(row.id, { status: 1 }).then(() => {
      ElMessage.success("发布成功");
      handleSearch();
    });
  });
};

// 下线文章
const handleUnpublish = (row) => {
  ElMessageBox.confirm(`确认下线文章${row.title}吗？`, "下线确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ChangeArticleStatus(row.id, { status: 2 }).then(() => {
      ElMessage.success("下线成功");
      handleSearch();
    });
  });
};

// 删除文章
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除文章${row.title}吗？`, "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "danger",
  }).then(() => {
    DeleteArticle(row.id).then(() => {
      ElMessage.success("删除成功");
      handleSearch();
    });
  });
};
</script>
