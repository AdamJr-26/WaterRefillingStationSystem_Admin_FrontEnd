import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosAPI from "../../services/axios";
import socketIO from "socket.io-client";
import useSWR, { useSWRConfig } from "swr";

import useTokenStorage from "../custom/useTokenStorage";
import useProfile from "../api/useProfile";
const UserContext = createContext("userToken");
export const UserProvider = ({ children }) => {
  const { mutate } = useSWRConfig();
  const [token] = useTokenStorage("userToken");
  const { isLoading, userProfile, userProfileError } = useProfile();

  // update socket io.
  const io = socketIO.connect(`http://localhost:4000`);
  useEffect(() => {
    io.on("connect", () => {
      io.emit("timezone", "asia/manila");
    });
  }, []);
  // LOGIN
  const login = async ({ gmail, password }) => {
    try {
      const res = await axiosAPI().post("/auth/login-admin", {
        gmail,
        password,
      });
      const data = res.data;
      const token = data?.data?.token;
      if (data && token) {
        localStorage.setItem("userToken", token);
        mutate("/api/admin/profile");
      }
      return { data };
    } catch (error) {
      return { error };
    }
  };
  // LOGOUT
  const logout = async () => {
    localStorage.removeItem("userToken");
    mutate("/api/admin/profile");
    window.location.reload();
  };

  // FORGOT PASSWORD //BA'T NANDITO PA TO AHHA
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
