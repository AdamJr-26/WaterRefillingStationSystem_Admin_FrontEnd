import React from "react";
import { Icon } from "@iconify/react";
function AdminSearchbox({placeholder}) {
  return (
    <div className="admin-searchbox">
      <Icon className="admin-searchbox--icon" icon="eva:search-fill" />
      <input className="admin-searchbox--search" type="text" placeholder="search" />
    </div>
  );
}

export default AdminSearchbox;
