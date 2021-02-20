import React, { useState } from "react";

const Newblog = ({ createBlog, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    createBlog(newBlog);
    {
      /*this is a function in app.js that do axios create, we are sending new blog from here */
    }

    setTitle("");
    setAuthor("");
    setUrl("");
    setError(
      `A new blog "${newBlog.title}" by- ${newBlog.author} is added to the list`
    );
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            id="title"
            style={{ margin: "5px" }}
            name="title"
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author
          <input
            id="author"
            style={{ margin: "5px" }}
            name="Author"
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL
          <input
            id="url"
            style={{ margin: "5px" }}
            name="URL"
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id="create" type="submit" onClick={handleCreateBlog}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Newblog;
