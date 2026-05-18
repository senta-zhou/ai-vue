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
    if (data.code === "200") {
      return data.data;
    } else {
      if (data.code === "-1") {
        ElMessage.error(data.msg || "登录过期，请重新登录");
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        window.location.href = "/auth/login";
      } else {
        ElMessage.error(data.msg || "请求失败");
      }
      return Promise.reject(data);
    }
  },
  (error) => {
    ElMessage.error("网络异常或请求失败");
    return Promise.reject(error);
  },
);

export default service;
