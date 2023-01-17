import React, { useEffect, useState } from "react";

import AdminCustomerDataTable from "../components/customer/AdminCustomerDataTable";
import CustomerDiscountCards from "../components/customer/discount/CustomerDiscountCards";
import { Icon } from "@iconify/react";
import AdminCustomerAddDiscount from "../components/customer/discount/AdminCustomerAddDiscount";

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
      <div className="admin-customers-discounts">
        <div className="table-customers--header">
          <div className="table-customers--header__title-description">
            <p className="title">Discounts</p>
            <p className="description">Crate discounts for customers</p>
          </div>
          <div className="table-customers--header__menu">
            <div className="add-discount">
              <AdminCustomerAddDiscount />
            </div>
          </div>
        </div>
        <CustomerDiscountCards />
      </div>
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
                <button className="query-by--options__button">All</button>
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
