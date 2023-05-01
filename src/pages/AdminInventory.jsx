import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import AdminInventoryFloatingActionButton from "../components/inventory/AdminInventoryFloatingActionButton";
import AdminInventoryDataTableGallon from "../components/inventory/AdminInventoryDataTableGallon";
import useGallons from "../hooks/api/useGallons";
import AdminInventoryDataTableVehicle from "../components/inventory/AdminInventoryDataTableVehicle";
import useVehicles from "../hooks/api/useVehicles";
import useFetch from "../hooks/api/useFetch";
import ListSkeletonLoading from "../components/general/ListSkeletonLoading";
import {
  Button,
  Spinner,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { addGallonState, addVehicleState } from "../lib/store/globalPopupSlice";
import { apiGet } from "../services/api/axios.methods";
import GallonInventoryTable from "../components/inventory/GallonInventoryTable";
import VehicleInventoryTable from "../components/inventory/VehicleInventoryTable";
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

  // const {
  //   data: gallonData,
  //   error: gallonError,
  //   mutate: mutateGallon,
  //   isLoading: isLoadingGallon,
  //   isValidating: isValidatingGallons,
  // } = useFetch({
  //   url: "/api/gallons",
  // });
  // const {
  //   data: vehicleData,
  //   error: vehicleError,
  //   mutate: mutateVehicles,
  //   isValidating: isValidatingVehicles,
  // } = useFetch({
  //   url: "/api/vehicles",
  // });
  // console.log("gallonData", gallonData?.data);

  let limit = 10;
  const [gallonPage, setGallonPage] = useState(1);
  const [isLoadingGallon, setIsLoadingGallon] = useState(false);
  const [gallonDataTable, setGallonDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });

  useEffect(() => {
    async function fetchFunction() {
      setIsLoadingGallon(true);
      const { data, error } = await apiGet(
        `/api/gallons/${limit}/${gallonPage}`
      );
      console.log("gallonDataTable-->>>>>>>>>", data);
      if (data && !error) {
        setIsLoadingGallon(false);
        setGallonPage(data.data.page);
        setGallonDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingGallon(false);
      }
    }
    fetchFunction();
  }, [gallonPage]);

  const [vehiclePage, setVehiclePage] = useState(1);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [vehicleDataTable, setVehicleDatTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
  useEffect(() => {
    async function fetchFunction() {
      setIsLoadingVehicle(true);
      const { data, error } = await apiGet(
        `/api/vehicles/${limit}/${vehiclePage}`
      );
      console.log("vehicleDataTable-->>>>>>>>>", data);
      if (data && !error) {
        setIsLoadingVehicle(false);
        setVehiclePage(data.data.page);
        setVehicleDatTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingVehicle(false);
      }
    }
    fetchFunction();
  }, [vehiclePage]);
  return (
    <div className="inventory">
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>Gallons</Tab>
          <Tab>Vehicles</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="table-gallon">
              <div className="table-gallon--header">
                <div className="table-gallon--header__title-description">
                  <p className="table-product-header-title">Gallons</p>
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
              {isLoadingGallon ? (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  minHeight="150px"
                  position="absolute"
                  left="50%"
                  top="50%"
                  transform="translate(-50%, -50%)"
                >
                  <Spinner size="xl" color="blue.200" thickness="5px" />
                </Stack>
              ) : null}
              <GallonInventoryTable
                data={gallonDataTable}
                currentPage={gallonPage}
                setPage={setGallonPage}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="table-vehicle">
              <div className="table-vehicle--header">
                <div className="table-vehicle--header__title-description">
                  <p className="table-product-header-title">Vehicles</p>
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
              {isLoadingVehicle ? (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  minHeight="150px"
                  position="absolute"
                  left="50%"
                  top="50%"
                  transform="translate(-50%, -50%)"
                >
                  <Spinner size="xl" color="blue.200" thickness="5px" />
                </Stack>
              ) : null}
              <VehicleInventoryTable
                data={vehicleDataTable}
                currentPage={vehiclePage}
                setPage={setVehiclePage}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default AppInventory;
