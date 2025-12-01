import React, { useState} from "react";
import { Link } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
  };
  return (
    <div className="Login">
    <h1 className="log-title">Login</h1>
      <div className="loginCon">
        <label htmlFor="log_username">Username: </label>
        <input
          id="log_username"
          type="text"
          placeholder="(Ex. user...)"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="log-password">Password: </label>
        <input
          id="log-password"
          type="password"
          placeholder="(Ex. password...)"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <p>Dont have an account? {<Link to="/Register">Register</Link>}</p>
      </div>
    </div>
  )
}

export default Login