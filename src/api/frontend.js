import request from "@/utils/request";

// 注册
export const register = (data) => {
  return request.post("/user/add", data);
};

// 创建新会话
export const startSession = (data) => {
  return request.post("/psychological-chat/session/start", data);
};
