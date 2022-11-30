import React, { useEffect, useState } from "react";

import AdminDataGrid from "../components/AdminDataGrid";
import { customers } from "../lib/sample/data";
import AdmincustomerViewer from "../components/AdmincustomerViewer";

function AdminCustomers() {
  const [customerToview, setCustomerToview] = useState("");
  useEffect(() => {
    return () => {
      setCustomerToview("");
    };
  }, []);

  useEffect(() => {
    // fetch user here
    if (customerToview !== "") {
      console.log("fetching customer ehre");
    }
  }, [customerToview]);
  // ---------------------


  return (
    <div className="admin-customers">
      <div className="admin-customers--list">
        <div className="admin-customers--list__header">
          <span>Customers</span>
        </div>
        {/* <AdminDataGrid TableRows={customers} TableColumns={customersColumn} /> */}
      </div>
      {/* {customerToview && (
        <AdmincustomerViewer closeViewer={setCustomerToview} customerID="2" />
      )} */}
    </div>
  );
}

export default AdminCustomers;
