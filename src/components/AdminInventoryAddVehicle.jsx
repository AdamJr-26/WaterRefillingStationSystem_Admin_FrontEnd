import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import gallon from "../assets/images/gallons_transparent/icons/6L.png";
import ScrollContainer from "react-indiana-drag-scroll";
import AdminTextinput from "./AdminTextinput";
import { addVehicleState } from "../lib/store/globalPopupSlice";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { vehicles } from "../assets/images/vehicles";
import { addVehicle } from "../services/api/inventory/inventory.post";
import { useToast, Button } from "@chakra-ui/react";
function AdminInventoryAddVehicle() {
  const dispatch = useDispatch();
  const [vehicle_image, setVehicleImage] = useState(null);
  const [vehicle_DataUrl_image, setVehicleDataUrlImage] = useState(null);
  const [isSubmitting, setSubmitting] = useState(null);
  let resetRef = useRef(null);
  const toast = useToast();

  return (
    <div className="admin-inventory-add-vehicle">
      <div className="admin-inventory-add-gallon--head">
        <p>Add New Vehicle</p>
        <button onClick={() => dispatch(addVehicleState())}>
          <Icon icon="bi:x" />
        </button>
      </div>
      <span className="select-gallon">Select Vehicle </span>
      <Formik
        initialValues={{
          vehicle_name: "",
          vehicle_id: "",
        }}
        validationSchema={Yup.object().shape({
          vehicle_name: Yup.string().max(10, "Vehicle name must not exceed 20 letters").required("Vehicle Name is Required"),
          vehicle_id: Yup.string().max(20, "Vehicle ID must not exceed 20 letters").required("Vehicle ID is Required"),
        })}
        onSubmit={async (values) => {
          if (vehicle_image) {
            setSubmitting(true);
            const res = await addVehicle(values, vehicle_image);
            if (res.data && !res.error) {
              resetRef.current.click();
              setVehicleImage(null);
              setVehicleDataUrlImage(null);
              // toast
              setSubmitting(false);
              const { message, description } =
                res?.data?.fullMessage?.add_vehicle_admin;
              toast({
                title: description,
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } else {
              setSubmitting(false);
              console.log("res.errorres.error",res)
              const { fullError, message } =
                res.error?.response?.data?.errors?.add_vehicle_admin;
              toast({
                title: fullError,
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              console.log(res.error);
            }
          } else {
            toast({
              title: "No Image selected",
              description: "Please choose an image.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        }}
      >
        <Form>
          <div className="admin-inventory-add-vehicle--images">
            <div className="admin-inventory-add-vehicle--images__input-file">
              <input
                type="file"
                name="image"
                id="gallon_link"
                accept="image/*"
                onChange={(e) => {
                  let files = e.target.files;
                  let reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = (e) => {
                    setVehicleDataUrlImage(e.target.result);
                  };
                  setVehicleImage(files[0]);
                }}
              />
              {vehicle_image || vehicle_DataUrl_image ? (
                <img
                  src={vehicle_DataUrl_image || vehicle_image}
                  alt=""
                  srcSet=""
                  style={{ backgroundColor: "#d1d5db", borderRadius: 15 }}
                />
              ) : (
                <Icon icon="bx:image-add" className="icon" />
              )}
            </div>

            <ScrollContainer className="admin-inventory-add-vehicle--images__list">
              <div
                style={{
                  maxWidth: 150,
                  display: "flex",
                  flexFlow: "row nowrap",
                }}
              >
                {vehicles.map((vehicle) => (
                  <img
                    src={vehicle.vehicle_link}
                    alt="gallon"
                    srcSet=""
                    key={vehicle.id}
                    onClick={() => {
                      if (!vehicle_DataUrl_image) {
                        setVehicleImage(vehicle.vehicle_link);
                      } else {
                        setVehicleDataUrlImage(null);
                      }
                    }}
                  />
                  // pag click sa image, automatic mag fill up yung form
                ))}
              </div>
            </ScrollContainer>
          </div>
          <div className="admin-inventory-add-vehicle--inputs">
            <TextInput
              label="Vehicle Name"
              name="vehicle_name"
              placeholder="Vehicle Name"
            />
            <TextInput
              label="Vehicle ID"
              name="vehicle_id"
              placeholder="Vehicle ID"
            />
          </div>
          <div className="admin-inventory-add-vehicle--buttons">
            <button ref={resetRef} type="reset" className="reset">
              Clear
            </button>
            <Button
              isLoading={isSubmitting}
              type="submit"
              loadingText="Please wait..."
              color="white"
              backgroundColor="#2389DA"
            >
              Add
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AdminInventoryAddVehicle;
