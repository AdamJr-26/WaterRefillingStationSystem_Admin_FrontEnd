import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { useSelector } from "react-redux";
import AdminInventoryAddGallon from "../components/AdminInventoryAddGallon";
import AdminInventoryAddVehicle from "../components/AdminInventoryAddVehicle";


function MainApp() {
  const {addGallonValue, addVehicleValue} = useSelector(
    (state) => state.globalPopupSlice
  );

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-layout--main">
        <AdminTopbar />
        <div className="admin-layout--main__content">
          
          <Outlet />
          {addGallonValue && <AdminInventoryAddGallon />}
          {addVehicleValue && <AdminInventoryAddVehicle />}
         
        </div>
      </div>
    </div>
  );
}

export default MainApp;
