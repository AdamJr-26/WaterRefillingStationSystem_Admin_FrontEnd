import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { useSelector } from "react-redux";
import AdminInventoryAddGallon from "../components/inventory/AdminInventoryAddGallon";
import AdminInventoryAddVehicle from "../components/inventory/AdminInventoryAddVehicle";
import AdminSideBarWrapper from "../components/AdminSideBarWrapper";
import { ProSidebarProvider } from "react-pro-sidebar";

// import { useLocation, Navigate } from "react-router-dom";
//
// useAuth is a custom hook returing the user's authentication
// import useAuth from "../../../hooks/useAuth";

function MainApp() {
  const { addGallonValue, addVehicleValue } = useSelector(
    (state) => state.globalPopupSlice
  );
  return (
    <div className="admin-layout">
      <ProSidebarProvider>
        <AdminSideBarWrapper />
      </ProSidebarProvider>
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
}

export default MainApp;
