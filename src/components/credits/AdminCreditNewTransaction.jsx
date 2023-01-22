import React from "react";
import AdminSearchbox from "../AdminSearchbox";
import { Icon } from "@iconify/react";
import AdminTextinput from "../general/AdminTextinput";
import { newTransactionState } from "../../lib/store/globalPopupSlice";
import { useDispatch } from "react-redux";
function AdminCreditNewTransaction() {
    const dispatch = useDispatch();
  return (
    <div className="admin-credit-new-transaction">
      <div className="admin-credit-new-transaction--header">
        <span className="admin-credit-new-transaction--header__title">
          New Transaction
        </span>
        <button  onClick={()=>dispatch(newTransactionState())} className="admin-credit-new-transaction--header__close-button">
          <Icon icon="bi:x" />
        </button>
      </div>
      <AdminSearchbox />
      <div className="admin-credit-new-transaction--customer-info">
        <img className="admin-credit-new-transaction--customer-info__image" src="https://picsum.photos/200" alt="customer-image" srcSet="" />
        <span className="admin-credit-new-transaction--customer-info__name">Juan Dela Cruz</span>
        <div className="admin-credit-new-transaction--customer-info__credit">
            <span className="total-to-pay-title">Total to pay</span>
            <span className="total-to-pay-amount">P 360</span>
        </div>
      </div>
      <AdminTextinput label="Amount" />
      <div className="admin-credit-new-transaction--customer-info__buttons">
        <button className="cancel">Cancel</button>
        <button className="submit">Submit</button>
      </div>
    </div>
  );
}

export default AdminCreditNewTransaction;
