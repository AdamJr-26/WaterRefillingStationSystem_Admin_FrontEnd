import React from "react";
import { NavLink } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="home-welcome-page-wrapper">
      <div className="home-welcome-page-wrapper--title">
        <p>Neptune: Water Refilling Management System</p>
      </div>
      <div className="home-welcome-page-wrapper--description">
        <p>
          <span>NEPTUNE</span> is an innovative management system designed to revolutionize
          the way water refilling stations manage their daily operations. With a
          focus on streamlining the delivery process, tracking sales, and
          managing inventory, Neptune is the ultimate solution for water
          refilling station owners who are looking to boost their efficiency and
          productivity.
        </p>
      </div>
      <div className="home-welcome-page-wrapper--links">
        <NavLink
          className="home-welcome-page-wrapper--links__create-account-btn"
          to="/register"
        >
          <span>Create account</span>
        </NavLink>
        <NavLink
          className="home-welcome-page-wrapper--links__login-account-btn"
          to="/login"
        >
          <span>Login</span>
        </NavLink>
      </div>
      <div className="home-welcome-page-wrapper--background-image">
        <img
          src="https://res.cloudinary.com/dy1od3qwx/image/upload/v1677588122/thesis/images/welcome-page-bg-hero_g2fjcn.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default WelcomePage;
