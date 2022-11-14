import React from "react";
import { Icon } from "@iconify/react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInputPassword from "../../components/TextInputPassword";
import { axios } from "../../services/axios";
import { useCookies } from "react-cookie";
import { useToast, Button } from "@chakra-ui/react";

function SetNewPassword() {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSending, setIsSending] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    if (!cookies?.forgot_password) {
      navigate("/login");
    }
  }, []);
  const passwordsSubmit = async (values) => {
    const userId = searchParams.get("id");
    const token = searchParams.get("token");
    if (values?.password && values?.confirm_password) {
      await axios({
        url: "/auth/reset-password/set-new-password",
        method: "post",
        withCredentials: true,
        data: {
          password: values.password,
          userId,
          token,
        },
      })
        .then((res) => {
          if (res.data.data.success) {
            // remove cookie
            removeCookie("forgot_password", { pathId: "/" });
            toast({
              title: "Success",
              description: "Change Password successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            // navigate to login
            navigate("/login");
          }
        })
        .catch((error) => {
          const { response } = error;
          toast({
            title: response?.data?.fullError,
            description: response?.data?.errors?.set_new_password?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirm_password: "",
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
      onSubmit={passwordsSubmit}
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
