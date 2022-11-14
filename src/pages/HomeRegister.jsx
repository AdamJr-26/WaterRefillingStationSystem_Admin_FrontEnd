import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import Map from "../components/Map";
import { axios } from "../services/axios";
import ErrorModal from "../components/ErrorModal";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

function HomeRegister() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // ========== geolocation form -----------------
  const geolocation = {
    lat: "",
    lng: "",
  };
  // ========== VALIDATOR ---------------------
  const registerAdminFormValidate = Yup.object().shape({
    wrs_name: Yup.string().required("WRS Name is required"),
    region: Yup.string(),
    province: Yup.string(),
    city: Yup.string(),
    barangay: Yup.string(),
    street_building: Yup.string(),
    gmail: Yup.string().email().required("Email is required"),
    contact_number: Yup.number(),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string(),
    gender: Yup.string(),
    age: Yup.number(),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 letters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .min(6, "Password must be aleast 6 characters")
      .max(16, "Password must not exceed 16 letters")
      .required("Confirm password is required"),
  });
  // ======= initial values ------------------------
  const registerFormInitialValues = {
    wrs_name: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    street_building: "",
    gmail: "",
    contact_number: "",
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    password: "",
    confirm_password: "",
  };
  // ========== SUBMIT ---------------------
  const onRegisterSubmit = (values) => {
    const form = {
      ...values,
      geolocation: geolocation.geolocation,
    };
    axios({
      url: "auth/register/station",
      method: "post",
      withCredentials: true,
      data: form,
    })
      .then((res) => {
        const data = res.data;
        console.log("data", data);
        if (data?.data?.success) {
          navigate("/redirect-register");
        } else if (data.emailExists) {
          setErrorMessage(data.message);
          console.log("errorMessage", errorMessage);
        }
      })
      .catch((err) => {
        // setError
        console.log("errr by registering wrs", err);
      });
  };

  return (
    <div className="home-register">
      <Formik
        initialValues={registerFormInitialValues}
        validationSchema={registerAdminFormValidate}
        onSubmit={onRegisterSubmit}
      >
        <Form>
          <Outlet />
        </Form>
      </Formik>

      <div className="home-register--map">
        <div className="home-register--map__header">
          <p>Mark your location*</p>
          <p>
            By marking your location you are helping the customers to easily
            find your Water Refilling Station
          </p>
          <p>Step 1: Click the map to find your location</p>
          <p>Step 2: Drag the marker to manually set position</p>
        </div>
        <Map formData={geolocation} />
      </div>
      {errorMessage ? (
        <ErrorModal message={errorMessage} setClose={setErrorMessage} />
      ) : null}
    </div>
  );
}

export default HomeRegister;
