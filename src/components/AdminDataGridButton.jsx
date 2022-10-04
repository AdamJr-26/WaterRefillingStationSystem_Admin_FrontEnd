import React from "react";

function AdminDataGridButton({ label, variant }) {
  return (
    <button type="button" className={`admin-dataGrid-button-${variant}`}>{label}</button>
  );
}

export default AdminDataGridButton;
