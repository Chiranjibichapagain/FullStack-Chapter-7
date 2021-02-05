import React from "react";
import PropTypes from 'prop-types'
const Login = ({
  setUsername,
  username,
  setPassword,
  password,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        id="username"
          style={{ margin: "10px" }}
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        Password
        <input
        id="password"
          style={{ margin: "10px" }}
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login"
        type="submit"
        style={{ width: "170px", margin: "0px 10px 10px 70px" }}
      >
        Login
      </button>
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
