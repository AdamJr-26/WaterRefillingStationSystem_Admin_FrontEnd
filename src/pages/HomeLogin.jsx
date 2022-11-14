import React, { useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";
import { axios } from "../services/axios";
// authenticating
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import loginHero from "../components/svg/login-hero.svg";
import { useToast } from "@chakra-ui/react";
import TextInput from "../components/TextInput";
import TextInputPassword from "../components/TextInputPassword";
import { Button, ButtonGroup } from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/auth";

function HomeLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loginLoading, setLoginLoading] = useState(false);
  // ======= login form ----------------------------------
  const { login, cookies } = useAuth();
  const toast = useToast();
  const loginSubmit = async (values) => {
    if (values.gmail && values.password) {
      try {
        await login({
          gmail: values.gmail,
          password: values.password,
        });
      } catch (err) {
        const message =
          err.response?.data?.errors?.login_admin?.message;
        toast({
          title: message,
          description: "Please double check your input",
          status: "error",
          duration: "4000",
          isClosable: true,
        });
      }
    }
  };

  return cookies?.user ? (
    <Navigate to="/admin/dashboard" exact />
  ) : (
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
            <button
              onClick={() => navigate("/forgot-password")}
              type="button"
              className="home-login--form__forgot-password"
            >
              Forgot password
            </button>
            <Button
              isLoading={loginLoading}
              loadingText="Logging in"
              colorScheme="blue"
              backgroundColor="#2389DA"
              variant="solid"
              height="50px"
              width="100%"
              borderRadius="30px"
              type="submit"
            >
              Login
            </Button>
            {/* <button type="submit" className="home-login--form__login-button">
                Login
              </button> */}
          </div>
          <div className="home-login--hero">
            <img
              className="home-login--hero__login-hero"
              src={loginHero}
              alt="log-in-hero"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default HomeLogin;
