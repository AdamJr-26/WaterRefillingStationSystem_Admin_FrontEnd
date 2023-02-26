import React from "react";
import wrssLogo from "../assets/images/logo/wrss-logo.png";
import { links } from "../router/links.js";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { updateSidebarStatus } from "../lib/store/sideBarState";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function AdminSidebar() {
  const sidebarState = useSelector((state) => state.sidebarState.value);
  const active_route = window.location.href;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSidebarStatus());
  }, [active_route]);
  return (
    <>
      {sidebarState && (
        <div className="sidebar">
          <div className="sidebar--wrsss-logo">
            <img src={wrssLogo} alt="wrss-logo" srcSet="" />
            <span>Neptune [ Admin ]</span>
            <button
              className="sidebar--wrsss-logo__close-menu-button"
              onClick={() => dispatch(updateSidebarStatus())}
            >
              <Icon className="icon" icon="carbon:side-panel-close-filled" />
            </button>
          </div>
          <div className="sidebar--links">
            <NavLink
              to={links[0].path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar--links__dashboard active"
                  : "sidebar--links__dashboard"
              }
            >
              <Icon className="icon" icon={links[0].icon} />
              <span>{links[0].name}</span>
            </NavLink>
            <p className="pages">Pages</p>
            <div className="sidebar--links__pages">
              {links[1].pages.map((link) => (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                  key={link.path}
                >
                  <span className="icon">
                  <Icon  icon={link.icon} />
                  </span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminSidebar;
