// import React, { useState, useEffect } from "react";
// import axiosInstance from "./apis/axiosInstance";
// import "./index.css";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axiosInstance.get("/blogs");
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="content">
//       <h1>Blog List</h1>
//       {blogs.map((blog) => (
//         <div
//           key={blog._id}
//           className="blog-preview"
//           onClick={() => navigate(`/blogs/${blog._id}`)}
//         >
//           <h2>{blog.title}</h2>
//           <p>{blog.author}</p>
//           <p>Read more.. ..</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;

//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// Home.js
import React, { useState, useEffect } from "react";
import axiosInstance from "./apis/axiosInstance";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blogs"); //withcredentiels: true
        setBlogs(response.data);
      } catch (error) {
        console.error(
          "Error fetching blogs:",
          error.response?.data || error.message
        );
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="content">
      <h1>Blog List</h1>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="blog-preview"
          onClick={() => navigate(`/blogs/${blog._id}`)}
        >
          <h2>{blog.title}</h2>
          <p>{blog.author}</p>
          <p>Read more.. ..</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
