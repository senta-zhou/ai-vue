<template>
  <div class="container">
    <!-- 登录标题 -->
    <div class="title">
      <div @click="router.push('/')" class="back-home">
        <el-icon><Back /></el-icon>
        <span>返回首页</span>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>请输入您的账户信息</p>
      </div>
    </div>
    <!-- 登录表单 -->
    <div class="form-container">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input
            placeholder="请输入用户名或邮箱"
            v-model="formData.username"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="formData.password"
            type="password"
            show-password
            size="large"
          ></el-input>
        </el-form-item>
        <el-button
          class="btn"
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form>
      <div class="footer">
        <p>还没有账号,<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { login } from "@/api/admin";
  import { ref, reactive } from "vue";
  import { ElMessage } from "element-plus";
  import { useRouter } from "vue-router";
  import { Back } from "@element-plus/icons-vue";

  const ruleFormRef = ref(null);
  const formData = reactive({
    username: "",
    password: "",
  });
  const rules = ref({
    username: [
      { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  });

  // 登录表单提交
  const router = useRouter();

  const submitForm = (formEl) => {
    if (!formEl) return;
    // 校验表单
    formEl.validate((valid) => {
      if (valid) {
        login(formData)
          .then((data) => {
            // 判断token是否存在
            if (!data.token) return console.error("登录失败");
            // 登录成功，保存token和用户数据
            localStorage.setItem("token", data.token);
            // 处理用户数据，避免循环引用
            const userData =
              typeof data.userInfo === "object" && data.userInfo !== null
                ? JSON.parse(JSON.stringify(data.userInfo))
                : data.userInfo;
            localStorage.setItem("userInfo", JSON.stringify(userData));
            // 根据用户角色决定跳转路径
            if (data.userInfo.userType === 2) {
              router.push("/back/dashboard");
            }
            console.log("登录成功");
          })
          .catch((error) => {
            ElMessage.error(
              "登录失败：" + (error.response?.data?.msg || "网络异常"),
            );
          });
      }
    });
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 384px;
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
          margin-bottom: 10px;
          font-size: 36px;
        }
        p {
          font-size: 18px;
          color: #666;
        }
      }
    }
    .form-container {
      margin-top: 30px;
      .btn {
        margin-top: 40px;
        width: 100%;
      }
      .footer {
        padding: 30px;
        text-align: center;
      }
    }
  }
</style>
