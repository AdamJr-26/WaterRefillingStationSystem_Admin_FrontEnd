import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import AdminInventoryFloatingActionButton from "../components/inventory/AdminInventoryFloatingActionButton";
import AdminInventoryDataTableGallon from "../components/inventory/AdminInventoryDataTableGallon";
import useGallons from "../hooks/api/useGallons";
import AdminInventoryDataTableVehicle from "../components/inventory/AdminInventoryDataTableVehicle";
import useVehicles from "../hooks/api/useVehicles";

function AppInventory() {
  const dispatch = useDispatch();
  // const updateGallonModalState = updatedDatauseSelector(
  //   (state) => state.globalPopupSlice.updateGallonValue
  // );
  const { gallons, gallonsError } = useGallons({
    url: "/api/gallons",
  });
  const gallonsData = gallons?.data;
  const { vehicles, vehiclesError } = useVehicles({ url: "/api/vehicles" });
  const vehiclesData = vehicles?.data;

  return (
    <div className="inventory">
      <div className="table-gallon">
        <div className="table-gallon--header">
          <p className="table-gallon--header__title">Gallons</p>
          <p className="table-gallon--header__description">
            Tracks your gallons inventory
          </p>
        </div>
        <AdminInventoryDataTableGallon
          data={gallonsData}
          error={gallonsError?.data}
        />
      </div>
      <div className="table-vehicle">
        <div className="table-vehicle--header">
          <p className="table-vehicle--header__title">Vehicles</p>
          <p className="table-vehicle--header__description">
            Tracks your vehicles inventory
          </p>
        </div>
        <AdminInventoryDataTableVehicle
          data={vehiclesData}
          error={vehiclesError}
        />
      </div>
      <AdminInventoryFloatingActionButton />
    </div>
  );
}

export default AppInventory;
