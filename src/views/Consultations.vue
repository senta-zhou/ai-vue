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
          <div class="session-preview">
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
    <el-dialog
      title="咨询对话详情"
      v-model="showDetailDialog"
      width="70%"
      :close-on-click-modal="false"
    >
      <!-- 会话详情 -->
      <div class="session-detail">
        <!-- 会话头 -->
        <div class="detail-header">
          <div class="detail-row">
            <div class="detail-label">用户：</div>
            <div class="detail-value">
              {{ sessionDetail.userNickname }}
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-label">开始时间：</div>
            <div class="detail-value">
              {{ sessionDetail.startedAt }}
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-label">消息数：</div>
            <div class="detail-value">
              {{ sessionDetail.messageCount }}
            </div>
          </div>
        </div>
        <!-- 会话内容 -->
        <div class="messages-container">
          <div class="messages-header">
            <h4>对话记录</h4>
          </div>
          <!-- 消息列表 -->
          <div class="messages-list" v-loading="loadingMessages">
            <div
              v-for="item in sessionContent"
              :key="item.id"
              class="message-item"
              :class="item.senderType === 1 ? 'user-message' : 'ai-message'"
            >
              <div class="message-header">
                <span class="sender">{{
                  item.senderType === 1 ? "用户" : "AI"
                }}</span>
                <span class="time">{{ item.createdAt }}</span>
              </div>
              <div class="message-content">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button type="primary" @click="showDetailDialog = false"
          >关闭</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import PageHead from "@/components/PageHead.vue";
import { ref, onMounted, reactive } from "vue";
import { getConsultationsPage, getConsultationDetail } from "@/api/admin";

const tableData = ref([]);
const pagination = reactive({
  total: 0,
  size: 10,
  currentPage: 1,
});

// 会话详情弹窗
const showDetailDialog = ref(false);
// 当前会话详情
const sessionDetail = ref({});
// 会话内容
const sessionContent = ref([]);
// 加载中
const loadingMessages = ref(false);

// 查看详情
const viewSessionDetail = (row) => {
  loadingMessages.value = true;
  showDetailDialog.value = true;
  getConsultationDetail(row.id).then((res) => {
    loadingMessages.value = false;
    sessionDetail.value = row;
    sessionContent.value = res;
  });
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

<style lang="scss" scoped>
.session-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}
.session-preview {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.session-detail {
  max-height: 70vh;
  overflow-y: auto;
  .detail-header {
    margin-bottom: 20px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .detail-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    :last-child {
      margin-bottom: 0;
    }
    .detail-label {
      font-weight: 500;
      color: #495057;
      min-width: 80px;
      margin-right: 8px;
    }

    .detail-value {
      color: #333;
    }
  }
}
.messages-container {
  margin-top: 20px;
  .messages-header {
    margin-bottom: 16px;
    h4 {
      margin: 0;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .messages-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 16px;
    background: #fff;
    .message-item {
      margin-bottom: 12px;
      padding: 12px;
      border-radius: 8px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      :last-child {
        margin-bottom: 0;
      }
      &.user-message {
        background: #e8f4fd;
      }

      &.ai-message {
        background: #f0f9f0;
      }
    }
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .sender {
        font-weight: 500;
        color: #333;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .time {
        font-size: 12px;
        color: #999;
      }

      .message-content {
        color: #333;
        line-height: 1.6;
        white-space: pre-wrap;
        margin-top: 8px;
        font-size: 14px;
      }
    }
  }
}
</style>
