import React from "react";
import AdminCreditNewTransaction from "./AdminCreditNewTransaction";

import useFetch from "../../hooks/api/useFetch";

/*
 css class is included inside AdminCredits.jsx/scss.

*/
function AccountReceivable({ data }) {
  
  return (
    <div className="admin-credits--total">
      <div className="admin-credits--total__receivable">
        <span className="title">Account Receivable</span>
        <span className="amount">₱ {data?.data[0]?.account_receivable}</span>
      </div>
      <div className="admin-credits--total__summary">
        <p className="admin-credits-summary-title">Summary</p>
        <div className="admin-has-credits-wrapper">
          <span className="title">Credits to settle</span>
          <span className="amount">{data?.data[0]?.credits_to_settle}</span>
        </div>
        <div className="admin-credits-summary-wrapper">
          <span className="title">Items</span>
          <span className="amount">{data?.data[0]?.total_items}</span>
        </div>
        <button>Search</button>
      </div>
    </div>
  );
}

export default AccountReceivable;
