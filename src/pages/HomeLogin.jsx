import React from "react";
import AdminTextinput from "../components/AdminTextinput";
import { Icon } from '@iconify/react';

function HomeLogin() {
  return (
    <div className="home-login">
      <div className="home-login--form">
        <p className="home-login--form__title">Login</p>
        <AdminTextinput label="Email" />
        <AdminTextinput label="Password" />
        <button className="home-login--form__login-with-google"><Icon className="icon" icon="akar-icons:google-fill" /><span>Login with Google</span></button>
        <button className="home-login--form__login-button">Login</button>
      </div>
      <div className="home-login--hero">image</div>
    </div>
  );
}

export default HomeLogin;
