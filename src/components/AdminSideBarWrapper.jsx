import React from "react";
import ProSidebar from "./ProSidebar";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Icon } from "@iconify/react";
function AdminSideBarWrapper() {
  const { collapseSidebar, collapsed, toggleSidebar, toggled, broken, rtl } =
    useProSidebar();
  // the styling of this component is in _adminProSidebar.scss
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <ProSidebar />
      {toggled ? null : (
        <button
          onClick={() => {
            toggleSidebar();
            collapseSidebar();
          }}
          className="admin-pro-sidebar-toggle-button"
        >
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </button>
      )}
    </div>
  );
}

export default AdminSideBarWrapper;
