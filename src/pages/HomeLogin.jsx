import React, { useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";
import { axios } from "../lib/utils/axios";
// authenticating
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import TextInput from "../components/TextInput";
import TextInputPassword from "../components/TextInputPassword";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

function HomeLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // alert(auth)
    if (auth.user) {
      // navigate()
      <Navigate to="/admin/dashboard" />;
    }
  }, []);

  const loginSubmit = (values) => {
    console.log(values);
    if (values.gmail && values.password) {
      axios({
        url: "auth/login-admin",
        method: "post",
        withCredentials: true,
        data: values,
      }).then((res) => {
        console.log(res.data);
      });
    }
    // navigate(from, {replace: true})
  };
  return (
    <Formik
      initialValues={{ gmail: "", password: "" }}
      validationSchema={Yup.object().shape({
        gmail: Yup.string().email().required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .max(16, "Password must not exceed 16 letters")
          .required("Password is required"),
      })}
      onSubmit={loginSubmit}
    >
      <Form>
        <div className="home-login">
          <div className="home-login--form">
            <p className="home-login--form__title">Login</p>
            <TextInput
              label="Email"
              name="gmail"
              placeholder="sample@gmail.com"
            />
            <TextInputPassword
              label="Password"
              name="password"
              placeholder="Password"
            />
            <button onClick={()=>navigate("/forgot-password")} type="button" className="home-login--form__forgot-password">
              Forgot password
            </button>
            <button type="submit" className="home-login--form__login-button">
              Login
            </button>
          </div>
          <div className="home-login--hero">image</div>
        </div>
      </Form>
    </Formik>
  );
}

export default HomeLogin;
