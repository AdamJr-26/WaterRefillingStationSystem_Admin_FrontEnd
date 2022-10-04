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
  const customersColumn = [
    { field: "id", headerName: "ID" },
    {
      field: "View",
      renderCell: (cellValues) => {
        const handleClick = (e) => {
          e.stopPropagation();
          setCustomerToview(cellValues.row.id);
        };
        return (
          <button
            onClick={(e) => handleClick(e, cellValues)}
            className="admin-dataGrid-button-primary"
          >
            View
          </button>
        );
      },
    },
    {
      field: "image",
      renderCell: (cellValues) => {
        return (
          <img
            src={cellValues.row.image}
            alt="customer-image"
            style={{ width: 50 }}
          />
        );
      },
    },
    { field: "name", headerName: "Name", flex:1  , minWidth: 100},
    { field: "contact_number", headerName: "Contact Number", flex:1, minWidth: 100 },
    { field: "address", headerName: "Address", flex:1, minWidth: 100 },
    { field: "gender", headerName: "Gender",flex:1, minWidth: 100 },
    { field: "age", headerName: "Age",flex:1, minWidth: 100 },
  ];

  return (
    <div className="admin-customers">
      <div className="admin-customers--list">
        <div className="admin-customers--list__header">
          <span>Customers</span>
        </div>
        <AdminDataGrid TableRows={customers} TableColumns={customersColumn} />
      </div>
      {customerToview && (
        <AdmincustomerViewer closeViewer={setCustomerToview} customerID="2" />
      )}
    </div>
  );
}

export default AdminCustomers;
