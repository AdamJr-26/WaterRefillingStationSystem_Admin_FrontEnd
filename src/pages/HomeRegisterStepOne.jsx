import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Icon } from '@iconify/react';
import { Link, NavLink, Outlet } from "react-router-dom";
import AdminTextinput from "../components/AdminTextinput";
function HomeRegisterStepOne() {
  return (
    <div className="home-register--steps__one">
      <p className="title">Create an Account</p>
      <p className="detail">
        Register your water refilling business and use our system for free
      </p>
      <AdminTextinput label="Gmail" />
      <AdminTextinput label="Contact Number" />
      <AdminTextinput label="Lastname" />
      <AdminTextinput label="Gender" />
      <AdminTextinput label="Age" />
      <AdminTextinput label="Password" />
      <AdminTextinput label="Confirm password" />
      <button className="home-login--form__login-with-google" type="button" ><Icon className="icon" icon="akar-icons:google-fill" /><span>Login with Google</span></button>
      <NavLink className="next" to="step-2">
        <span>Next</span>
      </NavLink>
    </div>
  );
}

export default HomeRegisterStepOne;
