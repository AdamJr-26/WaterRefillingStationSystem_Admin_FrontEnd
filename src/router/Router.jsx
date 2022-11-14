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
import HomeVerify from "../pages/HomeVerify";
import VerifyPage from "../pages/VerifyPage";

// reset password
import ResetPasswordLayout from "../pages/reset.password/ResetPasswordLayout";
import CheckEmail from "../pages/reset.password/CheckEmail";
import ForgotPassword from "../pages/reset.password/ForgotPassword";
import PassworReset from "../pages/reset.password/PassworReset";
import SetNewPassword from "../pages/reset.password/SetNewPassword";

import { ProtectRoutes } from "../hooks/protectRoutes";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* reset password */}

        <Route path="forgot-password" element={<ResetPasswordLayout />}>
          <Route index element={<ForgotPassword />} />
          <Route path="check-email" element={<CheckEmail />} />
          <Route path="set-new-password" element={<SetNewPassword />} />
          <Route path="password-reset" element={<PassworReset />} />
        </Route>

        <Route path="/" element={<Home />}>
          {/* wrap this with RequireAuth */}

          <Route path="login" element={<HomeLogin />} />
          <Route path="redirect-register" element={<HomeVerify />} />
          <Route path="redirect-verify" element={<VerifyPage />} />
          <Route path="register" element={<HomeRegister />}>
            <Route index element={<HomeRegisterStepOne />} />
            <Route path="step-2" element={<HomeRegisterStepTwo />} />
          </Route>
        </Route>

        <Route path="/admin" element={<ProtectRoutes />}>
          <Route path="credits" element={<AdminCredits />}>
            <Route index element={<AdminCreditsTransactions />} />
            <Route
              path="last-transactions"
              element={<AdminCreditsTransactions />}
            />
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
