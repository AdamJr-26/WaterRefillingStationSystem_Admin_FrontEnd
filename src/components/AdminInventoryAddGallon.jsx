import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { gallonIcon } from "../assets/images/gallons_transparent/icons/gallon";

import ScrollContainer from "react-indiana-drag-scroll";
import { addGallonState } from "../lib/store/globalPopupSlice";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addGallon } from "../services/api/inventory/inventory.post";
import { useToast, Button } from "@chakra-ui/react";

function AdminInventoryAddGallon() {
  const dispatch = useDispatch();
  const [gallon_image, setGallonImage] = useState(null);
  const [gallon_DataUrl_image, setGallonDataUrlImage] = useState(null);
  const [isSubmitting, setSubmitting] = useState(null);
  let resetRef = useRef(null);
  const toast = useToast();
  return (
    <div className="admin-inventory-add-gallon">
      <div className="admin-inventory-add-gallon--head">
        <p>Add New Gallon</p>
        <button onClick={() => dispatch(addGallonState())}>
          <Icon icon="bi:x" />
        </button>
      </div>
      <Formik
        initialValues={{
          name: "",
          liter: "",
          price: "",
          total: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(20, "Name must not exceed 20 letters").required("Gallon Name is Required"),
          liter: Yup.number().max(10000, "Liter must not exceed 10000 ").required("Liter is Required"),
          price: Yup.number().max(10000, "Price must not exceed 10000 ").required("Price is Required"),
          total: Yup.number().max(10000, "Total must not exceed 10000 ").required("Total is Required"),
        })}
        onSubmit={async (values) => {
          if (gallon_image) {
            setSubmitting(true);
            const res = await addGallon(values, gallon_image);
            if (res.data && !res.error) {
              resetRef.current.click();
              setGallonImage(null);
              setGallonDataUrlImage(null);
              // toast messsage
              setSubmitting(false);
              const { message, description } =
                res?.data?.fullMessage?.add_gallon_admin;
              toast({
                title: description,
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } else {
              // toast error
              setSubmitting(false);
              const { fullError, message } =
                res.error?.response?.data?.errors?.add_gallon_admin;
              toast({
                title: fullError,
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              console.log(res.error);
            }
          }else{
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
          <span className="select-gallon">Select Gallon</span>
          <div className="admin-inventory-add-gallon--images">
            <div className="admin-inventory-add-gallon--images__input-file">
              <input
                type="file"
                name="image"
                accept="image/*"
                id=""
                onChange={(e) => {
                  let files = e.target.files;
                  let reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = (e) => {
                    setGallonDataUrlImage(e.target.result);
                  };
                  setGallonImage(files[0]);
                }}
              />
              {gallon_image || gallon_DataUrl_image ? (
                <img
                  src={gallon_DataUrl_image || gallon_image}
                  alt=""
                  srcSet=""
                  style={{ backgroundColor: "#d1d5db", borderRadius: 15 }}
                />
              ) : (
                <Icon icon="bx:image-add" className="icon" />
              )}
            </div>

            <ScrollContainer className="admin-inventory-add-gallon--images__list">
              <div
                style={{
                  maxWidth: 150,
                  display: "flex",
                  flexFlow: "row nowrap",
                }}
              >
                {gallonIcon.map((gallon, i) => (
                  <img
                    src={gallon.gallon_image}
                    alt="gallon"
                    srcSet=""
                    key={i}
                    onClick={() => {
                      if (!gallon_DataUrl_image) {
                        setGallonImage(gallon.gallon_image);
                      } else {
                        setGallonDataUrlImage(null);
                      }
                    }}
                  />
                  // pag click sa image, automatic mag fill up yung form
                ))}
              </div>
            </ScrollContainer>
          </div>
          <span className="gallon-description">Description</span>

          <div className="admin-inventory-add-gallon--inputs">
            <TextInput
              label="Create Name"
              name="name"
              placeholder="Gallon Name"
            />
            <TextInput
              label="Liter(s)"
              name="liter"
              type="number"
              placeholder="0"
            />
            <TextInput
              label="Price"
              type="number"
              name="price"
              placeholder="Price"
            />
            <TextInput
              label="Total"
              type="number"
              name="total"
              placeholder="total"
            />
          </div>
          <div className="admin-inventory-add-gallon--buttons">
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

export default AdminInventoryAddGallon;
