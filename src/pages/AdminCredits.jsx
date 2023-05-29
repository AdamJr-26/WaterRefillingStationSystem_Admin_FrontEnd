import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import AdminCreditNewTransaction from "../components/credits/AdminCreditNewTransaction";
import { newTransactionState } from "../lib/store/globalPopupSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountReceivable from "../components/credits/AccountReceivable";
import useFetch from "../hooks/api/useFetch";

function AppCredits() {
  const dispatch = useDispatch();
  const newTransactionPopupState = useSelector(
    (state) => state.globalPopupSlice.newTransactionValue
  );
  const isNotActive = () =>
    window.location.pathname !== "/admin/credits/history" ? true : false;

  const {
    data: receivable,
    error,
    mutate: mutateReceivable,
    isValidating,
    isLoading,
  } = useFetch({
    url: "/api/credits/account-receivable",
  });

  return (
    <div>
      <div className="admin-credits">
        <AccountReceivable data={receivable} />
        <div className="admin-credits--transactions-wrapper">
          <div className="admin-credits--transactions-wrapper__links">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive && isNotActive() ? "active" : ""
              }
            >
              Credits
            </NavLink>
            <NavLink
              to="history"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              History
            </NavLink>
          </div>
          <div className="admin-credits--transactions-wrapper__outlet">
            <Outlet context={{ mutateReceivable }} />
          </div>
        </div>
        {/* pop ups / modal */}
        {newTransactionPopupState && <AdminCreditNewTransaction />}
      </div>
    </div>
  );
}

export default AppCredits;
