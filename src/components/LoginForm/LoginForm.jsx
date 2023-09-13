import React, { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { SiOkta } from "react-icons/si";
import Card from "./Card";
import "./LoginForm.css";

const getOAuthURL = (provider) => {
  return `${process.env.REACT_APP_BACKEND_URL}/oauth/authorize?source=pivot_portal&provider=${provider}`;
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <Card>
        <h1 className="title">Sign In</h1>
        <form>
          <div className="inputs_container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Log In" className="login_button" />
        </form>
        <div className="link_container">
          <a href=" " className="small">
            Forgot Password?
          </a>
        </div>
        <div className="icons">
          <a href={getOAuthURL("github")}>
            <BsGithub className="icon" size={25} />
          </a>
          <a href={getOAuthURL("google")}>
            <BsGoogle className="icon" size={25} />
          </a>
          <a href={getOAuthURL("facebook")}>
            <AiFillFacebook className="icon" size={25} />
          </a>
          <a href={getOAuthURL("okta")}>
            <SiOkta className="icon" size={25} />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
