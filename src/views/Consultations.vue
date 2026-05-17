<template>
  <div>
    <PageHead title="咨询记录" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="会话ID" width="70">
        <template #default="scope">
          <el-avatar>{{ scope.row.userNickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="情绪日志">
        <template #default="scope">
          <div class="session-title">
            {{ scope.row.sessionTitle }}
          </div>
          <div class="sessionPreview">
            {{ scope.row.lastMessageContent }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="消息数" prop="messageCount" width="70" />
      <el-table-column label="创建时间" prop="lastMessageTime" width="140" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" text @click="viewSessionDetail(scope.row)"
            >详情</el-button
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
  </div>
</template>

<script setup>
  import PageHead from "@/components/PageHead.vue";
  import { ref, onMounted, reactive } from "vue";
  import { getConsultationsPage } from "@/api/admin";

  const tableData = ref([]);
  const pagination = reactive({
    total: 0,
    size: 10,
    currentPage: 1,
  });

  // 查看详情
  const viewSessionDetail = (row) => {
    console.log(row);
  };

  // 搜索
  const handleSearch = async () => {
    getConsultationsPage(pagination).then((res) => {
      tableData.value = res.records;
      pagination.total = res.total;
    });
  };

  // 分页效果
  const handleChange = (page) => {
    pagination.currentPage = page;
    handleSearch();
  };

  onMounted(() => {
    handleSearch();
  });
</script>
