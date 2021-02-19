import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Newblog from "./components/Newblog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setLoginMessage(`${user.name} is logged in`);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setLoginMessage(null);
      }, 5000);
    } catch (exception) {
      setError("wrong Username or Password");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    blogService.createBlog(newBlog).then((response) => {
      setBlogs(response);
    });
  };

  const handleLikes = (oldBlog) => {
    const findBlog = blogs.filter((blog) => blog.id === oldBlog.id);
    const changedBlog = findBlog.map((blog) => {
      return { ...blog, likes: ++blog.likes };
    });

    blogService.changeBlog(changedBlog[0]).then((response) => {
      const newData = blogs.map((blog) => {
        return blog.id === oldBlog.id
          ? { ...blog, likes: response.likes }
          : blog;
      });
      setBlogs(newData);
    });
  };

  const handleDelete = (oldBlog) => {
    if (
      window.confirm(
        `Are you sure you want to delete blog -"${oldBlog.title}"?`
      )
    ) {
      blogService.deleteBlog(oldBlog.id).then((response) => {
        console.log("res------", response);
        setBlogs(blogs.filter((blog) => blog.id !== oldBlog.id));
      });
      setError(`Blog "${oldBlog.title}" by ${oldBlog.author} is deleted`);
      setTimeout(() => {
        setError("");
      }, 7000);
    } else {
      return null;
    }
  };

  const logMsg = () => {
    if (user === null) {
      return null;
    } else {
      return (
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: "bolder" }}>{user.name}</p>
          <button
            style={{
              background: "grey",
              margin: "15px 3px 3px 3px",
              borderStyle: "none",
              maxHeight: "20px",
            }}
            onClick={handleLogout}
          >
            log out
          </button>
        </div>
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    return window.localStorage.removeItem("loggedBloglistUser");
  };

  const loginForm = () => (
    <Togglable label="login">
      <Login
        setUsername={setUsername}
        username={username}
        setPassword={setPassword}
        password={password}
        handleLogin={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable label="Create new blog" ref={blogFormRef}>
      <Newblog createBlog={createBlog} setError={setError} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={error} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {logMsg()}
          {blogForm()}
          <ul className="blogList">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li style={{listStyle:"none"}}>
                  <Blog
                    handleLikes={() => handleLikes(blog)}
                    handleDelete={() => handleDelete(blog)}
                    key={blog.id}
                    blog={blog}
                    user={user}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
