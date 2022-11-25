import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { axios } from "../../services/axios";
import socketIO from 'socket.io-client';
import useSWR, { useSWRConfig } from 'swr'

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["user"]);
  const {mutate} = useSWRConfig()
  useEffect(() => {
    async function authorize() {
      try {
        const res = await axios.get("/auth/authorize-me");
        console.log("res.data,",res.data);
      } catch (error) {
        console.log('/authorize-me', error)
        // alert("SESSION TIMEOUT, UNAUTHORIZED USER")
        removeCookie("user", { path: "/" });
      }

    }
    authorize()
    return ()=>{
      // removeCookie("user", { path: "/" });
    }
  }, []);

  // update socket io.
  const io = socketIO.connect(`http://localhost:4000`);
  useEffect(()=>{
    const docID = cookies?.user?.docID;
    console.log('db_id',docID)
    io.on("connect", ()=>{
      io.emit('room', docID)
    })
  },[cookies])

  io.on("/api/inventory", (args)=>{
    if(args){
      console.log("args-===",args)
      mutate('/api/inventory')
    }
    
  })


  const login = async ({ gmail, password }) => {
    const res = await axios.post("/auth/login-admin", {
      gmail,
      password,
    });
    console.log(res.data.user);
    const user = JSON.stringify(res.data.user);
    if (!cookies?.user) {
      setCookies("user", user, { path: "/" });
    }
  };

  const logout = async () => {
    await axios.get("/auth/logout-admin");
    removeCookie("user", { path: "/" });
  };

  // create auto remove cookies if authentatication failes

  const sendForgotPasswordRequest = async ({ gmail }) => {
    const res = await axios.post("/auth/reset-password/request", {
      gmail,
    });
    if (res.data.data.success) {
      setCookies("forgot_password", res.data.data.gmail, {
        maxAge: 5000,
      });
      return res.data.data.success;
    }
  };

  const value = useMemo(
    () => ({
      cookies,
      io,
      login,
      logout,
      sendForgotPasswordRequest,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
