<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
    <el-table :data="tableData" style="width: 100% margin-top=25px">
      <el-table-column label="文章标题" width="200" fixed="left">
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
        prop="publishedAt"
        label="创建时间"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary">编辑</el-button>
          <el-button
            text
            v-if="scope.row.status === 0 || scope.row.status === 2"
            type="success"
            >发布</el-button
          >
          <el-button text v-if="scope.row.status === 1" type="warning"
            >下线</el-button
          >
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pagenation.size"
      :pager-count="11"
      layout="prev, pager, next"
      :total="pagenation.total"
      @change="handleChange"
      style="margin-top: 25px"
    />
    <ArticleDialog
      v-model:modelValue="dialogVisible"
      :categoryOptions="categoryOptions"
    ></ArticleDialog>
  </div>
</template>
<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { CategoryTree, ArticlePage } from "@/api/admin";
  import PageHead from "@/components/PageHead.vue";
  import TableSearch from "@/components/TableSearch.vue";
  import ArticleDialog from "@/components/ArticleDialog.vue";

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
  const pagenation = reactive({
    currentPage: 1,
    size: 10,
    total: 0,
  });

  const tableData = ref([]);
  const handleSearch = async (formData) => {
    const params = {
      ...pagenation,
      ...formData,
    };
    const { records, total } = await ArticlePage(params);
    tableData.value = records;
    pagenation.total = total;
  };

  // 分页效果
  const handleChange = (page) => {
    pagenation.currentPage = page;
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
</script>
