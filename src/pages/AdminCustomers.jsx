import React, { useEffect, useState } from "react";

import AdminCustomerDataTable from "../components/customer/AdminCustomerDataTable";
import CustomerDiscountCards from "../components/customer/discount/CustomerDiscountCards";
import { Icon } from "@iconify/react";
import AdminCustomerAddDiscount from "../components/customer/discount/AdminCustomerAddDiscount";
import useFetch from "../hooks/api/useFetch";
import CustomerStatusTableWrapper from "../components/customer/wrapper/CustomerStatusTableWrapper";
import ListSkeletonLoading from "../components/general/ListSkeletonLoading";
import CreateCreditLImit from "../components/customer/discount/CreateCreditLImit";
import CreditLimitCards from "../components/customer/credit-limits/CreditLimitCards";
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
            <p className="title">Promo</p>
            <p className="description">
              To increase sales and attract new business, we can create a promo
              for customers.
            </p>
          </div>
          <div className="table-customers--header__menu">
            <div className="add-discount">
              <AdminCustomerAddDiscount />
            </div>
          </div>
        </div>
        <CustomerDiscountCards />
      </div>
      <div className="admin-customers-discounts">
        <div className="table-customers--header">
          <div className="table-customers--header__title-description">
            <p className="title">Credit limits</p>
            <p className="description">Set credit limit for customers.</p>
          </div>
          <div className="table-customers--header__menu">
            <div className="add-discount">
              <CreateCreditLImit />
            </div>
          </div>
        </div>
        <CreditLimitCards />
      </div>
    </div>
  );
}

export default AdminCustomers;
