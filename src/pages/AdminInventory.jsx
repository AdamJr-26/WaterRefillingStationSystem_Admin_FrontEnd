import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import AdminInventoryFloatingActionButton from "../components/inventory/AdminInventoryFloatingActionButton";
import AdminInventoryDataTableGallon from "../components/inventory/AdminInventoryDataTableGallon";
import useGallons from "../hooks/api/useGallons";
import AdminInventoryDataTableVehicle from "../components/inventory/AdminInventoryDataTableVehicle";
import useVehicles from "../hooks/api/useVehicles";
import useFetch from "../hooks/api/useFetch";
import ListSkeletonLoading from "../components/general/ListSkeletonLoading";
import { Button } from "@chakra-ui/react";
import { addGallonState, addVehicleState } from "../lib/store/globalPopupSlice";
function AppInventory() {
  // const dispatch = useDispatch();
  // const updateGallonModalState = updatedDatauseSelector(
  //   (state) => state.globalPopupSlice.updateGallonValue
  // );

  // const { gallons, gallonsError } = useGallons({
  //   url: "/api/gallons",
  // });
  // console.log("gallons", gallons);
  // const { vehicles, vehiclesError, } = useVehicles({ url: "/api/vehicles" });
  // const vehiclesData = vehicles?.data;
  const dispatch = useDispatch();

  const {
    data: gallonData,
    error: gallonError,
    mutate: mutateGallon,
    isValidating: isValidatingGallons,
  } = useFetch({
    url: "/api/gallons",
  });
  const {
    data: vehicleData,
    error: vehicleError,
    mutate: mutateVehicles,
    isValidating: isValidatingVehicles,
  } = useFetch({
    url: "/api/vehicles",
  });
  // console.log("gallonData", gallonData?.data);
  return (
    <div className="inventory">
      <div className="table-gallon">
        <div className="table-gallon--header">
          <div className="table-gallon--header__title-description">
            <p className="table-product-header-title">Gallon</p>
            <p className="table-product-header-description">
              Tracks gallons accurately.
            </p>
          </div>
          <div className="table-gallon--header__buttons">
            <Button
              backgroundColor="#2389DA"
              borderRadius="15px"
              height="45px"
              color="white"
              onClick={() => dispatch(addGallonState())}
            >
              Add gallon
            </Button>
          </div>
        </div>
        {!isValidatingGallons ? (
          <AdminInventoryDataTableGallon
            data={gallonData?.data}
            error={gallonError}
          />
        ) : (
          <ListSkeletonLoading num_lines={4} />
        )}
      </div>
      <div className="table-vehicle">
        <div className="table-vehicle--header">
          <div className="table-vehicle--header__title-description">
            <p className="table-product-header-title">Vehicle</p>
            <p className="table-product-header-description">
              Tracks vehicle accurately.
            </p>
          </div>
          <div className="table-vehicle--header__buttons">
            <Button
              backgroundColor="#2389DA"
              borderRadius="15px"
              height="45px"
              color="white"
              onClick={() => dispatch(addVehicleState())}
            >
              Add vehicle
            </Button>
          </div>
        </div>
        {!isValidatingVehicles ? (
          <AdminInventoryDataTableVehicle
            data={vehicleData?.data}
            error={vehicleError}
          />
        ) : (
          <ListSkeletonLoading num_lines={4} />
        )}
      </div>
      {/* <AdminInventoryFloatingActionButton /> */}
    </div>
  );
}

export default AppInventory;
