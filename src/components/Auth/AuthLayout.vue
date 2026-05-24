<template>
  <div class="auth-layout">
    <div class="left-section">
      <div class="bg-glow glow-1" />
      <div class="bg-glow glow-2" />
      <div class="content">
        <h2 class="title animate-in">心理AI助手</h2>
        <p class="text animate-in">
          在这个深夜，每个焦虑的时刻我们都在这里，不必独自承受，让心与心的连接温暖您的每一天
        </p>
        <div class="robot animate-in">
          <div class="robot-ring" />
          <el-image
            style="width: 90px; height: 90px"
            :src="iconUrl"
            alt="心理AI助手"
          />
        </div>
      </div>
    </div>
    <div class="right-section">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup>
const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url).href;
</script>
<style lang="scss" scoped>
.auth-layout {
  display: flex;

  .left-section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: linear-gradient(
        135deg,
        rgb(74, 156, 140) 0%,
        rgb(61, 138, 122) 50%,
        rgb(74, 156, 140) 100%
      );
    background-size: 200% 200%;
    animation: gradientShift 12s ease-in-out infinite;
    height: 100vh;
    overflow: hidden;

    .bg-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.12;
      pointer-events: none;
    }
    .glow-1 {
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.4);
      top: -10%;
      right: -10%;
      animation: glowDrift 8s ease-in-out infinite;
    }
    .glow-2 {
      width: 250px;
      height: 250px;
      background: rgba(255, 255, 255, 0.3);
      bottom: -8%;
      left: -8%;
      animation: glowDrift 10s ease-in-out infinite reverse;
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .animate-in {
        opacity: 0;
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .title {
        margin-bottom: 20px;
        font-size: 40px;
        font-weight: bold;
        color: #fff;
        animation-delay: 0.1s;
      }
      .text {
        margin-bottom: 20px;
        width: 460px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 1.6;
        animation-delay: 0.35s;
      }
      .robot {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.2);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        box-shadow:
          0 15px 35px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
        animation: fadeInUp 0.8s ease-out 0.6s forwards, robotFloat 4s ease-in-out 1.2s infinite;
        opacity: 0;

        .robot-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.12);
          animation: ringPulse 3s ease-in-out infinite;
        }
      }
    }
  }

  .right-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100vh;
    background-color: #fff;
  }

  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .page-fade-enter-from {
    opacity: 0;
    transform: translateY(16px);
  }
  .page-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes robotFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.03);
  }
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes glowDrift {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -15px) scale(1.1);
  }
  66% {
    transform: translate(-10px, 10px) scale(0.95);
  }
}
</style>
