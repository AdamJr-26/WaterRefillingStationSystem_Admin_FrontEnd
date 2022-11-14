import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { axios } from "../../services/axios";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = async ({ gmail, password }) => {
    const res = await axios.post("/auth/login-admin", {
      gmail,
      password,
    });
    console.log(res.data.user);
    setCookies("user", res.data.user); 
  };

  const logout = async () => {
    await axios.get("/auth/logout-admin");
    removeCookie("user", { pathId: "/" });
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
      return res.data.data.success
    }
  };
  const value = useMemo(
    () => ({
      cookies,
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
