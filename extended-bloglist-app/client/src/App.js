import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Blog from "./components/Blog";
import User from './components/User'
import Notification from "./components/Notification";
import BlogViw from "./components/BlogView";
import Newblog from "./components/Newblog";
import Togglable from "./components/Togglable";
import Login from "./components/Login";

import { setToken} from './services/blogs'
import { fetchBlogs, blogDelete, create } from './redux/actions/blogActions'
import { newNotification } from './redux/actions/notificationAction'
import { fetchUsers} from './redux/actions/userActions'

const App = () => {
  const dispatch= useDispatch()
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(fetchUsers())
  }, [dispatch]);
  
  
  const { blogs } = useSelector(state => state)
  const { notifications } = useSelector(state => state)
  const { loggedUser } = useSelector(state => state.users)
  const { allUsers: users } = useSelector(state => state.users)
  
  
  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser);
      setToken(loggedUser.token);
    }
  }, [loggedUser]);

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(create(newBlog))
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
          <Typography style={{margin:'0px 20px'}} variant='h6'>{user.name}</Typography>
          <Button color='secondary' variant='contained'
            onClick={handleLogout}
          >
            log out
          </Button>
        </div>
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const loginForm = () => (
    <Togglable label="login">
      <Login/>
    </Togglable>
  );

  const blogForm = () => (
    <Togglable label="Create new blog" ref={blogFormRef}>
      <Newblog createBlog={createBlog} />
    </Togglable>
  );

  const BlogList = () => {
    return (
      <div>
        {user === null ? loginForm() :
          <div>
            <Typography style={{textAlign:'center', margin:'10px'}} variant='h5'>BLOGS</Typography>
            {blogForm()}
          <ul className="blogList">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li key={blog.id} style={{listStyle:"none"}}>
                  <Blog
                    handleDelete={() => handleDelete(blog)}
                    key={blog.id}
                    blog={blog}
                    user={user}
                  />
                </li>
              ))}
          </ul>
          </div>
        }
      </div>
    )
  } 

  const UserList = () => {
    return (
      <div>
         {user === null ? loginForm() :
          <div>
            <Typography style={{textAlign:'center', margin:'10px'}} variant='h5'>BLOGS</Typography>
            {blogForm()}
          <ul className="blogList">
            {users
              .map((user) => (
                <User
                  key={user.id}
                    user={user}
                  />
              ))}
          </ul>
          </div>
        }
      </div>
    )
  } 


  return (
    <div>
      <Router>
      <Paper style={{padding:'10px 20px', display:'flex', justifyContent:'space-around', alignItems:'center'}} elevation={3} >
        <Typography variant='h5'  >BLOG APP</Typography>
        <Typography>
          <Link style={{textDecoration:'none', fontWeight:'bold'}} to="/">
          Blogs
          </Link>
          </Typography>
        <Typography>
          <Link style={{textDecoration:'none', fontWeight:'bold'}} to="/users">
            Users
          </Link>
        </Typography>
        {user!==null? logMsg():null}
      <Notification message={notifications} />
      </Paper>
          <Switch>
          <Route strict exact path='/' > <BlogList/> </Route>
          <Route strict exact path='/users'> <UserList/> </Route>
          <Route strict exact path='/blog/:blogId'> <BlogViw/> </Route>
          </Switch>
        </Router>
    </div>
  );
};


export default App;
