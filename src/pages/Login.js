import React from "react";
import { loginUrl } from "../spotify";

const Login = () => {
  // const CLIENT_ID = "2e05aad2c7654cbba58f51695751d5ef";
  // const REDIRECT_URI = "http://localhost:3000";
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  // const RESPONSE_TYPE = "token";

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
