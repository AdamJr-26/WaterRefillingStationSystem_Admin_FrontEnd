    import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminProfileOption from "./AdminProfileOption";
import { updateSidebarStatus } from "../lib/store/sideBarState";

import { useDispatch, useSelector } from "react-redux";
function AdminTopbar() {
  const [pathname, setPathname] = useState();
  const active_route = window.location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateSidebarStatus());
    setPathname(active_route);
  }, [active_route]);
    // hindi nag rerender ang pathname dahil hindi nag rererun ang buong component
  return (
    <div className="topbar">
      <div className="topbar--menu-btn">
        <button onClick={() => dispatch(updateSidebarStatus())}>
          <Icon icon="dashicons:menu" />
        </button>
        <p className="route"></p>
      </div>
      <div className="topbar--profile">
        <span className="name">Elon</span>
        <img src="https://picsum.photos/200" alt="admin image" srcSet="" />
      </div>
    </div>
  );
}

export default AdminTopbar;
