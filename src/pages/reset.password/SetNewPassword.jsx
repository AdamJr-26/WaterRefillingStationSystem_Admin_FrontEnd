import React from "react";
import { Icon } from "@iconify/react";

import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInputPassword from "../../components/TextInputPassword";

function SetNewPassword() {
  const [passwords, setPasswords] = React.useState();
  const [error, setError] = React.useState();

  const navigate = useNavigate();
  const passwordsSubmit = (e) => {
    e.preventDefault();

    if (passwords?.password !== passwords?.confirm_password) {
      setError("Password did not matched to each other.");
    } else if (!passwords?.password || !passwords?.confirm_password) {
      setError("Inputs are required.");
    } else {
      alert("submitted");
      navigate("/forgot-password/password-reset");
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .max(16, "Password must not exceed 16 letters")
          .required("Password is required"),
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password must match")
          .min(6, "Password must be aleast 6 characters")
          .max(16, "Password must not exceed 16 letters")
          .required("Confirm password is required"),
      })}
    >
      <Form>
        <div className="set-new-password">
          <div
            onSubmit={passwordsSubmit}
            method="post"
            className="set-new-password--wrapper"
          >
            <div className="set-new-password--wrapper__icon">
              <Icon icon="ant-design:key-outlined" />
            </div>
            <p className="set-new-password--wrapper__title">Set new password</p>
            <p className="set-new-password--wrapper__description">
              Your new password must be different to previously used passwords.
            </p>
            <div className="set-new-password--wrapper__input">
            <TextInputPassword
              label="Password"
              name="password"
              placeholder="Password"
            />
            <TextInputPassword
              label="Confirm Password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            </div>

            <button
              type="submit"
              className="set-new-password--wrapper__send-button"
            >
              Reset password
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="set-new-password--wrapper__back-button"
            >
              <Icon icon="eva:arrow-back-fill" /> Back to log in
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default SetNewPassword;
