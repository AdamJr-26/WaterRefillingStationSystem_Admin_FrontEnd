import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import TextInput from "../../components/TextInput";
import { useAuth } from "../../hooks/auth/index";
import { useToast, Button } from "@chakra-ui/react";
function ForgotPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [cookies, setCookies, removeCookie] = useCookies();
  const [isSending, setIsSending] = useState(false);
  const { sendForgotPasswordRequest } = useAuth();

  // form valitaiton
  const validateForm = Yup.object({
    gmail: Yup.string().email().required("Email is required"),
  });

  const emailSubmit = async (values) => {
    if (values.gmail) {
      setIsSending(true); //loading button
      try {
        const isValid = await sendForgotPasswordRequest({
          gmail: values.gmail,
        });
        if (isValid) {
          setCookies("forgot_passworg_gmail", values.gmail, { path: "/" });
          navigate("check-email");
          setIsSending(false); // for loading button
          toast({
            title: "Request for Forgot Password",
            description: "Check your email",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (err) {
        const { response } = err;
        setIsSending(false); //loading button
        toast({
          title: response?.data?.fullError,
          description: response?.data?.errors?.forgot_password_admin?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <div className="forgot-password">
      <Formik
        initialValues={{
          gmail: "",
        }}
        validationSchema={validateForm}
        onSubmit={emailSubmit}
      >
        <Form className="forgot-password--wrapper">
          <div className="forgot-password--wrapper__icon">
            <Icon icon="ant-design:key-outlined" />
          </div>
          <p className="forgot-password--wrapper__title">Forgot Password?</p>
          <p className="forgot-password--wrapper__description">
            No worries, we'll send you a reset instructions
          </p>
          <div className="forgot-password--wrapper__input">
            <TextInput
              label="Email"
              name="gmail"
              type="text"
              placeholder="sample@gmail.com"
            />
          </div>
          {/* <button
            type="submit"
            className="forgot-password--wrapper__send-button"
          >
            Reset password
          </button> */}
          <Button
            type="submit"
            isLoading={isSending}
            loadingText="Please Wait"
            backgroundColor="#2389DA"
            color="white"
            _fucos={{ backgroundColor: "#2563eb", color: "#374151" }}
            variant="solid"
            width="100%"
            height="45px"
          >
            Reset Password
          </Button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="forgot-password--wrapper__back-button"
          >
            <Icon icon="eva:arrow-back-fill" /> Back to log in
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ForgotPassword;
