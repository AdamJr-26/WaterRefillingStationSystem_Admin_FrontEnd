import React from "react";
import AdminInventoryAddGallon from "./AdminInventoryAddGallon";

function GlobalPopups() {
  return (
    // this is global component handler and absolute to body.
    <div className="admin-global-popup">{false && <AdminInventoryAddGallon />}</div>
  );
}

export default GlobalPopups;
