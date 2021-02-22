import React from "react";
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = ({
  setUsername,
  username,
  setPassword,
  password,
  handleLogin,
}) => {
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
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
