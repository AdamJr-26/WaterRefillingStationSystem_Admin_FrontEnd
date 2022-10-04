import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminCredits from "../pages/AdminCredits";
import AdminCustomers from "../pages/AdminCustomers";
import AdminDashboard from "../pages/AdminDashboard";
import AdminDelivery from "../pages/AdminDelivery";
import AdminEmployess from "../pages/AdminEmployess";
import AdminInventory from "../pages/AdminInventory";
import AdminReports from "../pages/AdminReports";
import Admin from "../pages/Admin";
import AdminCreditsTransactions from "../components/AdminCreditsTransactions";
import React from "react";
import Home from "../pages/Home";
import HomeRegister from "../pages/HomeRegister";
import HomeLogin from "../pages/HomeLogin";
import HomeRegisterStepOne from "../pages/HomeRegisterStepOne";
import HomeRegisterStepTwo from "../pages/HomeRegisterStepTwo";
import AdminShop from "../pages/AdminShop";



function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="login" element={<HomeLogin />} />
          <Route path="register" element={<HomeRegister /> } >
            <Route index element={<HomeRegisterStepOne />} />
            <Route path="step-2" element={<HomeRegisterStepTwo />} />
          </Route>
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="credits" element={<AdminCredits />} >
             <Route index  element={<AdminCreditsTransactions />} />
             <Route path="last-transactions"  element={<AdminCreditsTransactions />} />
          </Route>
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="delivery" element={<AdminDelivery />} />
          <Route path="employees" element={<AdminEmployess />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="shop" element={<AdminShop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
