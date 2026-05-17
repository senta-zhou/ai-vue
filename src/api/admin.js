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

// 上传文件
export function UploadFile(file, businessInfo) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");
  return service.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 新增文章
export function AddArticle(data) {
  return service.post("/knowledge/article", data);
}

// 获取文章详情
export function getArticleDetail(id) {
  return service.get(`/knowledge/article/${id}`);
}

// 更新文章
export function UpdateArticle(id, data) {
  return service.put(`/knowledge/article/${id}`, data);
}

// 改变文章状态
export function ChangeArticleStatus(id, status) {
  return service.put(`/knowledge/article/${id}/status`, status);
}

// 删除文章
export function DeleteArticle(id) {
  return service.delete(`/knowledge/article/${id}`);
}

// 获取咨询记录分页列表
export function getConsultationsPage(params) {
  return service.get("/psychological-chat/sessions", { params: params });
}
