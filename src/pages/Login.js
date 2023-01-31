import React from "react";
import { loginUrl } from "../spotify";
import { useAuth } from "../hooks";
import { Redirect } from "react-router-dom";

const Login = () => {
  const auth = useAuth();

  if (auth.token) {
    return <Redirect to={"/"} />;
  }
  return (
    <div className="login-outer-container">
      <div className="login-inner-container">
        <h1>
          <a href={loginUrl}>Login to Spotify</a>
        </h1>
      </div>
    </div>
  );
};

export default Login;
