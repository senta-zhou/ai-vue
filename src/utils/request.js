import axios from "axios";
import { ElMessage } from "element-plus";

// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 同时支持字符串和数字类型的状态码
    if (data.code === "200" || data.code === 200 || data.code === 0 || data.success === true) {
      return data.data || data;
    } else {
      if (data.code === "-1" || data.code === -1) {
        const hasToken = !!localStorage.getItem("token");
        if (hasToken) {
          // 已登录用户 token 过期，跳转登录页
          ElMessage.error(data.msg || data.message || "登录过期，请重新登录");
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          window.location.href = "/auth/login";
        } else {
          // 未登录用户（注册等场景），仅显示错误提示
          ElMessage.error(data.msg || data.message || "请求失败");
        }
      } else if (data.code === "500" || data.code === 500) {
        ElMessage.error(data.msg || data.message || "系统错误");
      } else {
        // 其他错误状态码，不清除token，只显示错误信息
        ElMessage.error(data.msg || data.message || "请求失败");
      }
      return Promise.reject(data.msg || data.message || "请求失败");
    }
  },
  (error) => {
    ElMessage.error(error.message || "网络请求失败");
    return Promise.reject(error);
  },
);

export default service;
