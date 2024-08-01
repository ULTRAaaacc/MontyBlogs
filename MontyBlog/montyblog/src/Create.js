import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./apis/axiosInstance";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, content, author };
    setIsPending(true);

    axiosInstance.post("/blogs", blog).then(() => {
      setIsPending(false);
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
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
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
