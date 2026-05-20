import request from "@/utils/request";

// 注册
export const register = (data) => {
  return request.post("/user/add", data);
};

// 创建新会话
export const startSession = (data) => {
  return request.post("/psychological-chat/session/start", data);
};

// 获取分页会话列表
export const getSessionList = (params) => {
  return request.get("/psychological-chat/sessions", { params });
};

// 删除会话
export const deleteSession = (sessionId) => {
  return request.delete(`/psychological-chat/session/${sessionId}`);
};
