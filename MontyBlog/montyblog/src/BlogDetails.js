// import { useNavigate, useParams, Link } from "react-router-dom";
// import axiosInstance from "./apis/axiosInstance";
// import { useState, useEffect } from "react";
// import "./index.css";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [displayButtons, setDisplayButton] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     axiosInstance
//       .get(`/blogs/${id}`)
//       .then((response) => {
//         if (response.data.user === userId) {
//           setDisplayButton(true);
//         }
//         setBlog(response.data);
//         setIsPending(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setIsPending(false);
//       });
//   }, [id]);

//   const handleDelete = () => {
//     axiosInstance
//       .delete(`/blogs/${id}`)
//       .then(() => {
//         navigate("/");
//       })
//       .catch((err) => {
//         console.error("There was an error deleting the blog!", err);
//       });
//   };

//   return (
//     <div className="blog-details">
//       {isPending && <div>Loading...</div>}
//       {error && <div>{error}</div>}
//       {blog && (
//         <article>
//           <h2>{blog.title}</h2>
//           <div>{blog.content}</div>
//           <div>Written by {blog.author}</div>
//           {displayButtons && (
//             <>
//               <button className="delete-button" onClick={handleDelete}>
//                 Delete
//               </button>
//               <Link to={`/edit/${id}`}>
//                 <button className="edit-button">Edit</button>
//               </Link>
//             </>
//           )}
//         </article>
//       )}
//     </div>
//   );
// };

// export default BlogDetails;

// //////////////////////////////////////////
// //////////////////////////////////////////
// ///////////////////////////////////////////
// //////////////////////////////////////////
// ////////////////////////////////////////////////
// /////////////////////////////////////////////
// //////////////////////////////////////////////

import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "./apis/axiosInstance";
import { useState, useEffect } from "react";
import "./index.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [displayButtons, setDisplayButtons] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axiosInstance
      .get(`/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        if (response.data.user === userId) {
          setDisplayButtons(true);
        }
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleDelete = () => {
    axiosInstance
      .delete(`/blogs/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("There was an error deleting the blog!", err);
      });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <div>{blog.content}</div>
          <div>Written by {blog.author}</div>
          {displayButtons && (
            <>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
              <Link to={`/edit/${id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            </>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
