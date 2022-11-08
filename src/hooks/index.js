import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProvider";

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useProvideAuth = ()=> {
    const [token, setToken]= useState('')

    useEffect(()=> {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
  
      if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
        
        window.location.hash=""
        window.localStorage.setItem("token",token)
      }
        setToken(token)
        console.log(token);
    },[])

    const logout = () => {
        setToken(null)
        window.localStorage.removeItem("token")
    }

        return{
            token,
            logout
        }
}