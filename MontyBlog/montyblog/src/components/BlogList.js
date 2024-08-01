import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogService from "../apis/BlogService";
import "../index.css";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await BlogService.getAllBlogs();
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog) => (
        <Link
          to={`/blogs/${blog._id}`}
          key={blog._id}
          className="blog-preview-link"
        >
          <div className="blog-preview">
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
