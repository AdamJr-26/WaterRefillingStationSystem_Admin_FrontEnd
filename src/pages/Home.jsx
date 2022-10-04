import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";

function Home() {
  return (
    <div className="home">
      <HomeNavbar />
      <div className="home--outlet">
        <Outlet />
      </div>
      <div className="home--footer">
        <NavLink to="about-us" > About-us </NavLink>
        <NavLink to="contact-us" > Contact-us </NavLink>
      </div>
    </div>
  );
}

export default Home;
