import React, { useEffect, useState } from "react";

import AdminDataGrid from "../components/AdminDataGrid";
import { customers } from "../lib/sample/data";
import AdmincustomerViewer from "../components/AdmincustomerViewer";
import AdminCustomerDataTable from "../components/customer/AdminCustomerDataTable";

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
      <div className="table-customers">
        <div className="table-customers--header">
          <div className="table-customers--header__title-description">
            <p className="title">customers</p>
            <p className="description">Manage your customers</p>
          </div>
          <div className="table-customers--header__menu">
            <div className="query-by">
              <p className="query-by--title">Query by</p>
              <div className="query-by--options">
                <button className="query-by--options__button" >All</button>
              </div>
            </div>
          </div>
        </div>
        <AdminCustomerDataTable data={[]} />
      </div>
    </div>
  );
}

export default AdminCustomers;
