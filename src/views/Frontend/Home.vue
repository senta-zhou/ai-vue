<template>
  <div class="page-wrapper">
    <!-- Hero -->
    <div class="home-container">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>

      <div class="content">
        <div class="text-panel">
          <div class="badge">AI 心理陪伴</div>
          <h2 class="title">
            一次温暖的对话<br />
            <span class="highlight-text">化孤独为慰藉</span>
          </h2>
          <p class="description">
            每个深夜，每个焦虑的时刻，我们都在这里<br />
            不必独自承受，让心与心的连接温暖您的每一天
          </p>
          <div class="hero-actions">
            <el-button class="btn-primary" size="large" round @click="goToConsultations">
              开始倾诉，获得陪伴
            </el-button>
            <el-button class="btn-outline" size="large" round @click="goToEmotionDiary">
              记录心情，释放情感
            </el-button>
          </div>
        </div>

        <div class="robot-panel">
          <div class="robot-wrapper">
            <div class="robot-orbital">
              <div class="orbital-ring ring-1"></div>
              <div class="orbital-ring ring-2"></div>
            </div>
            <div class="robot-avatar">
              <el-image :src="iconUrl" alt="智能助手" />
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        <el-icon :size="30"><ArrowDown /></el-icon>
      </div>
    </div>

    <!-- 核心功能 -->
    <section class="features-section">
      <div class="section-header animate-on-scroll">
        <span class="section-badge">核心功能</span>
        <h2 class="section-title">三种方式，陪伴你的每一次情绪波动</h2>
        <p class="section-subtitle">无论你正在经历什么，总有一种方式适合你</p>
      </div>
      <div class="features-grid">
        <div class="feature-card animate-on-scroll" v-for="feature in features" :key="feature.key">
          <div class="feature-icon-wrap">
            <el-icon :size="30"><component :is="feature.icon" /></el-icon>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
          <ul class="feature-points">
            <li v-for="point in feature.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 数据展示条 -->
    <div class="stats-strip">
      <div class="stat-item animate-on-scroll">
        <span class="stat-number">10,000<span class="stat-plus">+</span></span>
        <span class="stat-label">用户在这里找到陪伴</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item animate-on-scroll">
        <span class="stat-number">50,000<span class="stat-plus">+</span></span>
        <span class="stat-label">次温暖对话已完成</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item animate-on-scroll">
        <span class="stat-number">98<span class="stat-plus">%</span></span>
        <span class="stat-label">用户感到情绪改善</span>
      </div>
    </div>

    <!-- 适用场景 -->
    <section class="scenarios-section">
      <div class="section-header animate-on-scroll">
        <span class="section-badge section-badge--warm">适用场景</span>
        <h2 class="section-title">无论你正经历什么，这里都有一份陪伴</h2>
        <p class="section-subtitle">每个人都有自己的不容易，你不需要独自承担</p>
      </div>
      <div class="scenarios-grid">
        <div class="scenario-item animate-on-scroll" v-for="item in scenarios" :key="item.title">
          <div class="scenario-icon">
            <el-icon :size="24"><component :is="item.icon" /></el-icon>
          </div>
          <div class="scenario-info">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 CTA -->
    <section class="cta-section">
      <div class="cta-card animate-on-scroll">
        <h2>准备好开始这段温暖的旅程了吗？</h2>
        <p>注册只需一分钟，从此你的每一次情绪波动，都有人陪伴</p>
        <div class="cta-actions">
          <el-button class="btn-primary" size="large" round @click="goToRegister">
            免费开始使用
          </el-button>
          <el-button class="btn-outline" size="large" round @click="goToKnowledge">
            先了解一下
          </el-button>
        </div>
        <p class="cta-trust">已有 10,000+ 用户在这里找到陪伴</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url).href;

const isLoggedIn = () => localStorage.getItem("token") !== null;

const goTo = (path, needAuth) => {
  if (needAuth && !isLoggedIn()) {
    ElMessage.warning("请先登录");
    router.push("/auth/login");
  } else {
    router.push(path);
  }
};

const goToConsultations = () => goTo("/consultations", true);
const goToEmotionDiary = () => goTo("/emotion-diary", true);
const goToRegister = () => router.push("/auth/register");
const goToKnowledge = () => router.push("/knowledge");

const features = [
  {
    key: "chat", icon: "ChatDotRound", title: "AI 心理咨询",
    description: "每一句话都会被认真倾听。AI 会像一位温柔的朋友，陪你梳理思绪，看见情绪。",
    points: ["实时对话，随时回应你的每一次倾诉", "情绪花园可视化，让你看见内心的变化", "温暖建议，在你需要时递上一句鼓励"],
  },
  {
    key: "diary", icon: "EditPen", title: "情绪日记",
    description: "每天花几分钟记录心情，让模糊的感受变得清晰。坚持记录，你会发现自己比想象中更坚强。",
    points: ["每日情绪评分，量化你的心情变化", "记录触发因素，找到情绪的源头", "睡眠与生活指标，全面关注你的状态"],
  },
  {
    key: "knowledge", icon: "Reading", title: "知识库",
    description: "了解自己的情绪，本身就是一种治愈。阅读专业文章，学习与自己的内心更温柔地相处。",
    points: ["精选心理文章，涵盖常见情绪话题", "专业内容沉淀，易懂又实用", "随时阅读，让知识成为你的力量"],
  },
];

const scenarios = [
  { icon: "Moon", title: "深夜难以入眠", desc: "当思绪纷乱无法入睡，来这里聊聊天，让心慢慢静下来。" },
  { icon: "ChatLineSquare", title: "情绪低落无人倾诉", desc: "有时候只是需要被倾听。在这里，每一次倾诉都会有温暖的回应。" },
  { icon: "Clock", title: "压力和焦虑", desc: "学习看见自己的情绪，用文字梳理内心，找到属于自己的平静。" },
  { icon: "Sunny", title: "想要更好地了解自己", desc: "通过日常记录和专业文章，慢慢发现内心真正的需要和力量。" },
  { icon: "Star", title: "正在经历生活变化", desc: "换工作、毕业、分手…人生的转弯处，我们陪你一起走过。" },
  { icon: "Sunrise", title: "需要日常情绪关怀", desc: "像给身体做体检一样，给你的情绪也做一次温柔的照顾。" },
];

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style lang="scss" scoped>
$primary: #818cf8;
$primary-dark: #6366f1;
$accent: #ffffff;
$text-dark: #1e293b;
$text-body: #475569;
$text-light: #64748b;
$font-sans: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
$font-heading: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
$transition-smooth: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1.2);

:global(html) {
  scroll-behavior: smooth;
}

.page-wrapper {
  font-family: $font-sans;
}

.page-wrapper {
  width: 100%;
}

/* ===== Hero ===== */
.home-container {
  position: relative;
  min-height: calc(100vh - 285px);
  background: linear-gradient(135deg, #8b9cf6 0%, #7b8ef5 30%, #6e81f0 60%, #8495f2 100%);
  background-size: 300% 300%;
  animation: gradientShift 20s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;

  /* 流动光束 */
  &::before {
    content: "";
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.06) 45%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.06) 55%, transparent 60%);
    animation: lightSweep 14s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  /* 底部波浪过渡 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0;
    width: 100%;
    height: 80px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0 45c240-15 480-15 720 0s480 15 720 0v55H0z' fill='rgba(255,255,255,.08)'/%3E%3Cpath d='M0 60c240-10 480-10 720 0s480 10 720 0v40H0z' fill='rgba(255,255,255,.14)'/%3E%3C/svg%3E") no-repeat bottom;
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 1;
  }

  .content { z-index: 1; }
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  animation: glowPulse 8s ease-in-out infinite;
}
.glow-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba($accent, .4), transparent);
  top: -15%; right: -10%;
}
.glow-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(#a5b4fc, .35), transparent);
  bottom: -5%; left: -5%;
  animation-delay: -4s;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes lightSweep {
  0% { transform: translateX(-100%) translateY(-100%); }
  100% { transform: translateX(100%) translateY(100%); }
}

@keyframes glowPulse {
  0%, 100% { opacity: .15; transform: scale(1) translate(0, 0); }
  25% { opacity: .28; transform: scale(1.12) translate(20px, -20px); }
  50% { opacity: .22; transform: scale(1.05) translate(-15px, 10px); }
  75% { opacity: .3; transform: scale(1.1) translate(10px, 15px); }
}

/* ===== 内容布局 ===== */
.content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
  width: 100%;
}

.text-panel {
  flex: 0 0 520px;
  animation: fadeInUp 1s ease-out .1s both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.badge {
  display: inline-block;
  padding: 6px 18px;
  font-size: 13px;
  font-weight: 500;
  color: rgba($accent, .9);
  background: rgba($accent, .12);
  border: 1px solid rgba($accent, .2);
  border-radius: 20px;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.title {
  font-family: $font-heading;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.35;
  color: $accent;
  margin: 0 0 20px;
  letter-spacing: 1px;
  animation: fadeInUp 1s ease-out .3s both;

  .highlight-text { color: $accent; }
}

.description {
  font-size: 16px;
  line-height: 1.8;
  color: rgba($accent, .75);
  margin: 0 0 36px;
  animation: fadeInUp 1s ease-out .45s both;
}

.hero-actions {
  display: flex;
  gap: 16px;
  animation: fadeInUp 1s ease-out .6s both;
}

/* ===== 按钮 ===== */
.btn-primary {
  background: #ffffff !important;
  border: none !important;
  color: #4f46e5 !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  padding: 14px 32px !important;
  height: auto !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, .12);
  transition: $transition-smooth;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, .18);
  }
  &:active { transform: translateY(-1px); }
  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, .8);
    outline-offset: 2px;
  }
}

.btn-outline {
  background: transparent !important;
  border: 2px solid rgba(255, 255, 255, .7) !important;
  color: #ffffff !important;
  font-weight: 500 !important;
  font-size: 16px !important;
  padding: 14px 32px !important;
  height: auto !important;
  transition: $transition-smooth;

  &:hover {
    background: rgba(255, 255, 255, .12) !important;
    border-color: #ffffff !important;
    transform: translateY(-3px);
  }
  &:active { transform: translateY(-1px); }
  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, .8);
    outline-offset: 2px;
  }
}

/* ===== 机器人 ===== */
.robot-panel {
  flex: 0 0 auto;
  animation: fadeInUp 1s ease-out .3s both;
}

.robot-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px; height: 300px;
}

.robot-orbital {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orbital-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, .1);

  &.ring-1 { animation: spinSlow 20s linear infinite; }
  &.ring-2 {
    inset: 30px;
    border-style: dashed;
    border-color: rgba($accent, .12);
    animation: spinSlow 30s linear infinite;
  }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.robot-avatar {
  position: relative;
  z-index: 1;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,.15), rgba(255,255,255,.05));
  border: 2px solid rgba(255, 255, 255, .18);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  box-shadow: 0 20px 48px rgba(0,0,0,.1), 0 0 60px rgba($accent, .08);
  animation: robotFloat 4s ease-in-out infinite;

  :deep(.el-image) {
    width: 100%; height: 100%;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, .15));
  }
}

@keyframes robotFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.03); }
}

/* ===== 滚动提示 ===== */
.scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, .5);
  z-index: 2;
  animation: scrollBounce 2s ease-in-out infinite;
  cursor: default;
  user-select: none;
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: .5; }
  50% { transform: translateX(-50%) translateY(10px); opacity: .9; }
}

/* ===== 通用板块 ===== */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-badge {
  display: inline-block;
  padding: 6px 18px;
  font-size: 13px;
  font-weight: 500;
  color: $primary-dark;
  background: rgba($primary, .1);
  border: 1px solid rgba($primary, .25);
  border-radius: 20px;
  margin-bottom: 20px;
  letter-spacing: 2px;

  &--warm {
    color: #a855f7;
    background: rgba(168, 85, 247, .08);
    border-color: rgba(168, 85, 247, .2);
  }
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: $text-dark;
  margin: 0 0 14px;
  line-height: 1.4;
}

.section-subtitle {
  font-size: 16px;
  color: $text-light;
  margin: 0;
}

/* ===== 功能介绍 ===== */
.features-section {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 40%, #f0f4ff 100%);
  padding: 80px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.feature-card {
  position: relative;
  border-radius: 20px;
  padding: 36px 30px;
  border: 1px solid rgba(0, 0, 0, .04);
  transition: $transition-smooth;
  overflow: hidden;

  &:nth-child(1) { background: linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%); }
  &:nth-child(2) { background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); }
  &:nth-child(3) { background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    opacity: 0;
    transition: opacity .4s ease;
    pointer-events: none;
  }

  &:nth-child(1)::after { background: radial-gradient(circle at 100% 100%, rgba(129,140,248,.2), transparent 60%); }
  &:nth-child(2)::after { background: radial-gradient(circle at 100% 100%, rgba(52,211,153,.2), transparent 60%); }
  &:nth-child(3)::after { background: radial-gradient(circle at 100% 100%, rgba(168,85,247,.2), transparent 60%); }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0,0,0,.1), 0 0 60px rgba($primary, .08);
    &::after { opacity: 1; }
  }

  > * { position: relative; z-index: 1; }
}

.feature-icon-wrap {
  width: 64px; height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .feature-card:nth-child(1) & { background: linear-gradient(135deg, #818cf8, #6366f1); }
  .feature-card:nth-child(2) & { background: linear-gradient(135deg, #34d399, #10b981); }
  .feature-card:nth-child(3) & { background: linear-gradient(135deg, #a855f7, #9333ea); }
}

.feature-icon-wrap :deep(.el-icon) { color: #ffffff; }

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: $text-dark;
  margin: 0 0 12px;
}

.feature-desc {
  font-size: 14px;
  color: $text-body;
  line-height: 1.7;
  margin: 0 0 18px;
}

.feature-points {
  list-style: none;
  padding: 0; margin: 0;

  li {
    position: relative;
    padding-left: 18px;
    font-size: 13px;
    color: $text-light;
    line-height: 1.8;

    &::before {
      content: "";
      position: absolute;
      left: 0; top: 10px;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: $primary;
    }
  }

  .feature-card:nth-child(2) & li::before { background: #34d399; }
  .feature-card:nth-child(3) & li::before { background: #a855f7; }
}

/* ===== 数据展示条 ===== */
.stats-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 56px;
  padding: 56px 20px;
  background: linear-gradient(135deg, #f5f3ff 0%, #eef2ff 50%, #f0fdf4 100%);

  .stat-item {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 42px;
    font-weight: 800;
    color: $text-dark;
    line-height: 1.1;
    margin-bottom: 8px;
    letter-spacing: -1px;
  }

  .stat-plus {
    color: $primary;
  }

  .stat-label {
    font-size: 14px;
    color: $text-light;
  }

  .stat-divider {
    width: 1px;
    height: 48px;
    background: rgba(0, 0, 0, .08);
  }
}

@media (max-width: 768px) {
  .stats-strip {
    flex-direction: column;
    gap: 28px;
    padding: 40px 20px;

    .stat-number { font-size: 32px; }
    .stat-divider { width: 60px; height: 1px; }
  }
}

/* ===== 适用场景 ===== */
.scenarios-section {
  position: relative;
  background: linear-gradient(180deg, #faf8ff 0%, #fdf2f8 50%, #fff7ed 100%);
  padding: 80px 0;
  overflow: hidden;

  /* 背景装饰 */
  &::before {
    content: "";
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(#a855f7, .06), transparent);
    pointer-events: none;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -40px; left: -40px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(#f472b6, .06), transparent);
    pointer-events: none;
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.scenario-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border-left: 3px solid transparent;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .04);
  transition: $transition-smooth;

  &:nth-child(1) { border-left-color: #818cf8; }
  &:nth-child(2) { border-left-color: #f59e0b; }
  &:nth-child(3) { border-left-color: #ef4444; }
  &:nth-child(4) { border-left-color: #34d399; }
  &:nth-child(5) { border-left-color: #a855f7; }
  &:nth-child(6) { border-left-color: #f472b6; }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, .08);
  }
}

.scenario-icon {
  flex-shrink: 0;
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($primary, .08);
  color: $primary;

  .scenario-item:nth-child(1) & { background: rgba(#818cf8, .1); color: #818cf8; }
  .scenario-item:nth-child(2) & { background: rgba(#f59e0b, .1); color: #f59e0b; }
  .scenario-item:nth-child(3) & { background: rgba(#ef4444, .1); color: #ef4444; }
  .scenario-item:nth-child(4) & { background: rgba(#34d399, .1); color: #34d399; }
  .scenario-item:nth-child(5) & { background: rgba(#a855f7, .1); color: #a855f7; }
  .scenario-item:nth-child(6) & { background: rgba(#f472b6, .1); color: #f472b6; }
}

.scenario-info {
  h4 {
    font-size: 15px;
    font-weight: 600;
    color: $text-dark;
    margin: 0 0 6px;
  }
  p {
    font-size: 13px;
    color: $text-light;
    margin: 0;
    line-height: 1.6;
  }
}

/* ===== 底部 CTA ===== */
.cta-section {
  position: relative;
  background: linear-gradient(135deg, #8b9cf6 0%, #7b8ef5 30%, #6e81f0 60%, #8495f2 100%);
  background-size: 300% 300%;
  animation: gradientShift 20s ease-in-out infinite;
  padding: 100px 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;

  /* 顶部波浪 */
  &::before {
    content: "";
    position: absolute;
    top: -1px; left: 0;
    width: 100%;
    height: 60px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'%3E%3Cpath d='M0 30c240-15 480-15 720 0s480 15 720 0v30H0z' fill='rgba(255,255,255,.95)'/%3E%3C/svg%3E") no-repeat top;
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
    animation: none;
  }

  /* 流动光束 */
  &::after {
    content: "";
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.05) 45%, rgba(255,255,255,.12) 50%, rgba(255,255,255,.05) 55%, transparent 60%);
    animation: lightSweep 15s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
}

.cta-card {
  position: relative;
  z-index: 1;
  max-width: 640px;
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, .08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, .15);
  border-radius: 24px;
  padding: 56px 48px;

  h2 {
    font-size: 30px;
    font-weight: 700;
    color: $accent;
    margin: 0 0 14px;
    line-height: 1.4;
  }

  p {
    font-size: 16px;
    color: rgba($accent, .75);
    margin: 0 0 32px;
    line-height: 1.6;
  }
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
}

.cta-trust {
  font-size: 13px !important;
  color: rgba(255, 255, 255, .5) !important;
  margin: 0 !important;
}

/* ===== 滚动动画 ===== */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .7s ease-out, transform .7s ease-out;

  &.visible { opacity: 1; transform: translateY(0); }
}

.feature-card.animate-on-scroll {
  &:nth-child(1) { transition-delay: .05s; }
  &:nth-child(2) { transition-delay: .2s; }
  &:nth-child(3) { transition-delay: .35s; }
  &.visible {
    &:nth-child(1) { transition-delay: .05s; }
    &:nth-child(2) { transition-delay: .2s; }
    &:nth-child(3) { transition-delay: .35s; }
  }
}

/* ===== 辅助功能 ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  :global(html) {
    scroll-behavior: auto;
  }
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
  .content { gap: 40px; }
  .text-panel { flex: 0 0 420px; }
  .title { font-size: 34px; }
  .robot-wrapper { width: 260px; height: 260px; }
  .robot-avatar { width: 180px; height: 180px; }
  .features-grid, .scenarios-grid { grid-template-columns: repeat(2, 1fr); }
  .section-title { font-size: 30px; }
  .features-section, .scenarios-section { padding: 60px 0; }
}

@media (max-width: 768px) {
  .home-container { min-height: auto; padding: 3rem 1.5rem 4rem; }
  .content { flex-direction: column-reverse; gap: 32px; text-align: center; }
  .text-panel { flex: auto; width: 100%; max-width: 480px; }
  .title { font-size: 28px; }
  .description { font-size: 15px; br { display: none; } }
  .hero-actions { flex-direction: column; align-items: center; gap: 12px; }
  .btn-primary, .btn-outline { width: 100%; max-width: 300px; justify-content: center; }
  .robot-wrapper { width: 200px; height: 200px; }
  .robot-avatar { width: 150px; height: 150px; padding: 20px; }
  .orbital-ring.ring-2 { inset: 20px; }
  .features-grid, .scenarios-grid { grid-template-columns: 1fr; max-width: 480px; }
  .section-title { font-size: 26px; }
  .section-subtitle { font-size: 15px; }
  .features-section, .scenarios-section { padding: 48px 0; }
  .section-header { margin-bottom: 40px; }
  .feature-card { padding: 28px 24px; }
  .cta-section { padding: 72px 20px; }
  .cta-card { padding: 36px 24px; h2 { font-size: 24px; } p { font-size: 14px; } }
  .cta-actions { flex-direction: column; align-items: center; gap: 12px; }
}

@media (max-width: 480px) {
  .badge { font-size: 12px; padding: 4px 12px; }
  .title { font-size: 24px; }
  .robot-wrapper { width: 160px; height: 160px; }
  .robot-avatar { width: 120px; height: 120px; padding: 16px; }
  .section-title { font-size: 22px; }
  .features-section, .scenarios-section { padding: 40px 0; }
  .features-grid, .scenarios-grid { padding: 0 16px; }
  .cta-section { padding: 60px 16px; }
  .cta-card { padding: 28px 20px; }
}
</style>
