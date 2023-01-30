import React from "react";
import { Icon } from "@iconify/react";
function AdminSearchbox({ placeholder, setValue, value }) {
  return (
    <div className="admin-searchbox">
      <Icon className="admin-searchbox--icon" icon="eva:search-fill" />
      <input
        className="admin-searchbox--search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default AdminSearchbox;
