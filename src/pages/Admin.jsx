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
import useAuth from "../hooks/useAuth";

function MainApp() {
  const {addGallonValue, addVehicleValue} = useSelector(
    (state) => state.globalPopupSlice
  );
  const auth = useAuth();
  const location = useLocation();

// Admin Page is also an outlet of admin routes, it prevents the 
// unauthorized users to get in.
  return auth?.user?  (
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
  ):(
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default MainApp;
