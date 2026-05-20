import request from "@/utils/request";

// 注册
export const register = (data) => {
  return request.post("/user/add", data);
};
