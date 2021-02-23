import React, { useState } from "react";
import {useDispatch} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { logUser } from '../redux/actions/userActions'
import {newNotification} from '../redux/actions/notificationAction'

const Login = () => {
  const dispatch= useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  return (
    <form  onSubmit={handleLogin}>
      <div >
        <TextField
          variant='standard'
          label='Username'
          id="username"
          style={{ margin: "10px" }}
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        <TextField
          variant='standard'
          label='Password'
          id="password"
          style={{ margin: "10px" }}
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      
      <Button style={{margin:'20px'}} variant='contained' type="submit" >
        Login
      </Button>
    </form>
  );
};


export default Login;
