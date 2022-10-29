import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function PasswordReset() {
  const navigate = useNavigate();
  return (
    <div className="password-reset">
      <div className="password-reset--wrapper">
        <div className="password-reset--wrapper__icon">
          <Icon icon="bi:check-all" />
        </div>
        <p className="password-reset--wrapper__title">Password reset</p>
        <p className="password-reset--wrapper__description">
          Your password has been successfully reset. Click below to log in
          magically
        </p>
        <button
          className="password-reset--wrapper__continue"
          onClick={() => navigate("/login")}
        >
          Continue
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="password-reset--wrapper__back-button"
        >
          <Icon icon="eva:arrow-back-fill" /> Back to log in
        </button>
      </div>
    </div>
  );
}

export default PasswordReset;
