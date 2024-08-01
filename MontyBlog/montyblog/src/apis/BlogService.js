//Blogservice.js : // api/BlogService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs", error);
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID", error);
    throw error;
  }
};

export const createBlog = async (title, content, author) => {
  try {
    const response = await axios.post(
      `${API_URL}/blogs`,
      { title, content, author },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating blog", error);
    throw error;
  }
};

export const updateBlog = async (id, title, content, author) => {
  try {
    const response = await axios.put(
      `${API_URL}/blogs/${id}`,
      { title, content, author },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating blog", error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting blog", error);
    throw error;
  }
};
