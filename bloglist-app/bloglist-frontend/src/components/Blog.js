import React, { useState } from "react";

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };
  const buttonLable = view ? "hide" : "view more";

  const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");

  return (
    <div
      style={{
        background: "grey",
        padding: "5px",
        margin: "3px",
        width: "600px",
        color: "white",
        display: "flex",
      }}
    >
      <button
        onClick={handleDelete}
        style={{
          // display: loggedUserJSON.includes(blog.user.username) ? "" : "none",
          background: "orangered",
          borderStyle: "none",
          borderRadius: "2px",
          marginRight: "10px",
          maxHeight: "20px",
        }}
      >
        Del
      </button>

      {view ? (
        <div>
          Title: {blog.title} <br />
          Author: {blog.author} <br />
          Likes: {blog.likes}{" "}
          <button
            className="likes"
            onClick={handleLikes}
            style={{
              background: "skyblue",
              borderStyle: "none",
              borderRadius: "2px",
            }}
          >
            like
          </button>{" "}
          <br />
          Url: {blog.url}
        </div>
      ) : (
        <div>
          {blog.title}
          <span> | |</span> {blog.author}
        </div>
      )}

      <button
        onClick={toggleView}
        style={{
          background: "green",
          color: "white",
          borderStyle: "none",
          borderRadius: "2px",
          marginLeft: "10px",
          maxHeight: "20px",
        }}
      >
        {buttonLable}
      </button>
    </div>
  );
};

export default Blog;
