import React from "react";
import { Icon } from "@iconify/react";
import AdminTextinput from "../../components/AdminTextinput";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = React.useState();
  const [error, setError] = React.useState();
  const navigate = useNavigate();
  const emailSubmit = (e)=>{
    e.preventDefault();
    if(!email?.email){
      setError("Email is required.")
    }else{
      alert("submitted")
      navigate("check-email")
    }
  }
  return (
    <div className="forgot-password">
      <form onSubmit={emailSubmit} method="post" className="forgot-password--wrapper">
        <div className="forgot-password--wrapper__icon">
          <Icon icon="ant-design:key-outlined" />
        </div>
        <p className="forgot-password--wrapper__title">Forgot Password?</p>
        <p className="forgot-password--wrapper__description">
          No worries, we'll send you a reset instructions
        </p>
        <div className="forgot-password--wrapper__input">
          <AdminTextinput
            label="Email"
            name="email"
            type="email"
            setValue={setEmail}
            value={email?.email}
          />
        </div>
        {error && !email?.email? <p className="forgot-password--wrapper__error"> <Icon icon="dashicons:warning" /> {error}</p>: null}
        <button type="submit" className="forgot-password--wrapper__send-button">
          Reset password
        </button>
        <button type="button" onClick={()=>navigate("/login")} className="forgot-password--wrapper__back-button">
          <Icon icon="eva:arrow-back-fill" /> Back to log in
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
