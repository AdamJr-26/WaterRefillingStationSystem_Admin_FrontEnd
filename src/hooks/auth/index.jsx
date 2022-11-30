import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosAPI from "../../services/axios";
import socketIO from "socket.io-client";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../api/fetcher";
import handleError from "../../services/axios.handleError";

import useTokenStorage from "../custom/useTokenStorage";
import useProfile from "../api/useProfile";
const UserContext = createContext("userToken");
export const UserProvider = ({ children }) => {
  const { mutate } = useSWRConfig();
  const [token] = useTokenStorage("userToken");
  const { isLoading, userProfile, userProfileError } = useProfile();
  console.log("[/auth/index.js]",userProfile)

  // ================== USER PROFILE
  // const { data: userProfile, error: userProfileError } = useSWR(
  //   "/api/admin/profile",
  //   fetcher
  // );

  // useEffect(() => {
  //   if (userProfile && !userProfileError) {
  //     setIsLoggedIn(true);
  //     setIsloading(false);
  //   } else if (!userProfile && userProfileError) {
  //     setIsLoggedIn(false);
  //   }else if(!userProfile && !userProfileError){
  //     setIsLoggedIn(false);
  //     setIsloading(true)
  //   }
  //   return () => {
  //     setIsLoggedIn(false);
  //     setIsloading(true);
  //   };
  // }, []);

  // ==================

  // update socket io.
  const io = socketIO.connect(`http://localhost:4000`);
  // useEffect(() => {
  //   const docID = cookies?.user?.docID;
  //   console.log("db_id", docID);
  //   io.on("connect", () => {
  //     io.emit("room", docID);
  //   });
  // }, [cookies]);

  io.on("/api/inventory", (args) => {
    if (args) {
      console.log("args-===", args);
      mutate("/api/inventory");
    }
  });

  const login = async ({ gmail, password }) => {
    try {
      const res = await axiosAPI().post("/auth/login-admin", {
        gmail,
        password,
      });
      const data = res.data;
      const token = data?.data?.token;
      console.log("data token", token);
      if (data && token) {
        localStorage.setItem("userToken", token);
        mutate("/api/admin/profile");
      }
      return { data };
    } catch (error) {
      console.log("errrrrr login", error);
      return { error };
    }
    // const res = await axiosAPI().post("/auth/login-admin", {
    //   gmail,
    //   password,
    // });

    // console.log(res.data.user);
    // const token = res.data?.data?.token;
    // console.log("token-----", token);
    // const userInfo = JSON.stringify(res.data?.data?.user);
    // localStorage.setItem("userToken", token);
    // localStorage.setItem("userInfo", userInfo);
  };

  const logout = async () => {
    localStorage.removeItem("userToken");
    // await axiosAPI().get("/auth/logout-admin");
    // localStorage.removeItem("userToken");
  };

  const sendForgotPasswordRequest = async ({ gmail }) => {
    const res = await axiosAPI().post("/auth/reset-password/request", {
      gmail,
    });
    if (res.data.data.success) {
      return res.data.data.success;
    }
  };

  const value = {
    token,
    io,
    login,
    logout,
    sendForgotPasswordRequest,
    isLoading,
    userProfile,
    userProfileError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
