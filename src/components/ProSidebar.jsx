import React, { useState } from "react";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { links } from "../router/links.js";
import { Icon } from "@iconify/react";
import wrssLogo from "../assets/images/logo/wrss-logo.png";
function ProSidebar() {
  const { collapseSidebar, collapsed, toggleSidebar, toggled, broken, rtl } =
    useProSidebar();
  const [activeLink, setActiveLink] = useState(
    window.location.pathname.split("/")[2]
  );
  return (
    <div className="admin-pro-sidebar">
      <Sidebar
        breakPoint="lg"
        rootStyles={{
          height: "100%",
        }}
        defaultCollapsed={true}
        closeOnClick={true}
      >
        <Menu
          className="admin-pro-sidebar-menu"
          menuItemStyles={{
            icon: {
              color: "#2389DA", // Change the color for active menu item
              fontSize: "27px",
            },
          }}
          
        >
          <div className="admin-pro-sidebar-wrsms-logo-wrapper">
            <img src={wrssLogo} alt="wrss-logo" srcSet="" />
            {collapsed ? null : <span>Neptune [ Admin ]</span>}
          </div>

          <MenuItem
          
            className={`admin-pro-sidebar-menu-item ${
              activeLink === links[0].path ? "active" : ""
            }`}
            icon={<Icon icon={links[0].icon} />}
            component={
              <NavLink
                to={links[0].path}
                key={links[0].path}
                onClick={(e) => {
                  setActiveLink(links[0].path);
                }}
              />
            }
          >
            <span className="admin-pro-sidebar-menu-item-label">
              {links[0].name}
            </span>
          </MenuItem>
          {links[1].pages.map((link) => (
            <MenuItem
              className={`admin-pro-sidebar-menu-item ${
                activeLink === link.path ? "active" : ""
              }`}
              icon={<Icon icon={link.icon} />}
              component={
                <NavLink
                  to={link.path}
                  key={link.path}
                  onClick={(e) => {
                    setActiveLink(link.path);
                  }}
                />
              }
            >
              <span className="admin-pro-sidebar-menu-item-label">
                {link.name}
              </span>
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      {!broken ? (
        <div
          className="admin-pro-sidebar--collapse"
          onClick={() => collapseSidebar()}
        >
          <button>
            <span>
              {collapsed ? (
                <Icon icon="material-symbols:arrow-forward-ios-rounded" />
              ) : (
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
              )}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ProSidebar;
