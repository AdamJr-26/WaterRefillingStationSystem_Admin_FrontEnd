import React from "react";
import { Link } from "react-router-dom";
import sendHero from "../assets/images/hero/send-hero.png";


function HomeVerify() {
  return (
    <div className="verify-page">
    <div className="verify-page--wrapper">
      <img className="verify-page--wrapper__hero" src={sendHero} alt="" srcSet="" />
      <div className="verify-page--wrapper__text">
        <span className="title">Thank you for Registering</span>
        <span>
          A verification mail has been sent to your account. Please check your
          inbox to verify
        </span>
      </div>
      <Link className="verify-page--wrapper__login_button" to="/login">
        <span>Log in</span>
      </Link>
    </div>
  </div>
  )
}

export default HomeVerify
