import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function CheckEmail() {
  const navigate = useNavigate();
  return (
    <div className="check-email">
      <div className="check-email--wrapper">
        <div className="check-email--wrapper__icon">
          <Icon icon="eva:email-outline" />
        </div>
        <p className="check-email--wrapper__title">Check your email</p>
        <p className="check-email--wrapper__description">
          We sent a password reset link to {" sample@gmail.com"}
        </p>
        <a
          href="https://mail.google.com/"
          className="check-email--wrapper__open-email"
        >
          Open email app
        </a>
        <div className="check-email--wrapper__resend">
          <p>Didn't receive the email? </p> <p>Click to resent</p>
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
