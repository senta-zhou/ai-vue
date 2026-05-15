<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">编辑</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
  </div>
</template>
<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { CategoryTree } from "@/api/admin";
  import PageHead from "@/components/PageHead.vue";
  import TableSearch from "@/components/TableSearch.vue";
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
  const handleSearch = (formData) => {
    console.log(formData, "查询");
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
  });
</script>
