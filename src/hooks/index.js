import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProvider";
import axios from "axios";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        await axios
          .get(`https://api.spotify.com/v1/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((d) => {
            // console.log(d.data);
            setUser(d.data);
          });
      };
      getUser();

    }
  }, [token]);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!token && hash) {
      let tokenn = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", tokenn);
      setToken(tokenn);
    }

    setToken(storedToken);

    console.log(storedToken);
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  return {
    user,
    token,
    logout,
  };
};
