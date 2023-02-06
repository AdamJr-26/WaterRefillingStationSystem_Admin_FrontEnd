import React, { useEffect, useState } from "react";

import AdminCustomerDataTable from "../components/customer/AdminCustomerDataTable";
import CustomerDiscountCards from "../components/customer/discount/CustomerDiscountCards";
import { Icon } from "@iconify/react";
import AdminCustomerAddDiscount from "../components/customer/discount/AdminCustomerAddDiscount";
import useFetch from "../hooks/api/useFetch";
import CustomerStatusTableWrapper from "../components/customer/component.wrapper/CustomerStatusTableWrapper";

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
  // get customers

  return (
    <div className="admin-customers">
      <CustomerStatusTableWrapper />
      <div className="admin-customers-discounts">
        <div className="table-customers--header">
          <div className="table-customers--header__title-description">
            <p className="title">Discounts</p>
            <p className="description">Create discounts for customers</p>
          </div>
          <div className="table-customers--header__menu">
            <div className="add-discount">
              <AdminCustomerAddDiscount />
            </div>
          </div>
        </div>
        <CustomerDiscountCards />
      </div>
    </div>
  );
}

export default AdminCustomers;
