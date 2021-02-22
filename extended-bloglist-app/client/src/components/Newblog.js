import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
          <TextField
            label='Title'
            variant='standard'
            id="title"
            style={{ margin: "5px" }}
            name="title"
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label='Author'
            variant='standard'
            id="author"
            style={{ margin: "5px" }}
            name="Author"
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label='URL'
            variant='standard'
            id="url"
            style={{ margin: "5px" }}
            name="URL"
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          ></TextField>
        </div>
        <Button style={{margin:'20px'}} variant='contained' id="create" type="submit" onClick={handleCreateBlog}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default Newblog;
