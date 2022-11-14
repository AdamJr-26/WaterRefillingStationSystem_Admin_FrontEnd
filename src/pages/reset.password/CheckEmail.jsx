import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";

function CheckEmail() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const { sendForgotPasswordRequest } = useAuth();
  const toast = useToast();
  React.useEffect(() => {
    if (!cookies.forgot_password) {
      navigate("/login");
    }
  }, []);

  // click to resent
  const resendRequest = async () => {
    if (cookies.forgot_password) {
      try {
        const isValid = await sendForgotPasswordRequest({
          gmail: cookies.forgot_password,
        });
        if (isValid) {
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
        console.log(err);
        toast({
          title: response?.data?.fullError,
          description: response?.data?.errors?.forgot_password_admin?.message,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <div className="check-email">
      <div className="check-email--wrapper">
        <div className="check-email--wrapper__icon">
          <Icon icon="eva:email-outline" />
        </div>
        <p className="check-email--wrapper__title">Check your email</p>
        <p className="check-email--wrapper__description">
          We sent a password reset link to {cookies?.forgot_password}
        </p>
        <a
          href="https://mail.google.com/"
          className="check-email--wrapper__open-email"
        >
          Open email app
        </a>
        <div className="check-email--wrapper__resend">
          <p>Didn't receive the email? </p>{" "}
          <p onClick={() => resendRequest()}>Click to resend</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="check-email--wrapper__back-button"
        >
          <Icon icon="eva:arrow-back-fill" /> Back to log in
        </button>
      </div>
    </div>
  );
}

export default CheckEmail;
