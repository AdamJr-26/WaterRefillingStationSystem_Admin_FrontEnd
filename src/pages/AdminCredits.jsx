import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import AdminCreditNewTransaction from '../components/AdminCreditNewTransaction'
import { newTransactionState } from "../lib/store/globalPopupSlice";
import { useDispatch, useSelector } from "react-redux";
function AppCredits() {
  const dispatch = useDispatch();
  const newTransactionPopupState = useSelector((state)=>state.globalPopupSlice.newTransactionValue)
  const isNotActive = ()=> window.location.pathname !== "/admin/credits/last-transactions"? true: false;
  return (
    <div className='admin-credits'>
      <div className="admin-credits--total">
        <div className="admin-credits--total__receivable">
          <span className='title'>Account Receivable</span>
          <span className='amount'>P 35,450</span>
        </div>
        <div className='admin-credits--total__summary'>
          <p className="admin-credits-summary-title">Summary</p>          
          <div className="admin-has-credits-wrapper">
            <span className='title'>Total has credits</span>
            <span className='amount'>36</span>
          </div>
          <div className="admin-credits-summary-wrapper">
            <span className='title'>Items</span>
            <span className='amount'>16623</span>
          </div>
          <button onClick={()=>dispatch(newTransactionState())}>
            New Transaction
          </button>
        </div>
      </div>
      <div className='admin-credits--transactions-wrapper'>
        <div className='admin-credits--transactions-wrapper__links'>
        <NavLink to="" className={({isActive})=>(isActive && isNotActive()? "active":"")} >Account Receivable</NavLink>
        <NavLink to="last-transactions" className={({isActive})=>(isActive? "active":"")} >Last transactions</NavLink>
        </div>
        <div className='admin-credits--transactions-wrapper__outlet'>
          
            <Outlet />
          </div>
      </div>
      {/* pop ups / modal */}
      {newTransactionPopupState && <AdminCreditNewTransaction />}
    </div>
  )
}

export default AppCredits