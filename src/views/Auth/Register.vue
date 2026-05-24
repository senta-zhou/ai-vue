<template>
  <div class="container">
    <div class="title">
      <div @click="router.push('/')" class="back-home">
        <el-icon><Back /></el-icon>
        <span>返回首页</span>
      </div>
      <div class="title-text">
        <h2>创建您的账号</h2>
        <p>请填写注册信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        label-position="top"
        :model="formData"
        :rules="rules"
        ref="submitFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="formData.nickname"
            placeholder="请输入昵称(可选)"
          />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号(可选)" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            placeholder="请输入确认密码"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(submitFormRef)"
            class="btn"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <div class="footer">
        <p>已有账号,<router-link to="/auth/login">去登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
  import { ref, reactive } from "vue";
  import { register } from "@/api/frontend";
  import { ElMessage } from "element-plus";
  import { useRouter } from "vue-router";
  import { Back } from "@element-plus/icons-vue";

  const router = useRouter();

  const formData = reactive({
    username: "",
    email: "",
    nickname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: 1,
    userType: 1,
  });

  const rules = ref({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
    phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    confirmPassword: [
      { required: true, message: "请确认密码", trigger: "blur" },
    ],
  });

  // 表单提交
  const submitFormRef = ref(null);
  const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (!valid) return;
      register(formData)
        .then(() => {
          router.push("/auth/login");
          ElMessage.success("注册成功");
        })
        .catch(() => {
          // 拦截器已弹出错误提示
        });
    });
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 384px;
    .flex-box {
      display: flex;
      align-items: center;
    }
    .title {
      .back-home {
        display: flex;
        align-items: center;
        margin-bottom: 90px;
        cursor: pointer;
      }
      .title-text {
        text-align: center;
        h2 {
          font-size: 27px;
          margin-bottom: 5px;
        }
        p {
          font-size: 15px;
          color: #6b7280;
        }
      }
    }
    .form-container {
      margin-top: 30px;
      .btn {
        margin-top: 20px;
        width: 100%;
      }
      .footer {
        padding: 20px;
        text-align: center;
      }
    }
  }
</style>
