import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./apis/axiosInstance";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/blogs/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
      })
      .catch((err) => {
        console.error("There was an error fetching the blog!", err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, content, author };
    setIsPending(true);

    axiosInstance
      .put(`/blogs/${id}`, blog)
      .then(() => {
        setIsPending(false);
        navigate(`/blogs/${id}`);
      })
      .catch((err) => {
        console.error("There was an error updating the blog!", err);
        setIsPending(false);
      });
  };

  return (
    <div className="create">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <label>Blog content:</label>
        <textarea
          required
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        ></textarea>
        <label>Blog author</label>
        <select
          value={author}
          onChange={({ target: { value } }) => setAuthor(value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Update Blog</button>}
        {isPending && <button>Updating Blog...</button>}
      </form>
    </div>
  );
};

export default Edit;

/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
