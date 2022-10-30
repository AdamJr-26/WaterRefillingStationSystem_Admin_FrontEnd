import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { useSelector } from "react-redux";
import AdminInventoryAddGallon from "../components/AdminInventoryAddGallon";
import AdminInventoryAddVehicle from "../components/AdminInventoryAddVehicle";

// import { useLocation, Navigate } from "react-router-dom";
//
// useAuth is a custom hook returing the user's authentication
// import useAuth from "../../../hooks/useAuth";
import userAuth from "../hooks/userAuth";
import LoadingSpinner from "../components/LoadingSpinner";

function MainApp() {
  const { addGallonValue, addVehicleValue } = useSelector(
    (state) => state.globalPopupSlice
  );
  const auth = userAuth();
  const location = useLocation();

  // Admin Page is also an outlet of admin routes, it prevents the
  // unauthorized users to get in.
  if (auth.loading) {
    return <LoadingSpinner />
  } else if (auth?.authorized && !auth?.loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-layout--main">
          <AdminTopbar />
          <div className="admin-layout--main__content">
            {/* modal */}
            <Outlet />
            {addGallonValue && <AdminInventoryAddGallon />}
            {addVehicleValue && <AdminInventoryAddVehicle />}
          </div>
        </div>
      </div>
    );
  } else if (!auth?.authorized && !auth?.loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default MainApp;
