import axiosInstance from "./axiosInstance";

export const getAllBlogs = () => {
  return axiosInstance.get("/blogs");
};

export const getBlogById = (id) => {
  return axiosInstance.get(`/blogs/${id}`);
};

export const createBlog = (blog) => {
  return axiosInstance.post("/blogs", blog);
};

export const updateBlog = (id, blog) => {
  return axiosInstance.put(`/blogs/${id}`, blog);
};

export const deleteBlog = (id) => {
  return axiosInstance.delete(`/blogs/${id}`);
};
