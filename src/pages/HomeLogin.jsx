import React, { useEffect, useRef, useState } from "react";
import AdminTextinput from "../components/AdminTextinput";
import { Icon } from "@iconify/react";
import { axios } from "../lib/utils/axios";
// authenticating
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
function HomeLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // font password show handle
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const showPasswordRef = useRef(null);
  const togglePasswordShow = () => {
    showPasswordRef.current.click();
    setIsPasswordShown(showPasswordRef.current.checked);
  };
  useEffect(() => {
    // alert(auth)
    if (auth.user) {
      // navigate()
      <Navigate to="/admin/dashboard" />;
    }
  }, []);

  const [loginForm, setLoginForm] = useState();
  const loginSubmit = (e) => {
    e.preventDefault();
    if (loginForm?.gmail && loginForm?.password) {
      axios({
        url: "auth/login-admin",
        method: "post",
        withCredentials: true,
        data: loginForm,
      }).then(res=>{
        console.log(res.data)
      })
    }
    // navigate(from, {replace: true})
  };
  return (
    <div className="home-login">
      <form onSubmit={loginSubmit} className="home-login--form">
        <p className="home-login--form__title">Login</p>
        <AdminTextinput
          setValue={setLoginForm}
          value={loginForm?.gmail}
          label="Email"
          name="gmail"
        />
        <AdminTextinput
          setValue={setLoginForm}
          value={loginForm?.password}
          label="Password"
          name="password"
          type={isPasswordShown ? "text" : "password"}
        />
        <p style={{ margin: 0, fontSize: 14, color: "red", fontWeight: 500, }}>
          please fill up the password{" "}
        </p>
        <div
          style={{
            margin: 0,
            display: "flex",
            gap: 10,
            color: "#2389DA",
            cursor: "pointer",
            width:"100%",
          }}
          onClick={togglePasswordShow}
        >
          <input
            style={{ width: 20, margin: 0 }}
            type="checkbox"
            name="checkbox"
            id="checkbox"
            ref={showPasswordRef}
          />
          <p style={{ fontWeight: 500, margin:0 }}>Show Password</p>
        </div>
        {/* <button type="button" className="home-login--form__login-with-google"><Icon className="icon" icon="akar-icons:google-fill" /><span>Login with Google</span></button> */}
        <button type="submit" className="home-login--form__login-button">
          Login
        </button>
      </form>
      <div className="home-login--hero">image</div>
    </div>
  );
}

export default HomeLogin;
