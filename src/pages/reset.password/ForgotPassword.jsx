import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import TextInput from "../../components/TextInput";
function ForgotPassword() {
  const navigate = useNavigate();
  useEffect(()=>{
    console.log('render once')
  },[])
  // form valitaiton
  const validateForm = Yup.object({
    email: Yup.string().email().required("Email is required"),
  });

  const emailSubmit = (values) => {
    alert(values);
    navigate("check-email");
  };
  return (
    <div className="forgot-password">
      <Formik
        initialValues={{
          email: "",
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
              name="email"
              type="text"
              placeholder="sample@gmail.com"
            />
          </div>
          <button
            type="submit"
            className="forgot-password--wrapper__send-button"
          >
            Reset password
          </button>
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
