import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo/wrss-logo.png";
function NavLinks({ styleClass }) {
  return (
    <div className={styleClass}>
      {/* <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/">
        <span>Home</span>
      </NavLink> */}
      <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/login">
        <span>Login</span>
      </NavLink>
      <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/register">
        <span>Register</span>
      </NavLink>
      {/* <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)}to="/about-us">
        <span>About Us</span>
      </NavLink>
      <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/contact-us">
        <span>Contact Us</span>
      </NavLink> */}
      <div className="animation start-home"></div>
    </div>
  );
}

function HomeNavbar() {
  const active_route = window.location.href;
  const [navState, setNavState] = useState(false);
  return (
    <div className="nav">
      <div className="nav--logo">
        <img src={logo} alt="wrss-logo" srcSet="" />
        <span className="nav--logo__title">WRSS</span>
      </div>
      {
        !navState && <NavLinks navState={navState} styleClass="nav--links" />
      }
      
      <div className="nav--menu">
        <button onClick={() => setNavState(!navState)}>
          <Icon icon="ci:menu-alt-02" />
        </button>
        {
            navState && <NavLinks navState={navState} styleClass="nav--links-mobile" />
        }
      </div>
    </div>
  );
}

export default HomeNavbar;
