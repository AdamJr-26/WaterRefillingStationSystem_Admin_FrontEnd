import React from "react";
import { Icon } from "@iconify/react";
import AdminTextinput from "../../components/AdminTextinput";
import { useNavigate } from "react-router-dom";
function SetNewPassword() {
  const [passwords, setPasswords] = React.useState();
  const [error, setError] = React.useState();
  const [showPassword, setShowPassword] = React.useState(false);
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

  const showPasswordRef = React.useRef(null);
  const showPasswordToggle = () => {
    showPasswordRef.current.click();
    setShowPassword(showPasswordRef.current.checked);
  };
  return (
    <div className="set-new-password">
      <form
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
          <AdminTextinput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            setValue={setPasswords}
            value={passwords?.password}
          />
          <AdminTextinput
            label="Confirm Password"
            name="confirm_password"
            type={showPassword ? "text" : "password"}
            setValue={setPasswords}
            value={passwords?.confirm_password}
          />
        </div>
        {error && !passwords?.passwords && !passwords?.confirm_password ? (
          <p className="set-new-password--wrapper__error">
            {" "}
            <Icon icon="dashicons:warning" /> {error}
          </p>
        ) : null}
        <div
          onClick={showPasswordToggle}
          className="set-new-password--wrapper__show-password"
        >
          <input
            ref={showPasswordRef}
            type="checkbox"
            name="show_password"
            id="show_password"
          />
          <p className="show_password_label">Show Password</p>
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
      </form>
    </div>
  );
}

export default SetNewPassword;
