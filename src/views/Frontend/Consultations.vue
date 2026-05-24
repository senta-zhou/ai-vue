<template>
  <div
    class="consultation-container"
    :class="{ 'sidebar-hidden': !sidebarVisible }"
  >
    <!-- 侧边栏 -->
    <div
      class="sidebar"
      v-show="sidebarVisible"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <!-- ai助手信息 -->
      <div class="ai-assistant-info">
        <div class="breathing-circle">
          <el-image
            :src="iconUrl"
            style="width: 22px; height: 22px"
            alt="ai助手"
          />
        </div>
        <div class="assistant-details">
          <h3 class="assistant-name">宁渡AI助手</h3>
          <div class="online-status">
            <div class="status-dot"></div>
            正在服务中
          </div>
        </div>
      </div>

      <!-- 会话列表 -->
      <div class="session-history">
        <h4 class="section-title">会话列表</h4>
        <div class="session-list">
          <div
            v-for="session in sessionList"
            :key="session.id"
            class="session-item"
            :class="{
              active: currentSession?.sessionId === 'session_' + session.id,
            }"
            @click="handleSelectSession(session)"
          >
            <div class="session-info">
              <div class="session-title">{{ session.sessionTitle }}</div>
              <div class="session-meta">{{ session.startAt }}</div>
              <div class="session-preview">
                {{ session.lastMessageContent }}
              </div>
              <div class="session-stats">
                <span>
                  <el-icon><ChatRound /></el-icon>
                  {{ session.messageCount || 0 }}
                </span>
              </div>
            </div>
            <div class="session-actions">
              <el-button
                text
                type="danger"
                @click.stop="handleDeleteSession(session.id)"
              >
                <el-icon><DeleteFilled /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 情绪花园 -->
      <div class="emotion-garden">
        <div class="garden-header">
          <span class="garden-icon">🌻</span>
          <span class="garden-title">情绪花园</span>
        </div>
        <div class="emotion-row">
          <div class="emotion-circle">
            <div class="emotion-name">{{ currentEmotion.primaryEmotion }}</div>
            <div class="emotion-score">{{ currentEmotion.emotionScore }}</div>
          </div>
          <div class="emotion-detail">
            <div class="emotion-feel">
              {{ currentEmotion.isNegative ? "需要关注" : "很不错" }}
            </div>
            <div class="emotion-intensity">
              <span class="intensity-label">情绪强度</span>
              <span class="intensity-dots">
                <span
                  class="dot"
                  v-for="dot in 3"
                  :key="dot"
                  :class="{
                    active:
                      getIntensityClass(currentEmotion.emotionScore) >= dot,
                  }"
                ></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 拖拽调节条 -->
    <div
      class="resize-handle"
      v-show="sidebarVisible"
      @mousedown="startResize"
    ></div>

    <!-- 聊天主区域 -->
    <div class="chat-main">
      <!-- 顶部标题区域 -->
      <div class="chat-header">
        <div class="header-left">
          <el-button
            circle
            @click="sidebarVisible = !sidebarVisible"
            :title="sidebarVisible ? '隐藏侧边栏' : '显示侧边栏'"
            size="small"
          >
            <el-icon><Fold v-if="sidebarVisible" /><Expand v-else /></el-icon>
          </el-button>
        </div>
        <div class="header-center">
          <span class="session-title-text">{{
            currentSession?.sessionTitle || "新对话"
          }}</span>
        </div>
        <div class="header-right">
          <el-button
            circle
            @click="createNewFrontendSession"
            title="新建对话"
            size="small"
          >
            <el-icon><Plus /></el-icon>
          </el-button>
        </div>
      </div>

      <!-- 对话主体区域 -->
      <div class="chat-messages">
        <!-- 欢迎用语 -->
        <div class="message-item ai-message" v-if="messages.length === 0">
          <div class="message-avatar">
            <el-image :src="iconUrl" style="width: 18px; height: 18px" />
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <p>
                您好！我是小暖，您的AI心理健康助手。很高兴陪伴您，为您提供温暖的心理支持。请告诉我，今天您感觉怎么样？有什么想要分享的吗？
              </p>
            </div>
            <div class="message-time">刚刚</div>
          </div>
        </div>

        <!-- 对话列表 -->
        <div
          class="message-item"
          :class="msg.senderType === 1 ? 'user-message' : 'ai-message'"
          v-for="msg in messages"
          :key="msg.id"
        >
          <div class="message-avatar">
            <el-image
              v-if="msg.senderType === 1"
              :src="iconUrl2"
              style="width: 18px; height: 18px"
            />
            <el-image
              v-if="msg.senderType === 2"
              :src="iconUrl"
              style="width: 18px; height: 18px"
            />
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <!-- ai正在思考中 -->
              <div
                v-if="msg.senderType === 2 && isAiTyping && !msg.content"
                class="typing-indicator"
              >
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
              </div>
              <!-- ai错误信息 -->
              <div v-else-if="msg.isError" class="error-message">
                <p>{{ msg.content }}</p>
              </div>
              <!-- ai正常回复 -->
              <MarkdownRenderer
                v-else-if="msg.senderType === 2 && !msg.isError"
                :content="msg.content"
                :is-ai-message="true"
              />
              <!-- 用户消息 -->
              <p
                v-else-if="msg.content"
                v-html="formatMsgContent(msg.content)"
              ></p>
            </div>
            <div class="message-time">
              {{
                msg.senderType === 2 && isAiTyping
                  ? "正在输入中..."
                  : msg.createdAt
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- 消息输入区域 -->
      <div class="chat-input">
        <div class="input-container">
          <el-input
            v-model="userMessage"
            placeholder="请输入您想输入的内容..."
            type="textarea"
            :rows="3"
            :disabled="isAiTyping"
            @keydown.enter="handleKeyDown"
            class="message-input"
            resize="none"
          />
          <div class="input-footer">
            <span>按Enter发送，Shift+Enter换行</span>
            <span>{{ userMessage.length }} / 500</span>
          </div>
        </div>
        <el-button
          :disabled="!userMessage.trim() || userMessage.length > 500"
          type="primary"
          class="send-btn"
          @click="sendMessage"
        >
          <el-icon><Promotion /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import {
    startSession,
    getSessionList,
    deleteSession,
    getSessionDetail,
    getSessionEmotion,
  } from "@/api/frontend";
  import { ElMessage, ElMessageBox } from "element-plus";
  import {
    ChatRound,
    DeleteFilled,
    Plus,
    Promotion,
    Fold,
    Expand,
  } from "@element-plus/icons-vue";
  import MarkdownRenderer from "@/components/Frontend/MarkdownRenderer.vue";
  import { fetchEventSource } from "@microsoft/fetch-event-source";

  const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url)
    .href;
  const iconUrl2 = new URL("@/assets/images/users.png", import.meta.url).href;
  // 创建新对话
  const createNewFrontendSession = () => {
    // 清空消息列表
    messages.value = [];
    // 创建一个新的会话对象
    const newSession = {
      sessionId: `temp_${Date.now()}`,
      status: "TEMP",
      sessionTitle: "新对话",
    };
    // 设置当前会话为新会话
    currentSession.value = newSession;
  };

  // 侧边栏显示状态
  const sidebarVisible = ref(true);
  // 侧边栏宽度
  const sidebarWidth = ref(260);
  // 拖拽调整宽度
  const isResizing = ref(false);
  let startX = 0;
  let startWidth = 0;

  const startResize = (e) => {
    isResizing.value = true;
    startX = e.clientX;
    startWidth = sidebarWidth.value;
    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const onResize = (e) => {
    if (!isResizing.value) return;
    const delta = e.clientX - startX;
    const newWidth = startWidth + delta;
    if (newWidth >= 200 && newWidth <= 500) {
      sidebarWidth.value = newWidth;
    }
  };

  const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // 定义当前会话对象
  const currentSession = ref(null);

  // 定义对话信息
  const messages = ref([]);
  // 定义会话列表
  const sessionList = ref([]);
  // 定义用户输入的消息
  const userMessage = ref("");
  // 定义AI是否正在输入中
  const isAiTyping = ref(false);
  // 定义情绪花园数据
  const currentEmotion = ref({
    primaryEmotion: "中性",
    emotionScore: 50,
    isNegative: false,
    riskLevel: 0,
    suggestion: "情绪状态平稳",
    improvementSuggestions: [],
  });

  const loadSessionEmotion = (sessionId) => {
    // 确保sessionId格式正确
    const id = sessionId.toString().startsWith("session_")
      ? sessionId
      : `session_${sessionId}`;
    getSessionEmotion(id).then((res) => {
      console.log(res);

      currentEmotion.value = res || {};
    });
  };

  const getIntensityClass = (score) => {
    if (score >= 61) return 3;
    if (score >= 31) return 2;
    return 1;
  };

  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 用户发送消息
  const sendMessage = () => {
    if (!userMessage.value.trim()) return;

    if (isAiTyping.value) {
      ElMessage.error("AI助手正在输入中，请稍后再发送");
      return;
    }

    // 用户输入的消息
    const message = userMessage.value.trim();
    userMessage.value = "";

    // 如果没有会话或者是临时会话的化，需要创建一个新的会话
    if (currentSession.value.status === "TEMP") {
      startNewSession(message);
    } else {
      // 继续现有会话
      messages.value.push({
        id: Date.now(),
        senderType: 1,
        content: message,
        createAt: new Date().toISOString(),
      });
      startAIResponse(currentSession.value.sessionId, message);
    }
  };

  // 开始新会话
  const startNewSession = (message) => {
    // 构建会话参数
    const sessionParams = {
      initialMessage: message,
    };
    if (currentSession.value.sessionTitle === "新对话") {
      sessionParams.sessionTitle = `宁渡AI助手 - ${new Date().toLocaleString()}`;
    } else {
      // 如果不是新对话，使用当前会话标题
      sessionParams.sessionTitle = currentSession.value.sessionTitle;
    }
    // 开始会话
    startSession(sessionParams).then((res) => {
      //  将后端数据转化为前端会话格式
      const sessionData = {
        sessionId: res.sessionId,
        status: res.status,
        sessionTitle: sessionParams.sessionTitle,
      };
      // 如果是临时会话则更新数据，覆盖当前会话数据,更新为正式对话
      if (currentSession.value && currentSession.value.status === "TEMP") {
        // 更新当前会话数据
        Object.assign(currentSession.value, sessionData);
      } else {
        currentSession.value = sessionData;
      }
      // 更新会话列表
      getSessionPage();
      // 添加初始用户信息
      messages.value.push({
        id: Date.now(),
        senderType: 1,
        content: message,
        createAt: new Date().toISOString(),
      });
      // 开启流式对话
      startAIResponse(currentSession.value.sessionId, message);
    });
  };

  const startAIResponse = (sessionId, userMessage) => {
    // 避免重复输入
    if (isAiTyping.value) {
      ElMessage.error("请稍后再发送，AI正在回复中");
      return;
    }
    // 开启AI输入
    isAiTyping.value = true;

    const aiMessage = {
      id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      senderType: 2,
      content: "",
      createAt: new Date().toISOString(),
    };
    messages.value.push(aiMessage);

    // 调用流式接口
    const ctrl = new AbortController(); //用于终止fetch请求
    fetchEventSource("/api/psychological-chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: localStorage.getItem("token"),
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        sessionId,
        userMessage,
      }),
      signal: ctrl.signal, // 用于终止fetch请求
      // 处理流式响应
      onopen: (response) => {
        console.log(response);
        if (response.headers.get("Content-Type") !== "text/event-stream") {
          ElMessage.error("流式接口返回非text/event-stream格式");
        }
      },
      // 处理流式响应数据
      onmessage: (event) => {
        const raw = event.data.trim();
        if (!raw) return;
        const eventName = event.event;
        // 当前会话消息
        const aiMessage = messages.value[messages.value.length - 1];

        if (eventName === "done") {
          isAiTyping.value = false;
          ctrl.abort();
          // 开始情绪分析
          loadSessionEmotion(currentSession.value.sessionId);
          return;
        }
        const payload = JSON.parse(raw);
        const ok = String(payload.code) === "200";
        if (ok && payload.data && payload.data.content) {
          aiMessage.content += payload.data.content;
        } else if (!ok) {
          handleError(payload.message || "AI助手回复失败，请稍后重试");
        }
      },
      onerror: (error) => {
        handleError(error || "ai回复失败，请稍后重试");
        throw error;
      },
      onclose: () => {
        // 开始情绪分析
        loadSessionEmotion(currentSession.value.sessionId);
      },
    });
  };

  // 错误处理函数
  const handleError = (error) => {
    const aiMessage = messages.value[messages.value.length - 1];
    if (aiMessage) {
      aiMessage.content = "ai回复失败，请稍后重试";
    }
    isAiTyping.value = false;
    ElMessage.error(error.message || "未知错误");
  };

  // 获取会话列表
  const getSessionPage = () => {
    getSessionList({
      pageNum: 1,
      pageSize: 10,
    }).then((res) => {
      sessionList.value = res.records || [];
    });
  };

  // 选择会话
  const handleSelectSession = (session) => {
    getSessionDetail(session.id).then((res) => {
      messages.value = res || [];
    });
    loadSessionEmotion(session.id);
    // 更新当前会话
    const sessionData = {
      sessionId: "session_" + session.id,
      status: "ACTIVE",
      sessionTitle: session.sessionTitle,
    };
    currentSession.value = sessionData;
  };

  // 删除会话
  const handleDeleteSession = (sessionId) => {
    console.log(sessionId);
    ElMessageBox.confirm("确认删除吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      deleteSession(sessionId).then((res) => {
        ElMessage.success("删除成功");
        // 如果删除的是当前选中的会话，则清空聊天记录并创建新对话
        if (
          currentSession.value &&
          currentSession.value.sessionId === `session_${sessionId}`
        ) {
          messages.value = [];
          createNewFrontendSession();
        }
        // 删除成功后，刷新会话列表
        getSessionPage();
      });
    });
  };

  // 处理简单换行逻辑
  const formatMsgContent = (content) => {
    return content.replace(/\n/g, "<br>");
  };

  // 页面首次加载时创建一个新的对话
  onMounted(() => {
    // 页面首次加载时创建一个新的对话
    createNewFrontendSession();

    // 获取会话列表
    getSessionPage();
  });
</script>

<style lang="scss" scoped>
  .consultation-container {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    display: flex;
    padding: 0 20px 20px;
    box-sizing: border-box;
    transition: width 0.3s ease;
    &.sidebar-hidden {
      width: 100%;
    }
    .resize-handle {
      width: 6px;
      flex-shrink: 0;
      cursor: col-resize;
      position: relative;
      margin: 0 4px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        border-radius: 1px;
        background: transparent;
        transition: background 0.2s;
      }
      &:hover::after,
      &:active::after {
        background: rgba(251, 146, 60, 0.4);
      }
    }
    .sidebar {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      scrollbar-width: thin;
      scrollbar-color: rgba(251, 146, 60, 0.2) transparent;
      animation: slideInLeft 0.5s ease-out both;
      .ai-assistant-info {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.9) 0%,
          rgba(255, 252, 248, 0.95) 100%
        );
        border-radius: 16px;
        padding: 12px 16px;
        box-shadow:
          0 8px 32px rgba(251, 146, 60, 0.06),
          0 2px 8px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(251, 146, 60, 0.08);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        flex-shrink: 0;
        .breathing-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #fb923c 0%, #f59e0b 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: breathing 4s ease-in-out infinite;
          box-shadow: 0 6px 24px rgba(251, 146, 60, 0.25);
          position: relative;
        }
        .assistant-details {
          flex: 1;
          min-width: 0;
        }
        .assistant-name {
          font-size: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #fb923c, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 4px;
        }
        .online-status {
          display: flex;
          align-items: center;
          color: #059669;
          font-size: 12px;
          font-weight: 600;
          .status-dot {
            width: 8px;
            height: 8px;
            background: #059669;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
            box-shadow: 0 0 8px rgba(5, 150, 105, 0.4);
          }
        }
      }
      .session-history {
        flex: 1;
        background: white;
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        min-height: 0;
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .session-list {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(64, 150, 255, 0.3) transparent;
          .session-item {
            position: relative;
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            &:hover {
              background: #f8f9ff;
              border-color: #e6f0ff;
              .session-actions {
                opacity: 1;
                visibility: visible;
              }
            }
            &.active {
              background: #e6f0ff;
              border-color: #4096ff;
            }
            .session-info {
              flex: 1;
              min-width: 0;
              .session-title {
                font-weight: 500;
                font-size: 14px;
                color: #333;
                margin-bottom: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .session-meta {
                font-size: 12px;
                color: #999;
                margin-bottom: 4px;
              }
              .session-preview {
                font-size: 12px;
                color: #666;
                margin-bottom: 6px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .session-stats {
                display: flex;
                align-items: center;
                gap: 12px;
                span {
                  font-size: 12px;
                  color: #999;
                  display: flex;
                  align-items: center;
                  gap: 4px;
                }
              }
            }
            .session-actions {
              position: absolute;
              bottom: 5px;
              right: 8px;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
              .el-button {
                padding: 4px 8px;
                font-size: 14px;
                border-radius: 4px;
              }
            }
          }
          .no-sessions-text {
            text-align: center;
            font-size: 14px;
            color: #999;
          }
        }
      }
      .emotion-garden {
        background: linear-gradient(
          160deg,
          #fefcf5 0%,
          #fdf6ea 30%,
          #faf0e0 100%
        );
        border-radius: 14px;
        padding: 14px 16px;
        box-shadow:
          0 4px 20px rgba(180, 140, 100, 0.08),
          0 1px 4px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(200, 170, 130, 0.15);
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
        &::before {
          content: "";
          position: absolute;
          top: -20px;
          right: -20px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 183, 128, 0.15) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .garden-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
          position: relative;
          .garden-icon {
            font-size: 15px;
          }
          .garden-title {
            font-size: 13px;
            font-weight: 600;
            color: #8b6914;
            letter-spacing: 0.5px;
          }
        }
        .emotion-row {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
        }
        .emotion-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(
            145deg,
            #f9a8b8 0%,
            #f7c6d0 40%,
            #fad1db 100%
          );
          box-shadow:
            0 4px 14px rgba(249, 168, 184, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          color: #fff;
          .emotion-name {
            font-size: 12px;
            font-weight: 600;
            line-height: 1;
            margin-bottom: 2px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          .emotion-score {
            font-size: 14px;
            font-weight: 700;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        }
        .emotion-detail {
          flex: 1;
          min-width: 0;
          .emotion-feel {
            font-size: 14px;
            font-weight: 600;
            color: #6b4c2b;
            margin-bottom: 8px;
          }
          .emotion-intensity {
            display: flex;
            align-items: center;
            gap: 10px;
            .intensity-label {
              font-size: 11px;
              color: #a0896c;
              font-weight: 500;
            }
            .intensity-dots {
              display: flex;
              gap: 5px;
              .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #e5d9cc;
                transition: all 0.35s ease;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
                &.active {
                  background: linear-gradient(135deg, #f9a8b8, #e892a3);
                  transform: scale(1.25);
                  box-shadow:
                    0 2px 6px rgba(249, 168, 184, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }
              }
            }
          }
        }
      }
    }
    .chat-main {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 252, 250, 0.98) 100%
      );
      border-radius: 20px;
      box-shadow:
        0 12px 40px rgba(251, 146, 60, 0.08),
        0 4px 16px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(251, 146, 60, 0.1);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      flex: 1;
      transition: flex 0.3s ease;
      animation: fadeInUp 0.5s ease-out both;
      animation-delay: 0.15s;
      .chat-header {
        background: linear-gradient(135deg, #fb923c 0%, #f59e0b 100%);
        color: white;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        .header-left {
          display: flex;
          align-items: center;
        }
        .header-center {
          flex: 1;
          text-align: center;
          .session-title-text {
            font-size: 15px;
            font-weight: 600;
          }
        }
        .header-right {
          display: flex;
          align-items: center;
        }
      }
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.02) 0%,
          rgba(255, 252, 248, 0.05) 100%
        );
        min-height: 0;
        scrollbar-width: thin;
        scrollbar-color: rgba(251, 146, 60, 0.3) transparent;
        .message-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          .message-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: white;
            flex-shrink: 0;
          }
          &.ai-message {
            .message-avatar {
              background: linear-gradient(135deg, #fb923c, #f59e0b);
              box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
            }
          }
          &.user-message {
            flex-direction: row-reverse;
            .message-avatar {
              background: linear-gradient(135deg, #4096ff, #1677ff);
              box-shadow: 0 4px 12px rgba(64, 150, 255, 0.3);
            }
            .message-content {
              .message-bubble {
                background: linear-gradient(135deg, #4096ff, #1677ff);
                border: none;
                box-shadow: 0 4px 16px rgba(64, 150, 255, 0.2);
                color: #fff;
              }
              .message-time {
                text-align: right;
              }
            }
          }
          .message-content {
            max-width: 70%;
            .message-bubble {
              background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(255, 252, 248, 0.95) 100%
              );
              border-radius: 16px;
              padding: 12px 16px;
              position: relative;
              animation: fadeInUp 0.4s ease-out;
              border: 1px solid rgba(251, 146, 60, 0.1);
              box-shadow: 0 4px 16px rgba(251, 146, 60, 0.05);
              .typing-indicator {
                display: flex;
                gap: 4px;
                padding: 8px 0;
                .typing-dot {
                  width: 8px;
                  height: 8px;
                  background: #ccc;
                  border-radius: 50%;
                  animation: typing 1.5s ease-in-out infinite;
                  &:nth-child(2) {
                    animation-delay: 0.2s;
                  }
                  &:nth-child(3) {
                    animation-delay: 0.4s;
                  }
                }
              }
              /* 错误消息样式 */
              .error-message {
                background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
                border: 1px solid #f87171;
                border-radius: 12px;
                padding: 12px 16px;
                color: #991b1b;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 8px;
              }
            }
            .message-time {
              font-size: 12px;
              color: #999;
              margin-top: 4px;
            }
          }
        }
      }
      .chat-input {
        border-top: 1px solid rgba(251, 146, 60, 0.1);
        padding: 20px 24px;
        display: flex;
        gap: 12px;
        align-items: flex-end;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.5) 0%,
          rgba(255, 252, 248, 0.7) 100%
        );
        backdrop-filter: blur(10px);
        flex-shrink: 0;
        .input-container {
          flex: 1;
        }
        .input-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #78716c;
          font-weight: 500;
        }
        .send-btn {
          height: 60px;
          width: 60px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            #fb923c 0%,
            #f59e0b 100%
          ) !important;
          border: none !important;
          box-shadow: 0 6px 20px rgba(251, 146, 60, 0.25);
          transition: all 0.3s ease;
        }
      }
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes breathing {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.9;
    }
    50% {
      transform: scale(1.15);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.5;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }
</style>
