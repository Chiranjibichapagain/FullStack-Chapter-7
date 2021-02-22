import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'

import Blog from "./components/Blog";
import { setToken} from './services/blogs'
import Notification from "./components/Notification";
import Login from "./components/Login";
import Newblog from "./components/Newblog";
import Togglable from "./components/Togglable";
import { fetchBlogs, vote, blogDelete, create } from './redux/actions/blogActions'
import { newNotification } from './redux/actions/notificationAction'
import {fetchUsers, logUser} from './redux/actions/userActions'

const App = () => {
  const dispatch= useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch]);
  
  
  const { blogs } = useSelector(state => state)
  const { notifications } = useSelector(state => state)
  const {loggedUser} = useSelector(state => state.users)
  

  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser);
      setToken(loggedUser.token);
    }
  }, [loggedUser]);

  console.log('try--', user)

  const handleLogin = async (event) => {
    event.preventDefault();
      const user= await dispatch(logUser(username, password))
      
      if (user!==undefined) {
      dispatch(newNotification(`${user.name} is logged in`));
      setUsername("");
      setPassword("");
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
    } else {
      dispatch(newNotification("Login failed"))
      setTimeout(() => {
        dispatch(newNotification(null))
      }, 5000);
    }
  };

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(create(newBlog))
  };

  const handleLikes = (oldBlog) => {
    const findBlog = blogs.filter((blog) => blog.id === oldBlog.id);
    const changedBlog = findBlog.map((blog) => {
      return { ...blog, likes: ++blog.likes };
    });
    console.log('in app--', changedBlog[0])
    dispatch(vote(changedBlog[0]))
  };

  const handleDelete = (oldBlog) => {
    if (
      window.confirm(
        `Are you sure you want to delete blog -"${oldBlog.title}"?`
      )
    ) {
      dispatch(blogDelete(oldBlog.id))
      dispatch(newNotification(`Blog "${oldBlog.title}" by ${oldBlog.author} is deleted`))
      setTimeout(() => {
        dispatch(newNotification(""));
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
    // return window.localStorage.removeItem("loggedBloglistUser");
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
      <Notification message={notifications} />
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
                <li key={blog.id} style={{listStyle:"none"}}>
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
