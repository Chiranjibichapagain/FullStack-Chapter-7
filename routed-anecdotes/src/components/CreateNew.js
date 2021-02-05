import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/index";

const CreateNew = ({ addNew, newNotification }) => {
  const history = useHistory();

  const [fields, handleChange, handleReset] = useField({
    content: "",
    author: "",
    url:""
  })
  
  const {content, author, url} = fields

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info:url,
      votes: 0,
    });
    history.push("/");
    newNotification(`A new anecdote "${content.value}" is created!!`);
    setTimeout(() => {
      newNotification("");
    }, 5000);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onReset={handleReset} onSubmit={handleSubmit}>
        <div>
          content
          <input
            id="content"
            name="content"
            type="text"
            value={content}
            onChange={handleChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url for more info
          <input
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button>create</button>
        <input type="reset" value="Reset" />
      </form>
    </div>
  );
};

export default CreateNew;
