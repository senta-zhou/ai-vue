<template>
  <div>
    <pageHead title="情绪日志" />
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData">
      <el-table-column prop="id" label="用户ID" width="70" />
      <el-table-column label="会话ID" width="70">
        <template #default="scope">
          <el-avatar>{{ scope.row.nickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="diaryDate" label="记录日期" width="120" />
      <el-table-column label="情绪评分">
        <template #default="scope">
          <el-rate :model-value="scope.row.moodScore" :max="10" disabled />
        </template>
      </el-table-column>
      <el-table-column label="生活指标" width="120">
        <template #default="scope">
          <div>
            <p>睡眠：{{ scope.row.sleepQuality }}/5</p>
          </div>
          <div>
            <p>压力：{{ scope.row.stressLevel }}/5</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="emotionTriggers"
        label="情绪触发因素"
        width="110"
      />
      <el-table-column
        prop="diaryContentPreview"
        label="日记内容"
        width="110"
      />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="scope">
          <el-button text type="primary">详情</el-button>
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pagination.size"
      layout="prev, pager, next"
      :total="pagination.total"
      @change="handleChange"
      style="margin-top: 25px"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import pageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import { getEmotionDiaryPage } from "@/api/admin";

const formItem = [
  {
    comb: "input",
    label: "用户ID",
    prop: "userId",
    placeholder: "请输入用户ID",
  },
  {
    comb: "select",
    label: "情绪评分",
    prop: "moodScore",
    placeholder: "请选择情绪评分",
    options: [
      {
        label: "低分(1-3)",
        value: "1-3",
      },
      {
        label: "中分(4-6)",
        value: "4-6",
      },
      {
        label: "高分(7-10)",
        value: "7-10",
      },
    ],
  },
];

// 表格数据
const tableData = ref([]);
// 分页数据
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});

// 分页效果
const handleChange = (page) => {
  pagination.currentPage = page;
  handleSearch();
};

// 获取情绪日记分页列表
const handleSearch = async (formData = {}) => {
  const params = {
    ...pagination,
    ...formData,
  };
  const { records, total } = await getEmotionDiaryPage(params);
  tableData.value = records;
  pagination.total = total;
};

onMounted(() => {
  handleSearch();
});
</script>
