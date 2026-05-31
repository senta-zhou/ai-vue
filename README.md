# AI 心理聊天助手

一个基于 Vue 3 + Vite 的心理咨询辅助应用，集成 AI 对话、情绪追踪、心理知识库和管理后台于一体。

## 📋 项目概述

AI 心理聊天助手是一个现代化的心理健康辅助平台，通过智能对话、数据可视化和专业知识库，为用户提供便捷的心理咨询支持和情绪管理工具。

## ✨ 核心功能

### 用户端（Frontend）
- **心理咨询对话** - 与 AI 进行实时的心理健康咨询和对话
- **情绪日记** - 记录日常情绪，追踪情绪变化趋势
- **心理知识库** - 浏览和查阅心理健康相关的专业知识文章
- **咨询历史** - 查看和管理过往咨询记录

### 管理端（Backend）
- **仪表板** - 实时显示平台数据概览和统计分析
- **咨询管理** - 管理用户咨询记录和对话内容
- **情绪数据** - 可视化用户情绪数据，支持趋势分析
- **知识库管理** - CRUD 操作心理知识文章，支持富文本编辑

### 认证系统（Auth）
- 用户登录/注册
- 身份认证和授权管理

## 🛠 技术栈

**前端框架**
- Vue 3 - 最新版本的渐进式 JavaScript 框架
- Vite - 新一代前端构建工具，提供快速的开发体验
- Vue Router 4 - 客户端路由管理
- Pinia 3 - 状态管理库

**UI 与可视化**
- Element Plus - 基于 Vue 3 的企业级 UI 组件库
- ECharts 6 - 数据可视化图表库
- Wangeditor - 富文本编辑器

**网络请求**
- Axios - HTTP 客户端库
- Fetch Event Source - 支持 SSE 流式数据传输

**样式**
- Sass/SCSS - CSS 预处理器

## 📁 项目结构

```
src/
├── views/                  # 页面视图
│   ├── Frontend/          # 用户端页面
│   │   ├── Home.vue       # 首页
│   │   ├── Consultations.vue
│   │   ├── EmotionDiary.vue
│   │   └── Knowledge.vue
│   ├── Backend/           # 管理端页面
│   │   ├── Dashboard.vue
│   │   ├── Consultations.vue
│   │   ├── Emotional.vue
│   │   └── Knowledge.vue
│   └── Auth/              # 认证页面
├── components/            # 可复用组件
│   ├── Frontend/
│   ├── Backend/
│   └── Auth/
├── api/                   # API 请求模块
│   ├── admin.js          # 后台 API
│   └── frontend.js       # 前端 API
├── stores/               # Pinia 状态管理
├── router/               # 路由配置
├── utils/                # 工具函数
└── assets/               # 静态资源
```

## 🚀 快速开始

### 环境要求
- Node.js >= 14.0
- npm >= 6.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
浏览器将自动打开 http://localhost:5173

### 生产构建
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 💡 核心特性

- **实时对话** - 集成 AI API，支持流式响应，提供流畅的对话体验
- **数据可视化** - 使用 ECharts 可视化用户情绪数据和咨询统计
- **响应式设计** - 基于 Element Plus，提供优秀的跨设备用户体验
- **富文本编辑** - 管理员可通过 Wangeditor 编辑和管理知识库文章
- **状态管理** - 使用 Pinia 集中管理应用状态，提高代码可维护性

## 📝 API 模块

### 前端 API (`frontend.js`)
- 咨询对话接口
- 情绪日记 CRUD 操作
- 知识库查询

### 管理端 API (`admin.js`)
- 用户数据统计
- 咨询记录管理
- 知识库内容管理

## 🔐 认证

应用支持基于 Token 的身份认证系统，确保用户数据安全和隐私保护。

## 📦 依赖概览

| 包 | 版本 | 用途 |
|----|------|------|
| vue | ^3.5.34 | 前端框架 |
| vite | ^8.0.12 | 构建工具 |
| element-plus | ^2.14.0 | UI 组件库 |
| echarts | ^6.0.0 | 数据可视化 |
| pinia | ^3.0.4 | 状态管理 |
| axios | ^1.16.1 | HTTP 请求 |

## 🎯 后续计划

- [ ] 集成更多 AI 模型和对话引擎
- [ ] 支持数据导出功能
- [ ] 添加移动端适配
- [ ] 实现离线缓存支持
- [ ] 多语言国际化支持

## 📄 许可证

MIT License

## 👤 作者

Miles Zhou

---

**如有问题或建议，欢迎提出 Issue 或 PR！**
