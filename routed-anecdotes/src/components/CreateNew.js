import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/index";

const CreateNew = ({ addNew, newNotification }) => {
  const history = useHistory();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const reset = useField("reset", content, author, info);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: author.value,
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
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            id="content"
            type={content.type}
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type={author.type}
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            id="info"
            type={info.type}
            name="info"
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
        <input type={reset.type} value={reset.type} onClick={reset.onReset} />
      </form>
    </div>
  );
};

export default CreateNew;
