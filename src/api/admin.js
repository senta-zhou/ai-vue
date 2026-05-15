import service from "@/utils/request";

// 登录
export function login(data) {
  return service.post("/user/login", data);
}

// 获取分类树
export function CategoryTree() {
  return service.get("/knowledge/category/tree");
}

// 获取文章分页列表
export function ArticlePage(params) {
  return service.get("/knowledge/article/page", { params: params });
}
