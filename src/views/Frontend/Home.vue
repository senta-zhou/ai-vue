<template>
  <div class="home-container">
    <!-- 背景光晕 -->
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>
    <div class="bg-glow glow-3"></div>

    <div class="content">
      <!-- 左侧：文案区 -->
      <div class="text-panel">
        <div class="glass-card">
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
            <el-button
              class="btn-primary"
              size="large"
              round
              @click="goToConsultations"
            >
              <span class="btn-icon">💬</span>
              开始倾述，获得陪伴
            </el-button>
            <el-button
              class="btn-outline"
              size="large"
              round
              @click="goToEmotionDiary"
            >
              <span class="btn-icon">📝</span>
              记录心情，释放情感
            </el-button>
          </div>
          <div class="trust-badges">
            <div class="trust-item">
              <span class="trust-icon">🛡️</span>
              <span>隐私安全</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">💜</span>
              <span>专业陪伴</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">🌙</span>
              <span>24h 在线</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：机器人 -->
      <div class="robot-panel">
        <div class="robot-wrapper">
          <div class="robot-orbital">
            <div class="orbital-ring ring-1"></div>
            <div class="orbital-ring ring-2"></div>
            <div class="orbital-ring ring-3"></div>
          </div>
          <div class="robot-avatar">
            <el-image :src="iconUrl" alt="智能助手" />
          </div>
        </div>
      </div>
    </div>

    <!-- 底部波浪装饰 -->
    <div class="wave-decoration">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z"
          fill="rgba(255,255,255,0.06)"
        />
        <path
          d="M0,60 C320,20 640,100 960,60 C1120,40 1280,80 1440,60 L1440,120 L0,120 Z"
          fill="rgba(255,255,255,0.04)"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { ElMessage } from "element-plus";

  const router = useRouter();
  const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url)
    .href;

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  const goToConsultations = () => {
    if (isLoggedIn()) {
      router.push("/consultations");
    } else {
      ElMessage.warning("请先登录");
      router.push("/auth/login");
    }
  };

  const goToEmotionDiary = () => {
    if (isLoggedIn()) {
      router.push("/emotion-diary");
    } else {
      ElMessage.warning("请先登录");
      router.push("/auth/login");
    }
  };
</script>

<style lang="scss" scoped>
  /* ===== 变量 ===== */
  $primary: #60a5fa;
  $primary-dark: #3b82f6;
  $accent: #ffffff;
  $emphasis: #cbd5e1;
  $text-primary: #ffffff;
  $text-warm: #f1f5f9;
  $text-muted: rgba(255, 255, 255, 0.8);

  /* ===== 容器 ===== */
  .home-container {
    position: relative;
    min-height: calc(100vh - 285px);
    background: linear-gradient(
      135deg,
      $primary 0%,
      $primary-dark 50%,
      #3d8b7a 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    overflow: hidden;
  }

  /* ===== 背景光晕 ===== */
  .bg-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.25;
    pointer-events: none;
    animation: glowPulse 8s ease-in-out infinite;
  }
  .glow-1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba($accent, 0.5), transparent);
    top: -15%;
    right: -10%;
    animation-delay: 0s;
  }
  .glow-2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba($emphasis, 0.4), transparent);
    bottom: -10%;
    left: -5%;
    animation-delay: -3s;
  }
  .glow-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba($primary, 0.6), transparent);
    top: 40%;
    left: 50%;
    animation-delay: -6s;
  }

  @keyframes glowPulse {
    0%,
    100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.35;
      transform: scale(1.15);
    }
  }

  /* ===== 主体布局 ===== */
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
    max-width: 1200px;
    width: 100%;
  }

  /* ===== 文案区 ===== */
  .text-panel {
    flex: 0 0 520px;
    animation: fadeInUp 1s ease-out 0.1s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 24px;
    padding: 48px 44px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .badge {
    display: inline-block;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 500;
    color: $accent;
    background: rgba($accent, 0.12);
    border: 1px solid rgba($accent, 0.25);
    border-radius: 20px;
    margin-bottom: 24px;
    letter-spacing: 2px;
  }

  .title {
    font-size: 44px;
    font-weight: 700;
    line-height: 1.35;
    color: $text-primary;
    margin: 0 0 20px 0;
    letter-spacing: 1px;
    animation: fadeInUp 1s ease-out 0.3s both;

    .highlight-text {
      color: $accent;
      position: relative;
      display: inline-block;

      &::after {
        content: "";
        position: absolute;
        bottom: 4px;
        left: 0;
        width: 100%;
        height: 10px;
        background: rgba($accent, 0.2);
        border-radius: 4px;
      }
    }
  }

  .description {
    font-size: 16px;
    line-height: 1.8;
    color: $text-muted;
    margin: 0 0 32px 0;
    animation: fadeInUp 1s ease-out 0.45s both;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    margin-bottom: 36px;
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  /* ===== 按钮 ===== */
  .btn-primary {
    background: linear-gradient(135deg, $primary, $primary-dark) !important;
    border: none !important;
    color: $text-primary !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    padding: 14px 32px !important;
    height: auto !important;
    box-shadow: 0 4px 20px rgba($primary, 0.35);
    transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1.2);

    &:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 8px 32px rgba($primary, 0.5);
    }
    &:active {
      transform: translateY(-1px) scale(1.02);
    }
  }

  .btn-outline {
    background: rgba(255, 255, 255, 0.08) !important;
    border: 1.5px solid rgba(255, 255, 255, 0.35) !important;
    color: $text-warm !important;
    font-weight: 500 !important;
    font-size: 16px !important;
    padding: 14px 32px !important;
    height: auto !important;
    backdrop-filter: blur(10px);
    transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1.2);

    &:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      border-color: rgba(255, 255, 255, 0.55) !important;
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
    }
    &:active {
      transform: translateY(-1px) scale(1.02);
    }
  }

  .btn-icon {
    margin-right: 6px;
  }

  /* ===== 信任标识 ===== */
  .trust-badges {
    display: flex;
    gap: 28px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    animation: fadeInUp 1s ease-out 0.75s both;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: $text-muted;
    letter-spacing: 1px;

    .trust-icon {
      font-size: 16px;
    }
  }

  /* ===== 机器人区域 ===== */
  .robot-panel {
    flex: 0 0 auto;
    animation: fadeInUp 1s ease-out 0.3s both;
  }

  .robot-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 320px;
  }

  /* 轨道环 */
  .robot-orbital {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .orbital-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);

    &.ring-1 {
      animation: spinSlow 20s linear infinite;
    }
    &.ring-2 {
      inset: 20px;
      border-color: rgba(255, 255, 255, 0.08);
      animation: spinSlow 25s linear infinite reverse;
    }
    &.ring-3 {
      inset: 50px;
      border-style: dashed;
      border-color: rgba($accent, 0.15);
      animation: spinSlow 30s linear infinite;
    }
  }

  @keyframes spinSlow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 机器人头像 */
  .robot-avatar {
    position: relative;
    z-index: 1;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.06)
    );
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
    box-shadow:
      0 20px 48px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      0 0 60px rgba($accent, 0.1);
    animation:
      robotFloat 4s ease-in-out infinite,
      robotBreath 4s ease-in-out infinite;

    :deep(.el-image) {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
    }
  }

  @keyframes robotFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-14px);
    }
  }

  @keyframes robotBreath {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-14px) scale(1.04);
    }
  }

  /* ===== 波浪装饰 ===== */
  .wave-decoration {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    pointer-events: none;
    overflow: hidden;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  /* ===== 响应式 ===== */
  @media (max-width: 1024px) {
    .content {
      gap: 40px;
    }
    .text-panel {
      flex: 0 0 420px;
    }
    .glass-card {
      padding: 36px 32px;
    }
    .title {
      font-size: 34px;
    }
    .robot-wrapper {
      width: 260px;
      height: 260px;
    }
    .robot-avatar {
      width: 180px;
      height: 180px;
    }
  }

  @media (max-width: 768px) {
    .home-container {
      min-height: auto;
      padding: 3rem 1.5rem 4rem;
    }
    .content {
      flex-direction: column-reverse;
      gap: 32px;
      text-align: center;
    }
    .text-panel {
      flex: auto;
      width: 100%;
      max-width: 480px;
    }
    .glass-card {
      padding: 32px 24px;
      border-radius: 20px;
    }
    .title {
      font-size: 28px;
    }
    .description {
      font-size: 15px;
      br {
        display: none;
      }
    }
    .hero-actions {
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .btn-primary,
    .btn-outline {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
    .trust-badges {
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .highlight-text::after {
      display: none;
    }
    .robot-wrapper {
      width: 200px;
      height: 200px;
    }
    .robot-avatar {
      width: 150px;
      height: 150px;
      padding: 20px;
    }
    .orbital-ring.ring-2 {
      inset: 12px;
    }
    .orbital-ring.ring-3 {
      inset: 32px;
    }
  }

  @media (max-width: 480px) {
    .glass-card {
      padding: 24px 20px;
      border-radius: 16px;
    }
    .title {
      font-size: 24px;
    }
    .badge {
      font-size: 12px;
      padding: 4px 12px;
    }
    .robot-wrapper {
      width: 160px;
      height: 160px;
    }
    .robot-avatar {
      width: 120px;
      height: 120px;
      padding: 16px;
    }
  }
</style>
